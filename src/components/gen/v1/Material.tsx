import RoundButton from "../../generic/RoundButton";
import ItemRender from "../../generic/ItemRender";
import Trash from "../../icons/Trash.tsx";

type MaterialProps = { material: MaterialData; remove: (id: string) => void };

export default function Material({material, remove}: MaterialProps) {
    return (
        <div class="flex items-center justify-center bg-gray-700 p-4 py-3 rounded-xl relative">
            {`${material.translation}`}
            <span class="text-gray-500">{`(${material.name})`}</span>
            {` | `}
            <ItemRender item={`minecraft:${material.item}`} width={32} height={32}/>
            <span class="pr-20">{` | ${material.palletTexture?.name}`}</span>
            <RoundButton
                className="absolute text-sm bg-slate-900 right-2"
                onClick={() => remove(material.id)}
            >
                <Trash className="fill-slate-600"></Trash>
            </RoundButton>
        </div>
    );
}
