import {forwardRef} from "preact/compat";
import * as THREE from "three";
import {useEffect, useRef} from "preact/hooks";
import {Vector3} from "three";
// @ts-ignore
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";
// @ts-ignore
import {GLTF, GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader";
import {radi} from "../../../api/ThreeHelper.ts";

type IconCreatorProps = {
    size: number,
    texture: string
}
/*
    return (
        <div style={{height: size + "px", width: size + "px"}} className="invisible">
            <Canvas ref={ref}
                    gl={{preserveDrawingBuffer: true, antialias: false}}
                    camera={{
                        position: [0, 0, 4],
                        zoom: size * scaleValue,
                        left: frustum,
                        right: -frustum,
                        bottom: frustum,
                        top: -frustum,
                    }} orthographic
            >
                <ambientLight intensity={Math.PI / 1.1}/>
                <ChestplateRenderer position={[0, -1.065, 0]} mainTexture={texture}/>
            </Canvas>
        </div>
    )
 */
export const IconCreator = forwardRef<HTMLCanvasElement, IconCreatorProps>(({size, texture}, _ref) => {
    const canvas = useRef<HTMLCanvasElement>(null!)
    const frustum = 0.58

    useEffect(() => {
        const renderer = new THREE.WebGLRenderer(
            {canvas: canvas.current, preserveDrawingBuffer: true, antialias: false, alpha: true}
        )
        renderer.setSize(size, size)
        const camera = new THREE.OrthographicCamera(-frustum, frustum, frustum, -frustum)
        camera.position.z = 4
        const scene = new THREE.Scene()
        const ambientLight = new THREE.AmbientLight(0xFFFFFF);
        scene.add(ambientLight)
        chestplate(scene, new Vector3(0, -1.03, 0), texture)
        function animate() {
                    requestAnimationFrame(animate)
                    renderer.render(scene, camera)
                }
                animate()
        renderer.render(scene, camera)
    }, [])

    return <div className="w-96 h-96">
        <canvas ref={canvas} className="w-full h-full bg-cyan-800 rounded-3xl"/>
    </div>
})

function chestplate(scene: THREE.Scene, position: THREE.Vector3, mainTexture: string) {
    const mainTex = new THREE.TextureLoader().load(mainTexture, tex => {
        tex.magFilter = THREE.NearestFilter
        tex.minFilter = THREE.NearestFilter
        tex.colorSpace = THREE.SRGBColorSpace
        tex.flipY = false
    })

    const mainMat = new THREE.MeshStandardMaterial({
        map: mainTex,
        side: THREE.DoubleSide,
        normalScale: new THREE.Vector2(1, 1),
        alphaTest: 0.05
    })

    new GLTFLoader().load('./models/main_armor.glb', (model: GLTF) => {
            console.log("Model Loaded")
            scene.add(model.scene)
            // model.scene.rotation.y = -4
            console.log(model.scene.rotation)
            model.scene.rotation.set(30 * radi, 150 * radi, 0)
            console.log(model.scene.rotation)
            model.scene.position.copy(position)
            model.scene.traverse((part: any) => {
                if (part instanceof THREE.Mesh) {
                    if (part.name !== 'Chestplate' && part.name !== 'Right_Arm_Armor' && part.name !== 'Left_Arm_Armor') {
                        part.visible = false
                    }
                    part.material = mainMat
                }
            })
            return "Hello"

        }, undefined, (error: unknown) => console.error(error)
    )
}