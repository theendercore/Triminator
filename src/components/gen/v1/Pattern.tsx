import ItemRender from "../../generic/ItemRender.tsx";
import Trash from "../../icons/Trash.tsx";
import Pencil from "../../icons/Pencil.tsx";
import SecondaryButton from "../../generic/btn/SecondaryButton.tsx";
import DragArrow from "../../icons/DragArrow.tsx";

type PatternProps = {
    onDragStart: (e: DragEvent) => void;
    onDragEnter: () => void;
    pattern: PatternData;
    remove: (id: string) => void;
    edit: (id: string) => void;
    isOpen: boolean
    advanced: boolean
};

export default function Pattern({onDragStart, onDragEnter, pattern, remove, edit, isOpen, advanced}: PatternProps) {
    return (
        <div
            draggable
            onDragStart={(e) => onDragStart(e)}
            onDragEnter={() => onDragEnter()}
            onDragOver={(e) => e.preventDefault()}
            class="grid place-items-center bg-secondary bg-opacity-40 px-8 py-4 rounded-3xl relative"
        >
            <div className="flex absolute left-5 self-center">
                <ItemRender item={`minecraft:${pattern.item}`} width={32} height={32}/>
            </div>

            <span class="flex flex-col md:flex-row md:gap-3 items-center">
                <span>
                    {pattern.translation}
                    <span class={`text-text opacity-50 ${advanced ? "inline" : "hidden"}`}>{`(${pattern.name})`}</span>
                </span>

                <span class="hidden md:inline">|</span>
                {pattern.icon != null ?
                    (<img className="inline pixel-art" src={pattern.icon} alt={pattern.name} width={48} height={48}/>)
                    :
                    (<ItemRender item={`minecraft:${pattern.item}`} width={32} height={32}/>)
                }
                <span class="hidden md:inline">|</span>

                <span>{pattern.baseTexture?.name}</span>
            </span>

            <div class="flex gap-2 absolute right-3 ">
                <SecondaryButton>
                    <DragArrow className="fill-accent"></DragArrow>
                </SecondaryButton>
                <SecondaryButton
                    className={isOpen ? "cursor-not-allowed hover:scale-100" : " "}
                    onClick={() => (!isOpen) && edit(pattern.id)}
                >
                    <Pencil className="fill-accent"></Pencil>
                </SecondaryButton>
                <SecondaryButton
                    onClick={() => remove(pattern.id)}
                >
                    <Trash className="fill-accent"></Trash>
                </SecondaryButton>
            </div>
        </div>
    );
}
