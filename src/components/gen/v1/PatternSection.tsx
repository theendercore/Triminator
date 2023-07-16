import {StateUpdater, useState} from "preact/hooks";
import Pattern from "./Pattern";
import RoundButton from "../../generic/RoundButton";
import {getEmptyPattern} from "../../../api/v1/consts";
import TextInput from "../../generic/TextInput";
import ImageInput from "../../generic/ImageInput";
import {
    format,
    formatIdentifier,
    getImgAlertMessage,
    validateImg,
} from "../../../api/Util";
import ItemRender from "../../generic/ItemRender";
import CodePre from "../../generic/CodePre";
import {devMode} from "../../../api/dev";
import Trash from "../../icons/Trash.tsx";

type PatternSectionProps = {
    packData: PackContextData;
    setPackData: StateUpdater<PackContextData>;
};

export default function PatternSection({
                                           packData,
                                           setPackData,
                                       }: PatternSectionProps) {
    const [pattern, setPattern] = useState<PatternData>(getEmptyPattern);
    const isOpen = pattern.id !== "";

    const removePat = (id: string) =>
        setPackData({
            ...packData,
            patterns: packData.patterns.filter((p) => p.id !== id),
        });

    const addPat = (pattern: PatternData) =>
        setPackData({...packData, patterns: [...packData.patterns, pattern]});


    const editPat = (id: string) => {
        setPattern(packData.patterns.find(pat => pat.id === id)!)
        removePat(id)
    }

    return (
        <div class="p-3 bg-slate-800 rounded-xl flex flex-col">
            <h3 class="text-2xl">Patterns</h3>

            <div class="flex flex-col gap-2">
                {packData.patterns.map((p) => (
                    <Pattern key={p.name} pattern={p} remove={removePat} edit={editPat}/>
                ))}
                {isOpen && (
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            addPat(pattern);
                            setPattern(getEmptyPattern());
                        }}
                        class="flex flex-col relative bg-slate-700 p-4 rounded-xl"
                    >
                        <RoundButton
                            className="absolute px-4 py-0 bg-black top-2 right-2"
                            type="button"
                            onClick={() => setPattern(getEmptyPattern())}
                        >
                            <Trash className="fill-slate-600"></Trash>
                        </RoundButton>
                        <h3 class="text-xl">Add Pattern</h3>
                        <TextInput
                            title="Pattern name:"
                            name="p-name"
                            value={pattern.name}
                            placeholder="name..."
                            onChange={(e) =>
                                setPattern({
                                    ...pattern,
                                    name: formatIdentifier(e.currentTarget.value),
                                })
                            }
                            required
                        />
                        <TextInput
                            title="Translation:"
                            name="p-translation"
                            value={pattern.translation}
                            placeholder="Name..."
                            onChange={(e) =>
                                setPattern({...pattern, translation: e.currentTarget.value})
                            }
                            required
                        />
                        <TextInput
                            title="Item:"
                            name="p-item"
                            value={pattern.item}
                            placeholder="apple, stick, etc..."
                            onChange={(e) =>
                                setPattern({
                                    ...pattern,
                                    item: formatIdentifier(e.currentTarget.value),
                                })
                            }
                            required
                        >
                            <ItemRender item={`minecraft:${pattern.item}`} noAlt/>
                        </TextInput>

                        <ImageInput
                            title="Base Texture:"
                            name="p-base-texture"
                            onChange={(e) => {
                                let image = validateImg(e.currentTarget.files![0], 64, 32);
                                if (typeof image === "string") {
                                    alert(getImgAlertMessage(image, 64, 32));
                                    return;
                                }
                                setPattern({
                                    ...pattern,
                                    baseTexture: e.currentTarget.files![0],
                                });
                            }}
                            fileName={pattern.baseTexture?.name}
                            required
                        />
                        <ImageInput
                            title="Legging Texture:"
                            name="p-leggings-texture"
                            onChange={(e) => {
                                let image = validateImg(e.currentTarget.files![0], 64, 32);
                                if (typeof image === "string") {
                                    alert(getImgAlertMessage(image, 64, 32));
                                    return;
                                }
                                setPattern({
                                    ...pattern,
                                    leggingsTexture: e.currentTarget.files![0],
                                });
                            }}
                            fileName={pattern.leggingsTexture?.name}
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
                    onClick={() => setPattern({...pattern, id: crypto.randomUUID()})}
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
                            addPat({
                                id: id,
                                name: id.slice(0, 5),
                                translation: "qPattern",
                                item: "ender_chest",
                                baseTexture: new File([], "temp"),
                                leggingsTexture: new File([], "temp"),
                            });
                        }}
                    >
                        q
                    </RoundButton>
                )}
            </div>
            {devMode && <CodePre>{format(pattern)}</CodePre>}
        </div>
    );
}
