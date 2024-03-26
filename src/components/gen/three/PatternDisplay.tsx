import {useState} from "preact/compat";
import {useEffect, useRef} from "preact/hooks";
import * as TRE from "three";
import {leggingArmorUrl, loaderGLTF, mainArmorUrl, radi} from "../../../api/three/ThreeHelper.ts";
// @ts-ignore
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";
// @ts-ignore
import {GLTF} from "three/examples/jsm/loaders/GLTFLoader";
import {Scene} from "three";
import {getRot, setRot} from "../../../api/Rotator.ts";

type PatternDisplayProps = {
    className?: string,
    mainTexture: string,
    leggingsTexture: string,
    debug?: boolean

}
export default function PatternDisplay(
    {className, mainTexture, leggingsTexture, debug = false}: PatternDisplayProps
) {
    const canvas = useRef<HTMLCanvasElement>(null!)

    const [sliderValue, setSv] = useState(0)

    function setSliderValue(i: number) {
        setSv(i)
        setRot(i)
    }


    useEffect(() => {
        if (canvas.current == null) return
        const renderer = new TRE.WebGLRenderer({canvas: canvas.current, antialias: false, alpha: true})
        renderer.setSize(256, 256)

        let camera = new TRE.PerspectiveCamera(30, 1, 0.1, 100)
        camera.position.z = 4.4

        const scene = new TRE.Scene()
        const ambientLight = new TRE.AmbientLight(0xFFFFFF);
        scene.add(ambientLight)

        const models: GLTF[] = []
        const add = (model: GLTF) => models.push(model)
        fullArmorRenderer(scene, new TRE.Vector3(0, -1, 0), mainTexture, leggingsTexture, add, debug)

        function animate() {
            requestAnimationFrame(animate)
            models.forEach((e: GLTF) => {
                scene.add(e.scene)
                e.scene.rotation.set(0, 180 * radi + getRot() * radi, 0)
            })
            renderer.render(scene, camera)
        }

        animate()
    }, [])

    return (
        <div className="flex flex-col items-center">
            <div className={className || "w-64 h-64"}>
                <canvas ref={canvas} className="w-full h-full">
                </canvas>
            </div>
            <div className="py-2 w-full">
                <input type="range"
                       className="w-full h-3 rounded-full slider bg-accent bg-opacity-20"
                       min="0"
                       max="360"
                       value={sliderValue}
                    //@ts-ignore
                       onChange={(e) => setSliderValue(Number(e.target?.value))}
                />
            </div>
        </div>
    )
}

function fullArmorRenderer(scene: Scene, position: TRE.Vector3, mainTexture: string, leggingsTexture: string, addMdl: (model: GLTF) => void, _debug: boolean
) {
    const loader = new TRE.TextureLoader()

    const mainTex = loader.load(mainTexture, tex => {
        tex.magFilter = TRE.NearestFilter
        tex.minFilter = TRE.NearestFilter
        tex.colorSpace = TRE.SRGBColorSpace
        tex.flipY = false
    })

    const legsTex = loader.load(leggingsTexture, tex => {
        tex.magFilter = TRE.NearestFilter
        tex.minFilter = TRE.NearestFilter
        tex.colorSpace = TRE.SRGBColorSpace
        tex.flipY = false
    })

    const core = {
        map: mainTex,
        side: TRE.DoubleSide,
        normalScale: new TRE.Vector2(1, 1),
        alphaTest: 0
    }

    const mainMat = new TRE.MeshStandardMaterial(core)
    const mainSecondaryMat = new TRE.MeshStandardMaterial({...core, alphaTest: 0.05})
    const legsMat = new TRE.MeshStandardMaterial({...core, map: legsTex})

    loaderGLTF.load(mainArmorUrl, (model: GLTF) => {
        // console.log("Main Model Loaded")
        scene.add(model.scene)
        model.scene.rotation.set(0, 180 * radi, 0)
        model.scene.position.copy(position)
        model.scene.position.add(new TRE.Vector3(.5 - .125, 0, 0))
        model.scene.traverse((part: any) => {
            if (part instanceof TRE.Mesh) {
                part.material = mainMat
                if (part.name === 'Hat_Layer') part.material = mainSecondaryMat
                if (part.name === 'Left_Boot') part.position.z -= 0.0002
            }
        })
        addMdl(model)
    }, undefined, (error: unknown) => console.error(error))

    loaderGLTF.load(leggingArmorUrl, (model: GLTF) => {
        // console.log("Legging Model Loaded")
        scene.add(model.scene)
        model.scene.rotation.set(0, 180 * radi, 0)
        model.scene.position.copy(position)
        model.scene.position.add(new TRE.Vector3(-.5 - .125, 0, 0))
        model.scene.traverse((part: any) => part instanceof TRE.Mesh && (part.material = legsMat))
        addMdl(model)
    }, undefined, (error: unknown) => console.error(error))

}