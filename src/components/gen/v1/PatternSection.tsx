import {useMemo, useRef, useState} from "preact/hooks";
import Pattern from "./Pattern";
import {getEmptyPattern} from "../../../api/v1/consts";
import TextInput from "../../generic/input/TextInput.tsx";
import ImageInput from "../../generic/input/ImageInput.tsx";
import * as utl from "../../../api/Util";
import ItemRender from "../../generic/ItemRender.tsx";
import CodePre from "../../generic/CodePre";
import {devMode} from "../../../api/dev";
import Trash from "../../icons/Trash.tsx";
import PrimaryButton from "../../generic/btn/PrimaryButton.tsx";
import Plus from "../../icons/Plus.tsx";
import SecondaryButton from "../../generic/btn/SecondaryButton.tsx";
import StyledSwitch from "../../generic/StyledSwitch.tsx";
import type {PackInfo} from "../../../api/v1/ExtraTypes";
import PatternDisplay from "../three/PatternDisplay.tsx";
import {v4 as uuid} from "uuid";
import {resetRot} from "../../../api/Rotator.ts";

type PatternSectionProps = {
    packInfo: PackInfo;
    patterns: PatternData[];
    setPatterns: (e: PatternData[]) => void;
    renderIcon: (id: string, texture: string) => void;
    advancedState: boolean;
};

export default function PatternSection(
    {packInfo, patterns, setPatterns, renderIcon, advancedState,}: PatternSectionProps
) {
    const [pattern, setPattern] = useState<PatternData>(getEmptyPattern());
    const [decal, setDecal] = useState(false)
    const [index, setIndex] = useState(-1)
    const [dragItem, setDragItem] = useState<number>(0);

    const hasDecal = useMemo(() => utl.resolveDataPackVersion(packInfo.version) >= 18, [packInfo])
    const isOpen = useMemo(() => pattern.id !== "", [pattern])
    const nameRef = useRef<HTMLHeadingElement>(null!)


    const removePat = (id: string) =>
        setPatterns(patterns.filter((p) => p.id !== id))

    function addPat(pattern: PatternData, index: number) {
        if (index >= 0) {
            let newPatterns = [...patterns]
            newPatterns.splice(index, 0, pattern)
            setPatterns(newPatterns)
        } else {
            setPatterns([pattern, ...patterns,])
        }
    }

    const editPat = (id: string) => {
        setPattern(patterns.find((pat, idx) => {
            if (pat.id === id) {
                setIndex(idx)
                return true
            }
            return false
        })!);
        removePat(id);
        scrollToName()
    }

    function handleDragStart(e: DragEvent, idx: number) {
        utl.setDragImageEmpty(e)
        setDragItem(idx);
    }

    function handleDragEnter(idx: number) {
        const newList = [...patterns];
        const item = newList[dragItem];
        newList.splice(dragItem, 1);
        newList.splice(idx, 0, item);
        setDragItem(idx);
        setPatterns(newList);
    }

    function scrollToName() {
        window.scrollTo({top: nameRef.current.offsetTop, behavior: 'smooth'})
    }

    // @ts-ignore
    function sort(compareFn: (a: PatternData, b: PatternData) => number) {
        let x = [...patterns].sort(compareFn)
        setPatterns(x)
    }

    return (
        <div class="px-6 xl:px-12 py-6 bg-secondary bg-opacity-40 rounded-3xl flex flex-col">
            <h3 ref={nameRef} class="text-3xl font-semibold text-center w-full pb-4">
                Patterns
                {(patterns.length > 1 && (
                    <span className="italic opacity-60">{` (${patterns.length})`}</span>))}
            </h3>
            <div class="flex self-center p-3 w-full justify-center relative">
                {!isOpen &&
                    <PrimaryButton
                        className={`p-1 h-min rounded-xl`}
                        onClick={() => {
                            setPattern({...pattern, id: uuid()})
                            setIndex(-1)
                        }}
                        disabled={isOpen}
                    >
                        <Plus
                            className={isOpen ? "fill-background" : "fill-text"}
                        />
                    </PrimaryButton>}
                {/*<div className="absolute right-2">*/}
                {/*    <PrimaryButton onClick={() => sort((a, b) => b.name.length - a.name.length)}>v</PrimaryButton>*/}
                {/*    <PrimaryButton onClick={() => sort((a, b) => a.name.length - b.name.length)}>^</PrimaryButton>*/}
                {/*    <PrimaryButton*/}
                {/*        onClick={() => sort((a, b) => (a.name < b.name) ? -1 : (a.name > b.name) ? 1 : 0)}>^1</PrimaryButton>*/}


                {/*    <PrimaryButton*/}
                {/*        onClick={() => sort((a, b) => -1 * ((a.name < b.name) ? -1 : (a.name > b.name) ? 1 : 0))}>v1</PrimaryButton>*/}

                {/*</div>*/}
            </div>
            <div class="flex flex-col gap-2">

                {isOpen && (
                    <form
                        onSubmit={(e) => {
                            e.preventDefault()
                            let tex = (pattern.baseTexture?.data || "") + ""
                            let id = pattern.id + ""
                            addPat({...pattern, decal: hasDecal ? decal : undefined}, index)
                            setPattern(getEmptyPattern())
                            setIndex(-1)
                            resetRot()
                            renderIcon(id,tex)
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
                                            name: utl.formatIdentifier(
                                                e.currentTarget.value,
                                            ),
                                        })
                                    }
                                    required
                                    hoverText="Identifer of the pattern. All lower cases, no spaces or symbols!"
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
                                    hoverText="In game name of the pattern. This is how the pattern is gonna be called in game. No restrictions here."
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
                                            name: utl.formatIdentifier(
                                                e.currentTarget.value,
                                            ),
                                        });
                                    }}
                                    required
                                    hoverText="Name of the pattern. This is how the material is gonna be called in game."
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
                                    item: utl.formatIdentifier(
                                        e.currentTarget.value,
                                    ),
                                })
                            }
                            required
                            hoverText={
                                'The item used to make the pattern. For vanilla patterns, that is "coast_armor_trim", "sentry_armor_trim" etc. MUST be a real item in the game, if you dont see a preview then it probably doesn\'t exist.'
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
                                let image = utl.validateImg(
                                    e.currentTarget.files![0],
                                    64,
                                    32,
                                );
                                if (typeof image === "string") {
                                    alert(utl.getImgAlertMessage(image, 64, 32));
                                    return;
                                }
                                let name = e.currentTarget.files![0].name
                                utl.getBase64(e.currentTarget.files![0], (it) =>
                                    setPattern({
                                        ...pattern, baseTexture: {
                                            name: name,
                                            data: it as string
                                        }
                                    })
                                )
                            }}
                            fileName={pattern.baseTexture?.name}
                            required
                            hoverText="Base pattern texture. Size 64x32"
                        />
                        <ImageInput
                            title="Legging Texture:"
                            name="p-leggings-texture"
                            onChange={(e) => {
                                let image = utl.validateImg(
                                    e.currentTarget.files![0],
                                    64,
                                    32,
                                );
                                if (typeof image === "string") {
                                    alert(utl.getImgAlertMessage(image, 64, 32));
                                    return;
                                }
                                let name = e.currentTarget.files![0].name
                                utl.getBase64(e.currentTarget.files![0], (it) =>
                                    setPattern({
                                        ...pattern, leggingsTexture: {
                                            name: name,
                                            data: it as string
                                        }
                                    })
                                )
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
                                onChange={(e) => {
                                    setDecal(e)
                                }}
                                state={decal}
                                hoverText="Look this one up on the wiki, I dont know how to explain it."
                            />
                        }

                        {(pattern.baseTexture?.data != null && pattern.leggingsTexture?.data != null) && (
                            <PatternDisplay
                                mainTexture={pattern.baseTexture.data}
                                leggingsTexture={pattern.leggingsTexture.data}
                            />)}

                        <PrimaryButton
                            className="self-center px-6 mt-4 bg-opacity-90"
                            type="submit"
                        >
                            Add
                        </PrimaryButton>
                    </form>
                )}
                {patterns.map((p, idx) => (
                    <Pattern
                        onDragStart={(e) => handleDragStart(e, idx)}
                        onDragEnter={() => handleDragEnter(idx)}
                        key={p.id}
                        pattern={p}
                        remove={removePat}
                        edit={editPat}
                        isOpen={isOpen}
                        advanced={advancedState}
                    />
                ))}
            </div>
            {devMode && (
                <>
                    <CodePre>{utl.format(pattern)}</CodePre>
                    <SecondaryButton
                        className={` fixed left-3 top-44 px-3`}
                        onClick={() => {
                            let id = uuid();
                            addPat({
                                id: id,
                                name: id.slice(0, 5),
                                translation: "qPattern",
                                item: "ender_chest",
                                decal: hasDecal ? false : undefined,
                                baseTexture: {name: "base.png", data: "data"},
                                leggingsTexture: {name: "legs.png", data: "data"},
                            }, -1)
                        }}
                    >
                        qPat
                    </SecondaryButton>
                </>
            )}
        </div>
    );
}
