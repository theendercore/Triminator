import {StateUpdater} from "preact/hooks";
import {formatIdentifier, getBase64, getImgAlertMessage, validateImg} from "../../../api/Util.ts";
import TextInput from "../../generic/input/TextInput.tsx";
import ImageInput from "../../generic/input/ImageInput.tsx";
import {TargetedEvent} from "preact/compat";
import {PackContextData} from "../../../api/v1/ExtraTypes";
import {Dispatch} from "preact/hooks";

type GenHeaderProps = {
    className?: string;
    packData: PackContextData;
    setPackData: Dispatch<StateUpdater<PackContextData>>;
    onSubmit: (e: TargetedEvent<HTMLFormElement, Event>) => void;
    advancedState: boolean;
};

export default function GenHeader({className, packData, setPackData, onSubmit, advancedState}: GenHeaderProps) {
    return (
        <form
            id="header"
            className={`flex flex-col bg-background px-12 py-6 gap-3 rounded-3xl ${className}`}
            onSubmit={onSubmit}
        >
            <TextInput
                name="name"
                title="Name:"
                placeholder="Pack name..."
                onChange={(e) => {
                    setPackData({
                        ...packData,
                        name: e.currentTarget.value,
                        namespace: advancedState ? packData.namespace : formatIdentifier(e.currentTarget.value),
                    });
                }}
                value={packData.name}
                required
                hoverText="Name of the pack."
            />


            {advancedState &&
                <TextInput
                    name="namespace"
                    title="Namespace:"
                    placeholder="minecraft..."
                    onChange={(e) =>
                        setPackData({
                            ...packData,
                            namespace: formatIdentifier(e.currentTarget.value),
                        })
                    }
                    value={packData.namespace}
                    required
                    hoverText="Namespace of the packs. Eg. (minecraft, quark, wafflesarebetter)"
                />
            }


            <TextInput
                name="description"
                title="Description:"
                placeholder="Generated by trim..."
                onChange={(e) =>
                    setPackData({
                        ...packData,
                        description: e.currentTarget.value,
                    })
                }
                value={packData.description}
                hoverText="The Description of the packs. Can be left empty."
            />
            <ImageInput
                name="icon"
                title="Pack Icon:"
                onChange={(e) => {
                    let image = validateImg(e.currentTarget.files![0], 64);
                    if (typeof image === "string") return alert(getImgAlertMessage(image, 8, 1));

                    setPackData({...packData, icon: {name: e.currentTarget.files![0].name, data: packData.icon?.data,}})
                    getBase64(e.currentTarget.files![0], (it) =>
                        setPackData({...packData, icon: {...packData.icon, data: it as string}})
                    )
                }}
                fileName={packData.icon?.name}
                hoverText="The Icon of the packs. If left empty you will get Dr Doof."
            />

        </form>
    );
}
