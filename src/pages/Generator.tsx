import {useState, useRef, useEffect, useMemo} from "preact/hooks";
import {getEmptyPackInfo, MCVersionList} from "../api/v1/consts";
import CodePre from "../components/generic/CodePre";
import {downloadBlob, fetchMcData, format, formatName} from "../api/Util";
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
import {PackContextData, MCVersion, PackInfo} from "../api/v1/ExtraTypes";
import CustomModal from "../components/gen/v1/CustomModal.tsx";
import FileInput from "../components/generic/input/FileInput.tsx";
import {IconCreator} from "../components/gen/three/IconCreator.tsx";
import * as utl from "../api/Util.ts";

export default function Generator({}: { path: string }) {
    const canvas = useRef<HTMLCanvasElement>(null!);
    const [packInfo, setPackInfo] = useState<PackInfo>(getEmptyPackInfo());
    const [patterns, setPatterns] = useState<PatternData[]>([]);
    const [materials, setMaterials] = useState<MaterialData[]>([]);
    const [currentTexture, setCurrentTexture] = useState("");
    const [iconToUpdate, setIconToUpdate] = useState("");
    const [advancedState, setAdvancedState] = useState<boolean>(false);
    const [isOpen, setIsOpen] = useState(false)

    const [downloadState, setDownloadState] = useState<"BOTH" | "DATA" | "RESOURCE">("BOTH");

    useMemo(() => fetchMcData(), undefined)

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
        let pattern = patterns.find(it => it.id === iconToUpdate) as PatternData
        if (pattern == null) return
        setCurrentTexture(pattern.baseTexture?.data!)
        if (canvas.current && currentTexture.length > 10) {
            setTimeout(() => {
                canvas.current.toBlob(it => {
                    if (it == null) return
                    utl.getBase64(it, (img) => {
                        pattern.icon = img?.toString()
                        let newPatterns = [...patterns]
                        let idx = newPatterns.findIndex(e => e.id === pattern.id);
                        newPatterns.splice(idx, 1, pattern)
                        setPatterns(newPatterns)
                        setIconToUpdate("")
                    })
                }, 'image/png')
            }, 1000)
        }
    }, [iconToUpdate])

    function exportToFile() {
        let blob = new Blob([JSON.stringify(packInfo, null, 2)], {type: "application/json;charset=utf-8"});
        downloadBlob(blob, `${formatName(packInfo.name)}_export.json`)
    }

    function generate(e: TargetedEvent<HTMLFormElement, Event>) {
        e.preventDefault();
        openModal()

        if (downloadState === "DATA" || downloadState === "BOTH")
            genDatapack(makePackData())
                .then(blob => downloadBlob(blob, `${formatName(packInfo.name)}Datapack.zip`))

        if (downloadState === "RESOURCE" || downloadState === "BOTH")
            genResourcePack(makePackData())
                .then(blob => downloadBlob(blob, `${formatName(packInfo.name)}ResourcePack.zip`))
    }

    function makePackData(): PackContextData {
        return {...packInfo, patterns: patterns, materials: materials}
    }

    // @ts-ignore
    return (
        <div class="container flex flex-col gap-5">
            <div class="flex items-center justify-center p-3 bg-white bg-opacity-5 rounded-3xl"><h1
                class="text-2xl font-bold">DEV BRANCH</h1></div>
            <div class="p-5 bg-opacity-5 bg-text rounded-3xl flex flex-col lg:flex-row gap-6 lg:justify-around">
                <Dropdown
                    title="Version:"
                    selected={packInfo.version}
                    setSelected={(e) => setPackInfo({...packInfo, version: e as MCVersion})}
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
                        e.currentTarget.files![0].text().then(e => {
                                let importData = JSON.parse(e) as PackContextData
                                setPackInfo({...importData})
                                setMaterials(importData.materials)
                                setPatterns(importData.patterns)
                            }
                        )
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
                            {packInfo.name.trim() === "" ? "Trim" : packInfo.name} Pack
                        </h2>
                        <p class="flex-wrap">
                            {packInfo.description || "Pack generated by Triminator"}
                        </p>
                    </div>

                    <div class="min-w-[8rem] min-h-[8rem] rounded-3xl bg-background-2 grid items-center">
                        <img
                            src={packInfo.icon !== null ? packInfo?.icon.data : "/img/dr_doof.png"}
                            alt={packInfo.icon?.name}
                            height={128}
                            width={128}
                            class="pixel-art rounded-3xl"
                        />
                    </div>
                </div>

                <GenHeader
                    className="place-self-center"
                    packInfo={packInfo}
                    setPackInfo={setPackInfo}
                    onSubmit={generate}
                    advancedState={advancedState}
                />
                <PatternSection
                    packInfo={packInfo}
                    patterns={patterns}
                    setPatterns={setPatterns}
                    updateIcon={updateIcon}
                    advancedState={advancedState}
                />
                <MaterialSection
                    materials={materials}
                    setMaterials={setMaterials}
                    advancedState={advancedState}
                />

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
                                ...packInfo,
                                icon: packInfo.icon === null ? null : {
                                    ...packInfo.icon,
                                    data: packInfo.icon.data?.slice(22, 30) + "..."
                                },
                                patterns: [],
                                // patterns.map(e => {
                                //         return {
                                //             ...e,
                                //             baseTexture: {
                                //                 ...e.baseTexture,
                                //                 data: e.baseTexture!.data.slice(22, 30) + "..."
                                //             },
                                //             leggingsTexture: {
                                //                 ...e.leggingsTexture,
                                //                 data: e.leggingsTexture!.data.slice(22, 30) + "..."
                                //             }
                                //         }
                                //     }
                                // ),
                                materials: materials.map(e => {
                                    return {...e, palletTexture: e.palletTexture!.slice(22, 30) + "..."}
                                })
                            })
                        }</CodePre>
                        <PrimaryButton
                            className=" top-32 fixed left-3"
                            onClick={() => {
                                setPackInfo({
                                    ...packInfo,
                                    name: `Test-${window.crypto.randomUUID().slice(0, 5)}`,
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
