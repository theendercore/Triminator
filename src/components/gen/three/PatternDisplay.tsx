import {useState} from "preact/compat";
import {useEffect, useRef} from "preact/hooks";
import * as TRE from "three";
import {leggingArmorUrl, loaderGLTF, mainArmorUrl, radi} from "../../../api/three/ThreeHelper.ts";
// @ts-ignore
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";
// @ts-ignore
import {GLTF} from "three/examples/jsm/loaders/GLTFLoader";
import {Scene} from "three";

type PatternDisplayProps = {
    className?: string,
    mainTexture: string,
    leggingsTexture: string,
    sliderClass?: string,
    debug?: boolean

}
export default function PatternDisplay(
    {className, mainTexture, leggingsTexture, debug = false}: PatternDisplayProps
) {
    const canvas = useRef<HTMLCanvasElement>(null!)

    // const [sliderValue, setSliderValue] = useState(0)
    const [models, setModels] = useState<GLTF[]>([])
    const addMdl = (model: GLTF) => setModels([...models, model])


    useEffect(() => {
        const renderer = new TRE.WebGLRenderer({canvas: canvas.current, antialias: false, alpha: true})
        renderer.setSize(256, 256)

        const camera = new TRE.PerspectiveCamera(30, 1, 0.1, 100)
        camera.position.z = 4.4

        const scene = new TRE.Scene()
        // const controls = new OrbitControls(camera, renderer.domElement);
        const ambientLight = new TRE.AmbientLight(0xFFFFFF);
        scene.add(ambientLight)


        // if (models == null || !(models.length > 0)) {
        fullArmorRenderer(scene, new TRE.Vector3(0, -1, 0), mainTexture, leggingsTexture, addMdl, debug)
        // }

        // models && models.forEach(e => {
        //     scene.add(e.scene)
        //     e.scene.rotation.set(0, 180 * radi + sliderValue * radi, 0)
        // })

        function animate() {
            requestAnimationFrame(animate)
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
            {/*<input type="range"*/}
            {/*       className={sliderClass}*/}
            {/*       min="0"*/}
            {/*       max="360"*/}
            {/*       value={sliderValue}*/}
            {/*    //@ts-ignore*/}
            {/*       onChange={(e) => setSliderValue(Number(e.target?.value))}*/}
            {/*/>*/}
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
        console.log("Main Model Loaded")
        scene.add(model.scene)
        model.scene.rotation.set(0, 180 * radi, 0)
        model.scene.position.copy(position)
        model.scene.position.add(new TRE.Vector3(.5 - .125, 0, 0))
        model.scene.traverse((part: any) => {
            if (part instanceof TRE.Mesh) {
                part.material = mainMat
                if (part.name === 'Hat_Layer') part.material = mainSecondaryMat
            }
        })
        addMdl(model)
    }, undefined, (error: unknown) => console.error(error))

    loaderGLTF.load(leggingArmorUrl, (model: GLTF) => {
        console.log("Legging Model Loaded")
        scene.add(model.scene)
        model.scene.rotation.set(0, 180 * radi, 0)
        model.scene.position.copy(position)
        model.scene.position.add(new TRE.Vector3(-.5 - .125, 0, 0))
        model.scene.traverse((part: any) => part instanceof TRE.Mesh && (part.material = legsMat))
        addMdl(model)
    }, undefined, (error: unknown) => console.error(error))

}