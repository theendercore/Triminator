import {useState} from "preact/compat";
import {useEffect, useRef} from "preact/hooks";
import * as THREE from "three";
// @ts-ignore
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";

type PatternDisplayProps = {
    className?: string,
    mainTexture: string,
    leggingsTexture: string,
    sliderClass?: string,
    debug?: boolean

}
export default function PatternDisplay(
    {className, mainTexture, leggingsTexture, sliderClass, debug}: PatternDisplayProps
) {
    const canvas = useRef<HTMLCanvasElement>(null!)

    const [sliderValue, setSliderValue] = useState(0)

    useEffect(() => {
        const renderer = new THREE.WebGLRenderer({canvas: canvas.current, antialias: false, alpha: true})
        renderer.setSize(256, 256)

        const camera = new THREE.PerspectiveCamera(30, 1, 0.1, 100)
        camera.position.z = 4.4

        const scene = new THREE.Scene()
        const controls = new OrbitControls(camera, renderer.domElement);
        const ambientLight = new THREE.AmbientLight(0xFFFFFF);
        scene.add(ambientLight)

        function animate() {
            requestAnimationFrame(animate)
            controls.update()
            renderer.render(scene, camera)
        }

        animate()
    }, [])

    return (
        <div className="flex flex-col items-center">
            <div className={className || "w-64 h-64"}>
                <canvas ref={canvas} className="w-full h-full bg-cyan-800 rounded-3xl"/>
            </div>
            <input type="range"
                   className={sliderClass}
                   min="0"
                   max="360"
                   value={sliderValue}
                //@ts-ignore
                   onChange={(e) => setSliderValue(Number(e.target!.value))}
            />
        </div>
    )
}