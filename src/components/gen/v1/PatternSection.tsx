import {StateUpdater, useState} from "preact/hooks";
import Pattern from "./Pattern";
import {getEmptyPattern} from "../../../api/v1/consts";
import TextInput from "../../generic/input/TextInput.tsx";
import ImageInput from "../../generic/input/ImageInput.tsx";
import {
    format,
    formatIdentifier,
    getImgAlertMessage, resolveDataPackVersion,
    validateImg,
} from "../../../api/Util";
import ItemRender from "../../generic/ItemRender.tsx";
import CodePre from "../../generic/CodePre";
import {devMode} from "../../../api/dev";
import Trash from "../../icons/Trash.tsx";
import PrimaryButton from "../../generic/btn/PrimaryButton.tsx";
import Plus from "../../icons/Plus.tsx";
import SecondaryButton from "../../generic/btn/SecondaryButton.tsx";
import {PackContextData, PatternData} from "../../../api/v1/types";
import StyledSwitch from "../../generic/StyledSwitch.tsx";

type PatternSectionProps = {
    packData: PackContextData;
    setPackData: StateUpdater<PackContextData>;
    advancedState: boolean;
};

export default function PatternSection({
                                           packData,
                                           setPackData,
                                           advancedState,
                                       }: PatternSectionProps) {
    const [pattern, setPattern] = useState<PatternData>(getEmptyPattern);
    const [decal, setDecal] = useState(false)
    const hasDecal = resolveDataPackVersion(packData.version) >= 18
    const isOpen = pattern.id !== "";

    const removePat = (id: string) =>
        setPackData({
            ...packData,
            patterns: packData.patterns.filter((p) => p.id !== id),
        });

    const addPat = (pattern: PatternData) =>
        setPackData({...packData, patterns: [...packData.patterns, pattern]});

    const editPat = (id: string) => {
        setPattern(packData.patterns.find((pat) => pat.id === id)!);
        removePat(id);
    };

    return (
        <div class="px-6 xl:px-12 py-6 bg-secondary bg-opacity-40 rounded-3xl flex flex-col">
            <h3 class="text-3xl font-semibold text-center w-full pb-4">
                Patterns
            </h3>

            <div class="flex flex-col gap-2">
                {packData.patterns.map((p) => (
                    <Pattern
                        key={p.name}
                        pattern={p}
                        remove={removePat}
                        edit={editPat}
                        isOpen={isOpen}
                        advanced={advancedState}
                    />
                ))}
                {isOpen && (
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            addPat({...pattern, decal: hasDecal ? decal : undefined});
                            setPattern(getEmptyPattern());
                        }}
                        class="flex flex-col gap-3 relative bg-secondary bg-opacity-40 p-4 rounded-3xl"
                    >
                        <SecondaryButton
                            className="absolute top-3 right-3 rounded-xl"
                            type="button"
                            onClick={() => setPattern(getEmptyPattern())}
                        >
                            <Trash className="fill-accent"></Trash>
                        </SecondaryButton>

                        <h3 class="text-2xl italic font-semibold pb-1">
                            Add Pattern
                        </h3>

                        {advancedState ? (
                            <>
                                <TextInput
                                    title="Pattern id:"
                                    name="p-name"
                                    value={pattern.name}
                                    placeholder="id..."
                                    onChange={(e) =>
                                        setPattern({
                                            ...pattern,
                                            name: formatIdentifier(
                                                e.currentTarget.value,
                                            ),
                                        })
                                    }
                                    required
                                    hoverText="Identifer of the patter. All lower cases no spaces or symbols!"
                                />
                                <TextInput
                                    title="Translation:"
                                    name="p-translation"
                                    value={pattern.translation}
                                    placeholder="Fancy Name..."
                                    onChange={(e) =>
                                        setPattern({
                                            ...pattern,
                                            translation: e.currentTarget.value,
                                        })
                                    }
                                    required
                                    hoverText="In game name of the patter. This is how the pattern is gonna be called in game. No restrictions here."
                                />
                            </>
                        ) : (
                            <>
                                <TextInput
                                    title="Pattern name:"
                                    name="p-name"
                                    value={pattern.translation}
                                    placeholder="Name..."
                                    onChange={(e) => {
                                        setPattern({
                                            ...pattern,
                                            translation: e.currentTarget.value,
                                            name: formatIdentifier(
                                                e.currentTarget.value,
                                            ),
                                        });
                                    }}
                                    required
                                    hoverText="Name of the patter. This is how the material is gonna be called in game."
                                />
                            </>
                        )}

                        <TextInput
                            title="Item:"
                            name="p-item"
                            value={pattern.item}
                            placeholder="apple, stick, etc..."
                            onChange={(e) =>
                                setPattern({
                                    ...pattern,
                                    item: formatIdentifier(
                                        e.currentTarget.value,
                                    ),
                                })
                            }
                            required
                            hoverText={
                                'The item used to make the pattern. For vanilla patterns that is "coast_armor_trim", "sentry_armor_trim" etc. MUST be a real item in the game, if you dont see a preview then it probably doesn\'t exits.'
                            }
                        >
                            <ItemRender
                                item={`minecraft:${pattern.item}`}
                                noAlt
                            />
                        </TextInput>

                        <ImageInput
                            title="Base Texture:"
                            name="p-base-texture"
                            onChange={(e) => {
                                let image = validateImg(
                                    e.currentTarget.files![0],
                                    64,
                                    32,
                                );
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
                            hoverText="Base pattern texture. Size 64x32"
                        />
                        <ImageInput
                            title="Legging Texture:"
                            name="p-leggings-texture"
                            onChange={(e) => {
                                let image = validateImg(
                                    e.currentTarget.files![0],
                                    64,
                                    32,
                                );
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
                            hoverText="Leggings pattern texture. Size 64x32"
                        />

                        {advancedState && hasDecal &&
                            <StyledSwitch
                                className="w-full"
                                title="Decal:"
                                label="decal"
                                onChange={setDecal}
                                state={decal}
                                hoverText="Look this one up on the wiki, I dont know how to explain it."
                            />
                        }


                        <PrimaryButton
                            className="self-center px-6 mt-4 bg-opacity-90"
                            type="submit"
                        >
                            Add
                        </PrimaryButton>
                    </form>
                )}
            </div>
            <div class="flex items-center gap-2 self-center p-3">
                <PrimaryButton
                    className={`p-1 h-min rounded-xl ${
                        isOpen && "cursor-not-allowed hover:scale-100"
                    }`}
                    onClick={() =>
                        setPattern({...pattern, id: crypto.randomUUID()})
                    }
                    disabled={isOpen}
                >
                    <Plus
                        className={isOpen ? "fill-background" : "fill-text"}
                    />
                </PrimaryButton>
            </div>

            {devMode && (
                <>
                    <CodePre>{format(pattern)}</CodePre>
                    <SecondaryButton
                        className={` fixed left-3 top-44 px-3`}
                        onClick={() => {
                            let id = crypto.randomUUID();
                            addPat({
                                id: id,
                                name: id.slice(0, 5),
                                translation: "qPattern",
                                item: "ender_chest",
                                decal: hasDecal ? false : undefined,
                                baseTexture: new File([], "temp"),
                                leggingsTexture: new File([], "temp"),
                            });
                        }}
                    >
                        qPat
                    </SecondaryButton>
                </>
            )}
        </div>
    );
}
