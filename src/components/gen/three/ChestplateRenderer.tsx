/*
import * as THREE from 'three'
import {useEffect, useRef} from "preact/hooks"
// @ts-ignore
import {GLTF, GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader'
// @ts-ignore
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";

interface ChestplateRendererProps {
    position: THREE.Vector3
    mainTexture: string
}

export function ChestplateRenderer({position, mainTexture}: ChestplateRendererProps) {
    const canvas = useRef<HTMLCanvasElement>(null!)
    useEffect(() => {
        const renderer = new THREE.WebGLRenderer({canvas: canvas.current, antialias: false, alpha: true})
        renderer.setSize(512, 512)
        const camera = new THREE.PerspectiveCamera(30, 1, 0.1, 100)
        // const camera = new THREE.PerspectiveCamera(30, 1, 0.1, 100)
        camera.position.z = 7

        const scene = new THREE.Scene()

        const controls = new OrbitControls(camera, renderer.domElement);

        const ambientLight = new THREE.AmbientLight(0xFFFFFF);
        scene.add(ambientLight)

        const loader = new THREE.TextureLoader()

        const mainTex = loader.load(mainTexture, tex => {
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

        const loaderGLTF = new GLTFLoader()

        loaderGLTF.load('./models/main_armor.glb', (model: GLTF) => {
            console.log("Model Loaded")
            scene.add(model.scene)
            model.scene.rotation.y = -4
            model.scene.rotation.x = -.5
            model.scene.position.copy(position)
            model.scene.traverse((part: any) => {
                if (part instanceof THREE.Mesh) {
                    if (part.name !== 'Chestplate' && part.name !== 'Right_Arm_Armor' && part.name !== 'Left_Arm_Armor') {
                        part.visible = false
                    }
                    part.material = mainMat
                }
            });


        }, undefined, (error: unknown) => {
            console.error(error);
        })

        function animate() {
            requestAnimationFrame(animate)
            controls.update()
            renderer.render(scene, camera)
        }

        animate()
    }, [])

    return <div className="w-96 h-96">
        <canvas ref={canvas} className="w-full h-full bg-cyan-800 rounded-3xl"/>
    </div>
}


// import {DoubleSide, MeshStandardMaterial, NearestFilter, Vector2, Vector3} from "three"
// import {useGLTF, useTexture} from "@react-three/drei"
//
// type ChestplateRendererProps = {
//     position: Vector3 | number[],
//     mainTexture: string
// }
//
// export function ChestplateRenderer({position, mainTexture}: ChestplateRendererProps) {
//     const mainTex = useTexture(mainTexture, tex => {
//         tex.magFilter = NearestFilter
//         tex.minFilter = NearestFilter
//         tex.colorSpace = "srgb"
//         tex.flipY = false
//         tex.userData = {"mimeType": "image/png"}
//     })
//
//     const mainMat = new MeshStandardMaterial({
//         map: mainTex,
//         side: DoubleSide,
//         normalScale: new Vector2(1, 1),
//         alphaTest: 0.05
//     })
//
//     const {nodes} = useGLTF('./models/main_armor.glb')
//
//     return <group dispose={null} position={position as Vector3} rotation={[0.5, -4, 0]}>
//         <group>
//             <mesh
//                 castShadow
//                 receiveShadow
//                 geometry={nodes.Chestplate.geometry}
//                 material={mainMat}
//             />
//         </group>
//         <group>
//             <mesh
//                 castShadow
//                 receiveShadow
//                 geometry={nodes.Right_Arm_Armor.geometry}
//                 material={mainMat}
//             />
//         </group>
//         <group>
//             <mesh
//                 castShadow
//                 receiveShadow
//                 geometry={nodes.Left_Arm_Armor.geometry}
//                 material={mainMat}
//             />
//         </group>
//     </group>
// }

 */
