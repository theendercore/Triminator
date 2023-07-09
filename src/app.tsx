import { useRef, useState } from "preact/hooks";
import { genTrimDatapack, genTrimResourcepack } from "./api/genZip";
import TextInput from "./components/TextInput";
import { sleep } from "./api/Util";
import ImageInput from "./components/ImageInput";

const nullObj = {
  namespace: "",
  name: "",
  lang: "",
  item: "",
  baseTexture: null,
  legsTexture: null,
};

export default function App() {
  const [val, setVal] = useState<PackValues>(nullObj);
  const [url, setUrl] = useState("");
  const [url2, setUrl2] = useState("");
  const [selection, setSelection] = useState<"DP" | "RP">("DP");

  const clickThing = useRef(null);
  const clickThing2 = useRef(null);

  return (
    <div className="flex flex-col items-center justify-center gap-2 p-20">
      <h1 className="text-3xl">Triminator</h1>
      <form
        className="flex flex-col items-center gap-2"
        onSubmit={(e) => {
          e.preventDefault();

          if (selection === "RP") {
            if (val.baseTexture === null || val.legsTexture === null) return;
            // alert("how did you not add a texture?");

            genTrimResourcepack(val).then(async (url) => {
              setUrl2(url);
              await sleep(100);
              // @ts-ignore
              clickThing2.current.click();
              setVal(nullObj);
            });
          }

          if (selection === "DP") {
            genTrimDatapack(val).then(async (url) => {
              setUrl(url);
              await sleep(100);
              // @ts-ignore
              clickThing.current.click();
              setVal(nullObj);
            });
          }
        }}
      >
        <TextInput
          title="Namespace"
          name="namespace"
          onChange={(e) =>
            setVal({
              ...val,
              namespace: e.currentTarget.value
                .toLocaleLowerCase()
                .replace(" ", "_"),
            })
          }
          val={val.namespace}
        />

        <TextInput
          title="Trim Name"
          name="name"
          onChange={(e) =>
            setVal({
              ...val,
              name: e.currentTarget.value.toLocaleLowerCase().replace(" ", "_"),
            })
          }
          val={val.name}
        />

        <TextInput
          title="Translation"
          name="lang"
          onChange={(e) => setVal({ ...val, lang: e.currentTarget.value })}
          val={val.lang}
        />

        <TextInput
          title="Item"
          name="item"
          onChange={(e) =>
            setVal({
              ...val,
              item: e.currentTarget.value.toLocaleLowerCase().replace(" ", "_"),
            })
          }
          val={val.item}
        />

        <ImageInput
          title="Base texture"
          name="base-texture"
          onChange={(e) =>
            setVal({ ...val, baseTexture: e.currentTarget.files![0] })
          }
        />
        <ImageInput
          title="Leggings texture"
          name="legs-texture"
          onChange={(e) =>
            setVal({ ...val, legsTexture: e.currentTarget.files![0] })
          }
        />
        <div class="flex gap-2">
          <button
            className="p-2 py-1 bg-gray-800 rounded-lg"
            type="submit"
            onClick={() => setSelection("DP")}
          >
            Get DataPack
          </button>

          <button
            className="p-2 py-1 bg-gray-800 rounded-lg"
            type="submit"
            onClick={() => setSelection("RP")}
          >
            Get Resource Pack
          </button>
        </div>
      </form>
      <a
        className="none"
        ref={clickThing}
        href={url}
        download={`${val.name}_trim_datapack.zip`}
      />
      <a
        className="none"
        ref={clickThing2}
        href={url2}
        download={`${val.name}_trim_resourcepack.zip`}
      />
    </div>
  );
}
