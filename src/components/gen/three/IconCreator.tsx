import {forwardRef} from "preact/compat";
import {useEffect} from "preact/hooks";
import * as THREE from "three";
import {mainArmorUrl, radi} from "../../../api/three/ThreeHelper.ts";
// @ts-ignore
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";
// @ts-ignore
import {GLTF, GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader";

type IconCreatorProps = {
    size: number,
    texture: string
}

export const IconCreator = forwardRef<HTMLCanvasElement, IconCreatorProps>(({size, texture}, ref) => {
    const frustum = 0.58

    useEffect(() => {
        const renderer = new THREE.WebGLRenderer(
            // @ts-ignore
            {canvas: ref?.current, preserveDrawingBuffer: true, antialias: false, alpha: true}
        )
        renderer.setSize(size, size)
        const camera = new THREE.OrthographicCamera(-frustum, frustum, frustum, -frustum)
        camera.position.z = 4
        const scene = new THREE.Scene()
        const ambientLight = new THREE.AmbientLight(0xFFFFFF);
        scene.add(ambientLight)
        chestplateRenderer(scene, new THREE.Vector3(0, -1.03, 0), texture)
        renderer.render(scene, camera)
        let renderTimes = [0.5, 1, 2, 3, 5, 10]
        renderTimes.forEach((time) => setTimeout(() => renderer.render(scene, camera), time * 1000))
    }, [])

    return <div style={{height: size + "px", width: size + "px"}} className="_invisible">
        <canvas ref={ref} className="w-full h-full"/>
    </div>
})

function chestplateRenderer(scene: THREE.Scene, position: THREE.Vector3, mainTexture: string) {
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

    new GLTFLoader().load(mainArmorUrl, (model: GLTF) => {
            scene.add(model.scene)
            model.scene.rotation.set(30 * radi, 150 * radi, 0)
            model.scene.position.copy(position)
            model.scene.traverse((part: any) => {
                if (part instanceof THREE.Mesh) {
                    if (part.name !== 'Chestplate' && part.name !== 'Right_Arm_Armor' && part.name !== 'Left_Arm_Armor') {
                        part.visible = false
                    }
                    part.material = mainMat
                }
            })
        }, undefined, (error: unknown) => console.error(error)
    )
}