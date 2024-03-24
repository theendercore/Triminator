import {useState, useRef, useEffect} from "preact/hooks";
import {getEmptyPack, MCVersionList} from "../api/v1/consts";
import CodePre from "../components/generic/CodePre";
import {downloadBlob, format, formatName} from "../api/Util";
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
import type {PackContextData, MCVersion} from "../api/v1/ExtraTypes";
import CustomModal from "../components/gen/v1/CustomModal.tsx";
import FileInput from "../components/generic/input/FileInput.tsx";
import {IconCreator} from "../components/gen/three/IconCreator.tsx";
import * as utl from "../api/Util.ts";

export default function Generator({}: { path: string }) {
    const canvas = useRef<HTMLCanvasElement>(null!);
    const [packData, setPackData] = useState<PackContextData>(getEmptyPack());
    const [currentTexture, setCurrentTexture] = useState("");
    const [iconToUpdate, setIconToUpdate] = useState("");
    const [advancedState, setAdvancedState] = useState<boolean>(false);
    const [isOpen, setIsOpen] = useState(false)

    const [downloadState, setDownloadState] = useState<"BOTH" | "DATA" | "RESOURCE">("BOTH");

    function closeModal() {
        setIsOpen(false)
    }

    function openModal() {
        setIsOpen(true)
    }

    function updateIcon(id: string) {
        setIconToUpdate(id)
    }

    useEffect(() => {
        if (iconToUpdate.length == 0) return;
        let pattern = packData.patterns.find(it => it.id === iconToUpdate) as PatternData
        if (pattern == null) return
        setCurrentTexture(pattern.baseTexture?.data!)
        if (canvas.current && currentTexture.length > 10) {
            setTimeout(() => {
                canvas.current.toBlob(it => {
                    if (it == null) return
                    utl.getBase64(it, (img) => {
                        pattern.icon = img?.toString()
                        setPackData({
                            ...packData,
                            patterns: [...packData.patterns.filter(ft => ft.id != iconToUpdate), pattern]
                        })
                        setIconToUpdate("")
                    })
                }, 'image/png')
            }, 1000)
        }
    }, [iconToUpdate])

    function exportToFile() {
        let blob = new Blob([JSON.stringify(packData, null, 2)], {type: "application/json;charset=utf-8"});
        downloadBlob(blob, `${formatName(packData.name)}_export.json`)
    }

    function generate(e: TargetedEvent<HTMLFormElement, Event>) {
        e.preventDefault();
        openModal()

        if (downloadState === "DATA" || downloadState === "BOTH")
            genDatapack(packData)
                .then(blob => downloadBlob(blob, `${formatName(packData.name)}Datapack.zip`))

        if (downloadState === "RESOURCE" || downloadState === "BOTH")
            genResourcePack(packData)
                .then(blob => downloadBlob(blob, `${formatName(packData.name)}ResourcePack.zip`))
    }

    // @ts-ignore
    return (
        <div class="container flex flex-col gap-5">
            <div class="flex items-center justify-center p-3 bg-white bg-opacity-5 rounded-3xl"><h1
                class="text-2xl font-bold">DEV BRANCH</h1></div>
            <div class="p-5 bg-opacity-5 bg-text rounded-3xl flex flex-col lg:flex-row gap-6 lg:justify-around">
                <Dropdown
                    title="Version:"
                    selected={packData.version}
                    setSelected={(e) => setPackData({...packData, version: e as MCVersion})}
                    list={Object(MCVersionList)}
                    hoverText="Minecraft version for the data and resource packs"
                />
                <StyledSwitch
                    title="Advanced Mode:"
                    state={advancedState}
                    onChange={setAdvancedState}
                    hoverText="Advanced editing mode for people who know more about datapacks and want finer controle."
                />

                <FileInput
                    title="Import From File"
                    name="import-from-file"
                    onChange={(e) =>
                        e.currentTarget.files![0].text().then(e => setPackData(JSON.parse(e) as PackContextData))
                    }
                    hoverText="Import PackData from an exported file"
                >
                </FileInput>
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
                            src={packData.icon !== null ? packData?.icon.data : "/img/dr_doof.png"}
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

                <PatternSection packData={packData} setPackData={setPackData} updateIcon={updateIcon}
                                advancedState={advancedState}/>
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
                    <SecondaryButton
                        onClick={exportToFile}
                        type="button"
                    >
                        Export to File
                    </SecondaryButton>
                </div>

                {devMode && (
                    <>
                        <CodePre className="col-span-2">{
                            format({
                                ...packData,
                                icon: packData.icon === null ? null : {
                                    ...packData.icon,
                                    data: packData.icon.data?.slice(22, 30) + "..."
                                },
                                patterns: packData.patterns.map(e => {
                                        return {
                                            ...e,
                                            baseTexture: {...e.baseTexture, data: e.baseTexture.data.slice(22, 30) + "..."},
                                            leggingsTexture: {
                                                ...e.leggingsTexture,
                                                data: e.leggingsTexture.data.slice(22, 30) + "..."
                                            }
                                        }
                                    }
                                ),
                                materials: packData.materials.map(e => {
                                    return {...e, palletTexture: e.palletTexture.slice(22, 30) + "..."}
                                })
                            })
                        }</CodePre>
                        <PrimaryButton
                            className=" top-32 fixed left-3"
                            onClick={() => {
                                setPackData({
                                    ...packData,
                                    name: `Test-${crypto.randomUUID().slice(0, 5)}`,
                                    namespace: "test_ns",
                                    version: "1.20.4",
                                });
                            }}
                        >
                            qFill
                        </PrimaryButton>
                    </>
                )}
            </div>
            <CustomModal isOpen={isOpen} closeModal={closeModal}/>
            <IconCreator ref={canvas} size={128} texture={currentTexture}/>
        </div>
    );
}
