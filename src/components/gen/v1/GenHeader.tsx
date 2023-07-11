import { StateUpdater } from "preact/hooks";
import {
  formatIdentifier,
  getImgAlertMessage,
  validateImg,
} from "../../../api/Util";
import TextInput from "../../generic/TextInput";
import ImageInput from "../../generic/ImageInput";

type GenHeaderProps = {
  packData: PackContextData;
  setPackData: StateUpdater<PackContextData>;
};

export default function GenHeader({ packData, setPackData }: GenHeaderProps) {
  return (
    <form
      class="flex flex-col bg-slate-800 p-4 rounded-lg m-4"
      onSubmit={(e) => e.preventDefault()}
    >
      icon?: File;
      <TextInput
        name="name"
        title="Name:"
        placeholder="Name please..."
        onChange={(e) =>
          setPackData({ ...packData, name: e.currentTarget.value })
        }
        value={packData.name}
        required
      />
      <TextInput
        name="namespace"
        title="Namespace :"
        placeholder="minecraft..."
        onChange={(e) =>
          setPackData({
            ...packData,
            namespace: formatIdentifier(e.currentTarget.value),
          })
        }
        value={packData.namespace}
        required
      />
      <TextInput
        name="description"
        title="Description:"
        placeholder="Long long time ago..."
        onChange={(e) =>
          setPackData({ ...packData, description: e.currentTarget.value })
        }
        value={packData.description}
        required
      />
      <ImageInput
        name="icon"
        title="Pack Icon:"
        onChange={(e) => {
          let image = validateImg(e.currentTarget.files![0], 64, 32);
          if (typeof image === "string") {
            alert(getImgAlertMessage(image, 64, 32));
            return;
          }
          setPackData({ ...packData, icon: e.currentTarget.files![0] });
        }}
        fileName={packData.icon?.name}
        required
      />
    </form>
  );
}
