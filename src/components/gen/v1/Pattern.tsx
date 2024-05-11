import ItemRender from "../../generic/ItemRender.tsx";
import Trash from "../../icons/Trash.tsx";
import Pencil from "../../icons/Pencil.tsx";
import SecondaryButton from "../../generic/btn/SecondaryButton.tsx";
import DragArrow from "../../icons/DragArrow.tsx";
import {useMemo} from "preact/hooks";

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
    const len = 12
    const name = useMemo(() => pattern.name.slice(0, len) + (pattern.name.length > len ? "..." : ""), [pattern])

    return (
        <div
            draggable
            onDragStart={(e) => onDragStart(e)}
            onDragEnter={() => onDragEnter()}
            onDragOver={(e) => e.preventDefault()}
            class="grid columns-2 grid-flow-col-dense auto-cols-auto justify-end gap-4 md:gap-8 xl:gap-16 bg-secondary bg-opacity-40 px-8 py-4 rounded-3xl relative"
        >
            {/*<div className="flex absolute left-5 self-center">*/}
            {/*    <ItemRender item={`minecraft:${pattern.item}`} width={32} height={32}/>*/}
            {/*</div>*/}

            <span class="justify-self-end flex flex-col md:flex-row md:gap-3 items-center">
                <span>
                    {pattern.translation}
                    <span class={`text-text opacity-50 ${advanced ? "inline" : "hidden"}`}>{`(${pattern.name})`}</span>
                </span>

                <span class="hidden md:inline">|</span>

                {pattern.icon ?
                    <img className="inline pixel-art before:flex before:justify-center before:items-center before:pt-3"
                         src={pattern.icon} alt={pattern.name + " icon"} width={48} height={48}/>
                    :
                    <span>{name}</span>
                }

                <span class="hidden md:inline">|</span>

                <span><ItemRender item={`minecraft:${pattern.item}`} width={32} height={32}/></span>
            </span>

            <div className="right-3 w-16 lg:w-24"></div>

            <div class="flex gap-2 absolute right-3 self-center ">
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
