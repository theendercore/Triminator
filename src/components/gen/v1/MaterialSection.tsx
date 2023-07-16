import {StateUpdater, useState} from "preact/hooks";
import RoundButton from "../../generic/RoundButton";
import {getEmptyMaterial} from "../../../api/v1/consts";
import TextInput from "../../generic/TextInput";
import ImageInput from "../../generic/ImageInput";
import {
    format,
    formatIdentifier, genIndex,
    getImgAlertMessage,
    validateImg,
} from "../../../api/Util";
import ItemRender from "../../generic/ItemRender";
import CodePre from "../../generic/CodePre";
import {devMode} from "../../../api/dev";
import Trash from "../../icons/Trash.tsx";
import Material from "./Material.tsx";
import ColorInput from "../../generic/ColorInput.tsx";

type MaterialSectionProps = {
    packData: PackContextData;
    setPackData: StateUpdater<PackContextData>;
};

export default function MaterialSection({packData, setPackData,}: MaterialSectionProps) {
    const [material, setMaterial] = useState<MaterialData>(getEmptyMaterial());
    const isOpen = material.id !== "";

    const removeMat = (id: string) =>
        setPackData({...packData, materials: packData.materials.filter(p => p.id !== id),});

    const addMat = (material: MaterialData) =>
        setPackData({...packData, materials: [...packData.materials, material]});

    return (
        <div class="p-3 bg-slate-800 rounded-xl flex flex-col">
            <h3 class="text-2xl">Materials</h3>

            <div class="flex flex-col gap-2">
                {packData.materials.map((p) => (
                    <Material key={p.name} material={p} remove={removeMat}/>
                ))}
                {isOpen && (
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            addMat(material);
                            setMaterial(getEmptyMaterial());
                        }}
                        class="flex flex-col relative bg-slate-700 p-4 rounded-xl"
                    >
                        <RoundButton
                            className="absolute px-4 py-0 bg-black top-2 right-2"
                            type="button"
                            onClick={() => setMaterial(getEmptyMaterial())}
                        >
                            <Trash className="fill-slate-600"></Trash>
                        </RoundButton>
                        <h3 class="text-xl">Add Material</h3>
                        <TextInput
                            title="Material name:"
                            name="m-name"
                            value={material.name}
                            placeholder="name..."
                            onChange={(e) =>
                                setMaterial({
                                    ...material,
                                    name: formatIdentifier(e.currentTarget.value),
                                })
                            }
                            required
                        />
                        <TextInput
                            title="Translation:"
                            name="m-translation"
                            value={material.translation}
                            placeholder="Name..."
                            onChange={(e) =>
                                setMaterial({...material, translation: e.currentTarget.value})
                            }
                            required
                        />
                        <ColorInput
                            title="Color:"
                            name="m-color"
                            value={material.color}
                            onChange={(e) =>
                                setMaterial({
                                    ...material,
                                    color: e.currentTarget.value,
                                })
                            }
                            required
                        />

                        <TextInput
                            title="Item:"
                            name="m-item"
                            value={material.item}
                            placeholder="apple, stick, etc..."
                            onChange={(e) =>
                                setMaterial({
                                    ...material,
                                    item: formatIdentifier(e.currentTarget.value),
                                })
                            }
                            required
                        >
                            <ItemRender item={`minecraft:${material.item}`} noAlt/>
                        </TextInput>

                        <ImageInput
                            title="Base Texture:"
                            name="m-pallet-texture"
                            onChange={(e) => {
                                let image = validateImg(e.currentTarget.files![0], 8, 1);
                                if (typeof image === "string") {
                                    alert(getImgAlertMessage(image, 8, 1));
                                    return;
                                }
                                setMaterial({
                                    ...material,
                                    palletTexture: e.currentTarget.files![0],
                                });
                            }}
                            fileName={material.palletTexture?.name}
                            required
                        />

                        <RoundButton
                            className="self-center p-2 py-1.5 mt-4 bg-slate-700 hover:bg-slate-600"
                            type="submit"
                        >
                            Submit
                        </RoundButton>
                    </form>
                )}
            </div>
            <div class="flex gap-2 self-center">
                <RoundButton
                    className={`px-3 mt-3 bg-slate-700 hover:bg-slate-500  ${
                        isOpen && "cursor-not-allowed"
                    }`}
                    onClick={() => setMaterial({...material, id: crypto.randomUUID(), index: genIndex(), color:"#ffffff"})}
                    disabled={isOpen}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 16 16"
                        width="16"
                        height="16"
                        class="fill-slate-300 "
                    >
                        <path
                            fillRule="evenodd"
                            d="M1.5 8a6.5 6.5 0 1113 0 6.5 6.5 0 01-13 0zM8 0a8 8 0 100 16A8 8 0 008 0zm.75 4.75a.75.75 0 00-1.5 0v2.5h-2.5a.75.75 0 000 1.5h2.5v2.5a.75.75 0 001.5 0v-2.5h2.5a.75.75 0 000-1.5h-2.5v-2.5z"
                        ></path>
                    </svg>
                </RoundButton>
                {devMode && (
                    <RoundButton
                        className={`px-3 mt-3 bg-slate-700 hover:bg-slate-500`}
                        onClick={() => {
                            let id = crypto.randomUUID();
                            addMat({
                                id: id,
                                name: id.slice(0, 5),
                                translation: "qMaterial",
                                item: "chest",
                                palletTexture: new File([], "temp"),
                                color: "#FFFFFF",
                                index: genIndex()
                            });
                        }}
                    >
                        q
                    </RoundButton>
                )}
            </div>
            {devMode && <CodePre>{format(material)}</CodePre>}
        </div>
    );
}
