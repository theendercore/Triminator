/*
import {Canvas} from "@react-three/fiber";
import FullArmorRenderer from "./FullArmorRenderer.tsx";
import {useState} from "preact/compat";

type PatternDisplayProps = {
    className?: string,
    mainTexture: string,
    leggingsTexture: string,
    sliderClass?: string,
    debug?: boolean

}
export default function PatternDisplayOld({className, mainTexture, leggingsTexture, sliderClass, debug}: PatternDisplayProps) {
    const radi = 0.01745329
    const [sliderValue, setSliderValue] = useState(0)
    return (
        <div className="flex flex-col items-center">
            <div className={className || "w-64 h-64"}>
                <Canvas
                    gl={{antialias: false}}
                    camera={{position: [0, 0, 4.4], fov: 30, aspect: 1,}}>
                    <ambientLight intensity={Math.PI / 1.1}/>
                    <FullArmorRenderer position={[0, -1, 0]}
                                       mainTexture={mainTexture}
                                       leggingsTexture={leggingsTexture}
                                       iRotation={[0, sliderValue * radi, 0]}
                                       debug={debug}
                    />
                </Canvas>
            </div>
            <input type="range"
                   className={sliderClass}
                   min="0"
                   max="360"
                   value={sliderValue}
                   onChange={(e) => setSliderValue(Number(e.target.value))}
            />
        </div>
    )
}

 */