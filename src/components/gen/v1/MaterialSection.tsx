import {getEmptyMaterial} from "../../../api/v1/consts";
import TextInput from "../../generic/input/TextInput.tsx";
import ImageInput from "../../generic/input/ImageInput.tsx";
import * as utl from "../../../api/Util";
import ItemRender from "../../generic/ItemRender.tsx";
import CodePre from "../../generic/CodePre";
import {devMode} from "../../../api/dev";
import Trash from "../../icons/Trash.tsx";
import Material from "./Material.tsx";
import ColorInput from "../../generic/input/ColorInput.tsx";
import PrimaryButton from "../../generic/btn/PrimaryButton.tsx";
import Plus from "../../icons/Plus.tsx";
import SecondaryButton from "../../generic/btn/SecondaryButton.tsx";
import type {PackContextData} from "../../../api/v1/ExtraTypes";
import {useState} from "preact/hooks";

type MaterialSectionProps = {
    packData: PackContextData;
    setPackData: (e:PackContextData) => void;
    advancedState: boolean;
};

export default function MaterialSection({packData, setPackData, advancedState,}: MaterialSectionProps) {
    const [material, setMaterial] = useState<MaterialData>(getEmptyMaterial());
    const isOpen = material.id !== "";
    const [dragItem, setDragItem] = useState<number>(0);

    const removeMat = (id: string) =>
        setPackData({...packData, materials: packData.materials.filter(p => p.id !== id),});

    const addMat = (material: MaterialData) =>
        setPackData({...packData, materials: [...packData.materials, material]});
    const editMat = (id: string) => {
        setMaterial(packData.materials.find(mat => mat.id === id)!)
        removeMat(id)
    }

    function handleDragStart(e: DragEvent, index: number) {
        utl.setDragImageEmpty(e)
        setDragItem(index);
    }

    function handleDragEnter(index: number) {
        const newList = [...packData.materials];
        const item = newList[dragItem];
        newList.splice(dragItem, 1);
        newList.splice(index, 0, item);
        setDragItem(index);
        setPackData({...packData, materials: newList});
    }

    return (
        <div class="px-6 xl:px-12 py-6 bg-secondary bg-opacity-40 rounded-3xl flex flex-col">
            <h3 class="text-3xl font-semibold text-center w-full pb-4">Materials
                {(packData.materials.length > 1 && (
                    <span className="italic opacity-60">{` (${packData.materials.length})`}</span>))}
            </h3>

            <div class="flex items-center gap-2 self-center p-3">
                {!isOpen &&
                    <PrimaryButton
                        className={`p-1 h-min rounded-xl`}
                        onClick={() => setMaterial({
                            ...material,
                            id: crypto.randomUUID(),
                            index: utl.genIndex(),
                            color: "#ffffff"
                        })}
                        disabled={isOpen}
                    >
                        <Plus className={isOpen ? "fill-background" : "fill-text"}/></PrimaryButton>
                }
            </div>

            <div class="flex flex-col gap-2">
                {isOpen && (
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            addMat(material);
                            setMaterial(getEmptyMaterial());
                        }}
                        class="flex flex-col gap-3 relative bg-secondary bg-opacity-40 p-4 rounded-3xl"
                    >
                        <SecondaryButton
                            className="absolute top-3 right-3 rounded-xl"
                            type="button"
                            onClick={() => setMaterial(getEmptyMaterial())}
                        >
                            <Trash className="fill-accent"></Trash>
                        </SecondaryButton>

                        <h3 class="text-2xl italic font-semibold pb-1">Add Material</h3>

                        {advancedState ?
                            (
                                <>
                                    <TextInput
                                        title="Material id:"
                                        name="m-name"
                                        value={material.name}
                                        placeholder="id..."
                                        onChange={(e) =>
                                            setMaterial({
                                                ...material,
                                                name: utl.formatIdentifier(e.currentTarget.value),
                                            })
                                        }
                                        required

                                        hoverText="Identifier of the material. All lower cases no spaces or symbols!"
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
                                        hoverText="In game name of the material. This is how the material is gonna be called in game. No restrictions here."
                                    />
                                </>)
                            :
                            (
                                <TextInput
                                    title="Material name:"
                                    name="m-name"
                                    value={material.translation}
                                    placeholder="Name..."
                                    onChange={(e) => setMaterial({
                                        ...material,
                                        translation: e.currentTarget.value,
                                        name: utl.formatIdentifier(e.currentTarget.value),
                                    })}
                                    required
                                    hoverText="Name of the material. This is how the material is gonna be called in game."
                                />
                            )
                        }

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
                            hoverText="Material text color."
                        />

                        <TextInput
                            title="Item:"
                            name="m-item"
                            value={material.item}
                            placeholder="apple, stick, etc..."
                            onChange={(e) =>
                                setMaterial({
                                    ...material,
                                    item: utl.formatIdentifier(e.currentTarget.value),
                                })
                            }
                            required
                            hoverText={"The item used to make the material. For vanilla materials, that is \"iron_ingot\", \"amethyst_shard\" etc. MUST be a real item in the game, if you dont see a preview then it probably doesn't exist."}
                        >
                            <ItemRender item={`minecraft:${material.item}`} noAlt/>
                        </TextInput>

                        {advancedState &&
                            <TextInput
                                title="Index:"
                                name="m-index"
                                value={`${material.index}`}
                                placeholder="index..."
                                onChange={(e) =>
                                    setMaterial({
                                        ...material,
                                        index: Number(e.currentTarget.value),
                                    })
                                }
                                hoverText="This is the index, its been auto generated to be unique. Dont touch it unless you know what you are doing."
                            />}
                        <ImageInput
                            title="Pallet Texture:"
                            name="m-pallet-texture"
                            onChange={(e) => {
                                let image = utl.validateImg(e.currentTarget.files![0], 8, 1);
                                if (typeof image === "string") {
                                    alert(utl.getImgAlertMessage(image, 8, 1));
                                    return;
                                }
                                setMaterial({...material, fileName: e.currentTarget.files![0].name})
                                utl.getBase64(e.currentTarget.files![0], (it) =>
                                    setMaterial({...material, palletTexture: it as string,})
                                )
                            }}
                            fileName={material.fileName}
                            required={material.palletTexture === undefined || material.palletTexture === null}
                            hoverText="Pallet texture. Size 8x1"
                        >
                            {material.palletTexture &&
                                <img src={material.palletTexture}
                                     alt={material.fileName} height={16} width={128}
                                     class="pixel-art text-right"
                                />
                            }
                        </ImageInput>

                        <PrimaryButton
                            className="self-center mt-4 px-6 bg-opacity-90"
                            type="submit"
                        >
                            Add
                        </PrimaryButton>
                    </form>
                )}
                {packData.materials.map((p, idx) => (
                    <Material
                        onDragStart={(e) => handleDragStart(e, idx)}
                        onDragEnter={() => handleDragEnter(idx)}
                        key={p.name}
                        material={p}
                        remove={removeMat}
                        edit={editMat}
                        isOpen={isOpen}
                        advanced={advancedState}
                    />
                ))}
            </div>

            {devMode &&
                <>
                    <CodePre>{utl.format(material)}</CodePre>
                    <SecondaryButton
                        className={`px-3 fixed left-3 top-56`}
                        onClick={() => {
                            let id = crypto.randomUUID();
                            addMat({
                                id: id,
                                name: id.slice(0, 5),
                                translation: "qMaterial",
                                item: "chest",
                                palletTexture: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAABCAMAAADU3h9xAAAAAXNSR0IArs4c6QAAABhQTFRFl9FVjcJPeahCYJgWWZADU4IJRm0MPWMXzAAhkAAAABFJREFUCJljYGBkYmZhZWMHAABdAB2tV7ZvAAAAAElFTkSuQmCC",
                                fileName: "cool_img.png",
                                color: "#FFFFFF",
                                index: utl.genIndex()
                            });
                        }}
                    >qMat
                    </SecondaryButton>
                </>
            }
        </div>
    );
}
