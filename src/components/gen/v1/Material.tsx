import ItemRender from "../../generic/ItemRender.tsx";
import Trash from "../../icons/Trash.tsx";
import Pencil from "../../icons/Pencil.tsx";
import SecondaryButton from "../../generic/btn/SecondaryButton.tsx";
import DragArrow from "../../icons/DragArrow.tsx";

type MaterialProps = {
    onDragStart: (e: DragEvent) => void;
    onDragEnter: () => void;
    material: MaterialData;
    remove: (id: string) => void;
    edit: (id: string) => void;
    isOpen: boolean
    advanced: boolean
};

export default function Material({onDragStart, onDragEnter, material, remove, edit, isOpen, advanced}: MaterialProps) {

    return (
        <div
            draggable
            onDragStart={(e) => onDragStart(e)}
            onDragEnter={() => onDragEnter()}
            onDragOver={(e) => e.preventDefault()}
            className="grid columns-2 grid-flow-col-dense auto-cols-auto justify-end gap-4 md:gap-8 xl:gap-16 bg-secondary bg-opacity-40 px-8 py-4 rounded-3xl relative">

            <div className="flex absolute left-5 self-center">
                <div className="h-6 w-6 rounded-full" style={`background:${material.color};`}></div>
            </div>

            <span className="justify-self-end flex flex-row md:gap-3 items-center re">
                <span className="z-10">
                    {material.translation}
                    <span
                        className={`text-text opacity-50 ${advanced ? "inline" : "hidden"}`}>{`(${material.name})`}</span>
                </span>

                <span className="hidden md:inline">|</span>
                <ItemRender item={`minecraft:${material.item}`} width={32} height={32}/>
                <span className="hidden md:inline">|</span>

                {material.palletTexture &&
                    <img src={material.palletTexture}
                         class="pixel-art text-center" height={16} width={128} alt=""/>
                }
            </span>

            <div className="right-3 w-16"></div>
            <div className="flex gap-2 absolute right-3 self-center ">
                <SecondaryButton>
                    <DragArrow className="fill-accent"></DragArrow>
                </SecondaryButton>
                <SecondaryButton
                    className={isOpen ? "cursor-not-allowed hover:scale-100" : " "}
                    onClick={() => (!isOpen) && edit(material.id)}
                >
                    <Pencil className="fill-accent"></Pencil>
                </SecondaryButton>
                <SecondaryButton
                    onClick={() => remove(material.id)}
                >
                    <Trash className="fill-accent"></Trash>
                </SecondaryButton>
            </div>
        </div>
    );
}
