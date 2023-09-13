import {StateUpdater} from "preact/hooks";
import {formatIdentifier, getImgAlertMessage, validateImg} from "../../../api/Util.ts";
import TextInput from "../../generic/input/TextInput.tsx";
import ImageInput from "../../generic/input/ImageInput.tsx";
import {TargetedEvent} from "preact/compat";
import StyledSwitch from "../../generic/Switch.tsx";

type GenHeaderProps = {
    className?: string;
    packData: PackContextData;
    setPackData: StateUpdater<PackContextData>;
    onSubmit: (e: TargetedEvent<HTMLFormElement, Event>) => void;
    advancedState: boolean;
    setAdvancedState: StateUpdater<boolean>;
};

export default function GenHeader({className, packData, setPackData, onSubmit, advancedState, setAdvancedState}: GenHeaderProps) {
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
                onChange={(e) =>
                    setPackData({...packData, name: e.currentTarget.value})
                }
                value={packData.name}
                required
                hoverText="Name of the pack. (Aesthetic only)"
            />
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
            <TextInput
                name="description"
                title="Description:"
                placeholder="Generated by trim..."
                onChange={(e) =>
                    setPackData({...packData, description: e.currentTarget.value})
                }
                value={packData.description}
                hoverText="The Description of the packs. If left empty will auto generate one." />
            <ImageInput
                name="icon"
                title="Pack Icon:"
                onChange={(e) => {
                    let image = validateImg(e.currentTarget.files![0], 64);
                    if (typeof image === "string") {
                        alert(getImgAlertMessage(image, 64));
                        return;
                    }
                    setPackData({...packData, icon: e.currentTarget.files![0]});
                }}
                fileName={packData.icon?.name}
                hoverText="The Icon of the packs. If left empty you will get Dr Doof."
            />
            <StyledSwitch
                title={"Advnaced Mode:"}
                state={advancedState}
                onChange={setAdvancedState}
                hoverText="Advnaced editing mode for people who know more about datapacks and want finer controles."
            />
        </form>

    );
}
