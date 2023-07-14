import RoundButton from "../../generic/RoundButton";
import ItemRender from "../../generic/ItemRender";
import Trash from "../../icons/Trash.tsx";

type PatternProps = { pattern: PatternData; remove: (id: string) => void };

export default function Pattern({ pattern, remove }: PatternProps) {
  return (
    <div class="flex items-center justify-center bg-gray-700 p-4 py-3 rounded-xl relative">
      {`${pattern.translation}`}
      <span class="text-gray-500">{`(${pattern.name})`}</span>
      {` | `}
      <ItemRender item={`minecraft:${pattern.item}`} width={32} height={32} />
      {` | ${pattern.leggingsTexture?.name}`}
      <RoundButton
        className="absolute text-sm bg-slate-900 right-2"
        onClick={() => remove(pattern.id)}
      >
        <Trash className="fill-slate-600"></Trash>
      </RoundButton>
    </div>
  );
}
