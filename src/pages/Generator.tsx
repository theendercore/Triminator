import {useRef, useState} from "preact/hooks";
import {getEmptyPack, MCVersionList} from "../api/v1/consts";
import CodePre from "../components/generic/CodePre";
import {format, formatName, sleep} from "../api/Util";
import GenHeader from "../components/gen/v1/GenHeader";
import PatternSection from "../components/gen/v1/PatternSection";
import {devMode} from "../api/dev";
import {TargetedEvent} from "preact/compat";
import {genDatapack, genResourcePack} from "../api/v1/genPacks.ts";
import MaterialSection from "../components/gen/v1/MaterialSection.tsx";
import PrimaryButton from "../components/generic/btn/PrimaryButton.tsx";
import SecondaryButton from "../components/generic/btn/SecondaryButton.tsx";
import StyledSwitch from "../components/generic/StyledSwitch.tsx";
import Dropdown from "../components/generic/input/Dropdown.tsx";
import {MCVersion, PackContextData} from "../api/v1/types";

export default function Generator({}: { path: string }) {
    const [packData, setPackData] = useState<PackContextData>(getEmptyPack());
    const [advancedState, setAdvancedState] = useState<boolean>(false);
    const [dpUrl, setDpUrl] = useState("");
    const [rpUrl, setRpUrl] = useState("");

    const [downloadState, setDownloadState] = useState<"BOTH" | "DATA" | "RESOURCE">("BOTH");

    const dpLink = useRef<HTMLAnchorElement>(null);
    const rpLink = useRef<HTMLAnchorElement>(null);

    function generate(e: TargetedEvent<HTMLFormElement, Event>) {
        e.preventDefault();
        if (downloadState === "DATA" || downloadState === "BOTH")
            genDatapack(packData).then((url) => {
                setDpUrl(url);
                sleep(1000).then(() => dpLink.current?.click());
            });

        if (downloadState === "RESOURCE" || downloadState === "BOTH")
            genResourcePack(packData).then((url) => {
                setRpUrl(url);
                sleep(1000).then(() => rpLink.current?.click());
            });
    }

    return (
        <div class="container flex flex-col gap-5">
            <div class="p-5 bg-opacity-5 bg-text rounded-3xl flex flex-col md:flex-row gap-6 md:pl-28">
                <Dropdown
                    title="Version:"
                    selected={packData.version}
                    setSelected={(e)=> setPackData({ ...packData, version: e as MCVersion})}
                    list={Object(MCVersionList)}
                    hoverText="Minecraft version for the data & rec packs"
                />
                <StyledSwitch
                    title="Advanced Mode:"
                    state={advancedState}
                    onChange={setAdvancedState}
                    hoverText="Advanced editing mode for people who know more about datapacks and want finer controles."
                />
            </div>
            <div
                class="p-10 bg-text bg-opacity-5 rounded-3xl lg:grid lg:grid-cols-2 lg:gap-10 flex flex-col gap-5 w-full ">
                <div
                    class="flex flex-col md:flex-row justify-between items-center bg-background p-8 rounded-3xl md:max-w-3xl bg-opacity-75">
                    <div>
                        <h2 className="text-6xl font-bold">
                            {packData.name.trim() === "" ? "Trim" : packData.name} Pack
                        </h2>
                        <p class="flex-wrap">
                            {packData.description || "Pack generated by Triminator"}
                        </p>
                    </div>

                    <div class="min-w-[8rem] min-h-[8rem] rounded-3xl bg-background-2 grid items-center">
                        <img
                            src={
                                packData.icon !== null
                                    ? URL.createObjectURL(packData?.icon)
                                    : "/img/dr_doof.png"
                            }
                            alt={packData.icon?.name}
                            height={128}
                            width={128}
                            class="pixel-art rounded-3xl"
                        />
                    </div>
                </div>

                <GenHeader
                    className="place-self-center"
                    packData={packData}
                    setPackData={setPackData}
                    onSubmit={generate}
                    advancedState={advancedState}
                />

                <PatternSection packData={packData} setPackData={setPackData} advancedState={advancedState}/>
                <MaterialSection packData={packData} setPackData={setPackData} advancedState={advancedState}/>

                <div
                    className="text-xl text-center md:col-span-2 md:place-self-center flex flex-col md:flex-row gap-6 ">
                    <SecondaryButton
                        onClick={() => setDownloadState("DATA")}
                        fromField="header"
                        type="submit"
                    >
                        Download Datapack
                    </SecondaryButton>
                    <SecondaryButton
                        onClick={() => setDownloadState("RESOURCE")}
                        fromField="header"
                        type="submit"
                    >
                        Download Resource Pack
                    </SecondaryButton>
                    <PrimaryButton
                        onClick={() => setDownloadState("BOTH")}
                        fromField="header"
                        type="submit"
                    >
                        Download Both
                    </PrimaryButton>
                </div>

                <a
                    class="hidden"
                    download={`${formatName(packData.name)}Datapack.zip`}
                    ref={dpLink}
                    href={dpUrl}
                ></a>
                <a
                    class="hidden"
                    download={`${formatName(packData.name)}ResourcePack.zip`}
                    ref={rpLink}
                    href={rpUrl}
                ></a>

                {devMode && (
                    <>
                        <CodePre className="col-span-2">{format(packData)}</CodePre>
                        <PrimaryButton
                            className=" top-32 fixed left-3"
                            onClick={() => {
                                setPackData({
                                    ...packData,
                                    name: `Test-${crypto.randomUUID().slice(0, 5)}`,
                                    namespace: "test_ns",
                                    version: "1.20",
                                });
                            }}
                        >
                            qFill
                        </PrimaryButton>
                    </>
                )}
            </div>
        </div>
    );
}
