import RoundButton from "../../generic/RoundButton";
import ItemRender from "../../generic/ItemRender";
import Trash from "../../icons/Trash.tsx";
import Pencil from "../../icons/Pencil.tsx";

type MaterialProps = {
    material: MaterialData;
    remove: (id: string) => void;
    edit: (id: string) => void;
};

export default function Material({material, remove, edit}: MaterialProps) {

    return (
        <div class="flex items-center justify-center bg-gray-700 p-4 py-3 rounded-xl relative">
            {`${material.translation}`}
            <span class="text-gray-500">{`(${material.name})`}</span>
            {` | `}
            <ItemRender item={`minecraft:${material.item}`} width={32} height={32}/>
            {` | `}
            {material.palletTexture &&
                <img src={URL.createObjectURL(material.palletTexture)}
                     alt={material.palletTexture!.name} height={16} width={128} style={
                    "-ms-interpolation-mode: nearest-neighbor;" +
                    " image-rendering: -webkit-optimize-contrast;" +
                    " image-rendering: crisp-edges; " +
                    "image-rendering: pixelated;"
                }/>
            }
            <div class="pl-28"/>
            <div class="flex gap-2 absolute right-2">
                <RoundButton
                    className="text-sm bg-slate-900"
                    onClick={() => edit(material.id)}
                >
                    <Pencil className="fill-slate-600"></Pencil>
                </RoundButton>
                <RoundButton
                    className="text-sm bg-slate-900"
                    onClick={() => remove(material.id)}
                >
                    <Trash className="fill-slate-600"></Trash>
                </RoundButton>
            </div>
        </div>
    );
}
