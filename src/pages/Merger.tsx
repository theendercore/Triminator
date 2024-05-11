import {useRef} from "preact/hooks";

import {MutableRefObject} from "preact/compat";
import PatternDisplay from "../components/gen/three/PatternDisplay.tsx";
import {devMode} from "../api/dev.ts";

export default function Merger({}: { path: string }) {
    return (
        <div className="flex flex-col items-center justify-center gap-2 p-20 pt-5 text-left">
            <h1 class="text-2xl p-6 ">Work in Progress</h1>

            <h2 class="text-xl p-3">Debug stuff pls ignore! 😃</h2>
            { devMode && <TestingBlock/>}
        </ div>
    );

}

const armorImg = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAAAgCAYAAACinX6EAAAAAXNSR0IArs4c6QAAA05JREFUaIHdWduR2zAMXOVcgEpACVcCS2EpTAdXAktQCSjBJbAEdcB8RKtAMGnpckps385oLJHgA0+C8FBKqaUU9J4QAgBARJBSgqpCVVFKAQCo6oAXxkVE9hioIgIRQSkFfAewCuGVcdkjsExSCPZ5dfw4SmiZ/Q6ME7sCCCEghLDRvois7a+OXRcgrO/z9ztg1wJUFcCWab6z75WxK4Be1Lftr4whxlgtg2TMapcxgHGAtJ7GxogWTUoJIoIY49pWSnloHjHknKvXZE/jFq0+fzpQAAyapLXHaErpoQJ4m+c5lVIwjiOmacI4jgCAeZ5RSsHHx8e62ff3dwBAzhmqimmaVuZJzzmmaYKqYp5nAMA4jhjHcaVj3/V6/fkQzhcMIYSmCzhTH5b3uqTHAwDYsf6Y5Fj22d/W3I/CxWd03BCZs6bvfdoylHMelrbayh6tUDnmGXDpBSFVHVJK1bZR8wQFQOaBZlCraOBpBHCvk7dBVa2eeVWt3iI6c3Bc7bQ/FHcFkHPunvV0nZzzoYWehWGP3U2JyFNpTlUr8Fs5McYbt/wsDt0FfDR/JM6+jxy+DD0L7rnl3+CQAJ5B8wQzyrMuYkcqQnd9LKVUbRKkqgghbI5GAIgxVlVFjHGTE+ScNzWHZc219kiNM6X28DEq57zGB+D26PY4XBHqgckSn+XYvKGjYCztssGbPttms0ai1Xakr4UvxwC7IPOGRcOVVsAbp0+xSU9GrQWklDZrtMbe29N/F4D9NiWzCtzeAD291bSdw1uSncMKzIJr9VzG41QB8N2as4X9P8GPtfVFKzDGDEvfY57IOa80e4nalwVgC6aE9WlumNr8LL0Pmq3LFQO1iFRPv4eNAEIIlZPbSe5dWa2peZ8m2M7I7ulbN0VDM4hI5cmy3DbXX7sXKwjf18NaEmuZI48g39/65sYJb7rWFFv01mVsrPDH6dm4+IWtRvyRZdv8Ru34ZeObhTjGBjZL7+c6EsDOwIUmyQ1YX2Qktv3WIpbH1wiqLIVP79OlUQEivf+TxQvkX+ENQOIH63W29mc3Mc/zWuMz35ua3lLjSwDWGiB9f5qmG3MmPWuGwB+BtejPxiAulQT6Vd4WesHG1xr3an+fpT8LvwAcukAX5uHdVQAAAA5lWElmTU0AKgAAAAgAAAAAAAAA0lOTAAAAAElFTkSuQmCC"
const leggingsImg = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAAAgCAMAAACVQ462AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAbUExUReDg4MDAwKCgoICAgGBgYEBAQCAgIAAAAAAAAGcUVLcAAAAJdFJOU///////////AFNPeBIAAAAJcEhZcwAADsMAAA7DAcdvqGQAAADCSURBVEhL7ZXtCoMwDEWT3N7U93/iJbXOQSfU/hrDA/HSag/2AxVRQ6HXbRHpucwjeATJI/gZAYPWWuAfBM5aNb6JmV6pvX8aIegq9ExS7gtMQYQh00TR+6cRmFpRsUyIlt4/TQjiv1AUmdByX0CkwGIeUbYg2FfvrN4/jVTGHn6UtJMhwZE72fqGVPc4AGeZ5uNqR7JYUC7fbDAbCeyDADIWJhqFl9s7CHJUM7TxgMc10vvtgUFwzOY9J29c/P637QUEpTtmZb8HMgAAAABJRU5ErkJggg=="

function TestingBlock() {
    return (
        <div className="flex flex-col items-center">
            <DebuggerBoi/>
        </div>
    )
}

function DebuggerBoi() {
    const canvas = useRef<HTMLCanvasElement>(null!);
    const img = useRef<HTMLImageElement>(null!);
    const saveCanvasAsImage = (ref: MutableRefObject<HTMLImageElement>) => {
        if (canvas.current) {
            canvas.current.toBlob(it => it && (ref.current.src = URL.createObjectURL(it)), 'image/png')
        }
    };

    return (<div className="">
        <PatternDisplay mainTexture={armorImg} leggingsTexture={leggingsImg}/>

        <button onClick={() => saveCanvasAsImage(img)} className="bg-secondary py-1 px-3 rounded-3xl"> Do things
        </button>
        {/*<IconCreator ref={canvas} size={128} texture={armorImg}/>*/}
        <img ref={img} alt="Export Testing" className="h-12"/>
    </div>)
}

