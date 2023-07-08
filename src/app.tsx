import { useRef, useState } from "preact/hooks";
import { getTrimDatapack } from "./api/genZip";
import { sleep } from "./api/log";

export default function App() {
  const [val, setVal] = useState<DataPackValues>({
    namespace: "",
    name: "",
    lang: "",
    item: "",
  });
  const [url, setUrl] = useState("");

  const clickThing = useRef(null);

  return (
    <div className="flex flex-col items-center justify-center gap-2 p-20">
      <h1 className="font-mono text-3xl">Triminator</h1>
      <form
        className="flex flex-col gap-2"
        onSubmit={(e) => {
          e.preventDefault();
          getTrimDatapack(val).then(async (url) => {
            setUrl(url);
            await sleep(100)
            // @ts-ignore
            if (clickThing.current !== null) clickThing.current.click();
          });
        }}
      >
        <label>
          Namespace: <br />
          <input
            type="text"
            name="namespace"
            id="namespace"
            onInput={(e) =>
              setVal({ ...val, namespace: e.currentTarget.value })
            }
            value={val.namespace}
          />
        </label>

        <label>
          Trim Name: <br />
          <input
            type="text"
            name="name"
            id="name"
            onInput={(e) => setVal({ ...val, name: e.currentTarget.value })}
            value={val.name}
          />
        </label>

        <label>
          Translation: <br />
          <input
            type="text"
            name="lang"
            id="lang"
            onInput={(e) => setVal({ ...val, lang: e.currentTarget.value })}
            value={val.lang}
          />
        </label>

        <label>
          Item: <br />
          <input
            type="text"
            name="item"
            id="item"
            onInput={(e) => setVal({ ...val, item: e.currentTarget.value })}
            value={val.item}
          />
        </label>

        <button className="p-2 py-1 bg-gray-800 rounded-lg" type="submit">
          Generate DP
        </button>
      </form>
      <a
        className="none"
        ref={clickThing}
        href={url}
        download={`${val.name}_trim_datapack.zip`}
      />
    </div>
  );
}
