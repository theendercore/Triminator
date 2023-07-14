import {useRef, useState} from "preact/hooks";
import {getEmptyPack} from "../api/v1/consts";
import CodePre from "../components/generic/CodePre";
import {format, formatName, sleep} from "../api/Util";
import GenHeader from "../components/gen/v1/GenHeader";
import RoundButton from "../components/generic/RoundButton";
import PatternSection from "../components/gen/v1/PatternSection";
import {devMode} from "../api/dev";
import {TargetedEvent} from "preact/compat";
import {genDatapack, genResourcePack} from "../api/v1/genZip.ts";

export default function Generator({}: { path: string }) {
    const [packData, setPackData] = useState<PackContextData>(getEmptyPack());
    const [dpUrl, setDpUrl] = useState("")
    const [rpUrl, setRpUrl] = useState("")

    const dpLink = useRef<HTMLAnchorElement>(null)
    const rpLink = useRef<HTMLAnchorElement>(null)

    function generate(e: TargetedEvent<HTMLFormElement, Event>) {
        e.preventDefault();
        genDatapack(packData).then(url => {
            setDpUrl(url)
            sleep(1000).then(() => dpLink.current?.click())
        })
        genResourcePack(packData).then(url => {
            setRpUrl(url)
            sleep(1000).then(() => rpLink.current?.click())
        })

    }

    return (
        <div class="flex flex-col items-center justify-center">
            <div class="p-6 bg-slate-950 rounded-xl flex flex-col gap-2">
                <h2 class="text-2xl font-semibold py-4 text-center">
                    {packData.name.trim() === "" ? "Trim" : packData.name} Pack
                </h2>
                {devMode && <>
                    <RoundButton onClick={() => {
                        setPackData({
                            ...packData,
                            description: "Test Desc",
                            name: "test",
                            namespace: "test_ns",
                            version: "1.20"

                        })
                    }}>Test Fill</RoundButton>
                    <RoundButton onClick={() => {
                        console.log(format(JSON.stringify(
                            ""
                        )))
                    }}>LOG</RoundButton>
                </>}
                <GenHeader
                    packData={packData}
                    setPackData={setPackData}
                    onSubmit={generate}
                />
                <PatternSection packData={packData} setPackData={setPackData}/>
                <RoundButton className="bg-slate-700" from="header" type="submit">
                    Gen
                </RoundButton>


                <a class="hidden" download={`${formatName(packData.name)}Datapack.zip`}
                   ref={dpLink} href={dpUrl}></a>

                <a className="hidden" download={`${formatName(packData.name)}ResourceRack.zip`}
                   ref={rpLink} href={rpUrl}></a>
            </div>

            {devMode && <CodePre>{format(packData)}</CodePre>}
        </div>
    );
}
