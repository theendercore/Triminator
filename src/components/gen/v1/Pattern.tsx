import RoundButton from "../../generic/RoundButton";
import ItemRender from "../../generic/ItemRender";
import Trash from "../../icons/Trash.tsx";
import Pencil from "../../icons/Pencil.tsx";

type PatternProps = {
    pattern: PatternData;
    remove: (id: string) => void;
    edit: (id: string) => void;
};

export default function Pattern({pattern, remove, edit}: PatternProps) {
    return (
        <div class="flex items-center justify-center bg-gray-700 p-4 py-3 rounded-xl relative">
            {`${pattern.translation}`}
            <span class="text-gray-500">{`(${pattern.name})`}</span>
            {` | `}
            <ItemRender item={`minecraft:${pattern.item}`} width={32} height={32}/>
            <span>{` | ${pattern.baseTexture?.name}`}</span>
            <div class="pl-28"/>
            <div class="flex gap-2 absolute right-2">
                <RoundButton
                    className="text-sm bg-slate-900"
                    onClick={() => edit(pattern.id)}
                >
                    <Pencil className="fill-slate-600"></Pencil>
                </RoundButton>
                <RoundButton
                    className="text-sm bg-slate-900"
                    onClick={() => remove(pattern.id)}
                >
                    <Trash className="fill-slate-600"></Trash>
                </RoundButton>
            </div>
        </div>
    );
}
