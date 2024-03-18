import {devMode} from "../../api/dev.ts";
import {useRef, useState} from "preact/hooks";
import RoundButton from "../../components/generic/btn/RoundButton.tsx";
import {format, formatIdentifier, sleep} from "../../api/Util.ts";
import TextInput from "../../components/TextInputOld.tsx";
import ItemRender from "../../components/generic/ItemRender.tsx";
import CodePre from "../../components/generic/CodePre.tsx";
import {genTrimDatapack, genTrimResourcePack} from "../../api/original/mats/genfiles.ts";
import ImageInput from "../../components/generic/input/ImageInput.tsx";

export default function MaterialPrototype({}: { path: string }) {

    const [data, setData] = useState<MatData>({
        color: "",
        item: "",
        name: "",
        namespace: "",
        translation: "",
        palletTexture: null,
        index: Math.floor(Math.random() * 100000)
    });
    const [url, setUrl] = useState("");
    const [url2, setUrl2] = useState("");


    const clickThing = useRef(null);
    const clickThing2 = useRef(null);


    return (
        <div>
            {devMode && <RoundButton onClick={() => setData({
                color: "#FFFFFF",
                item: "stick",
                name: "terry",
                namespace: "terry_ns",
                translation: "Terry Material",
                palletTexture: new File([], "test.png"),
                index: Math.floor(Math.random() * 100000)
            })} className="bg-slate-700">Quick Gen Button</RoundButton>}
            <form
                className="flex flex-col items-center gap-2"
                onSubmit={async (e) => {
                    e.preventDefault();

                    // genTrimDatapack(data).
                    genTrimResourcePack(data).then((url) => {
                        setUrl(url);
                        sleep(1000).then((_) => {
                                // @ts-ignore
                                clickThing.current?.click()
                            }
                        )
                    })
                    genTrimDatapack(data).then((url2) => {
                        setUrl2(url2);
                        sleep(1000).then((_) => {
                                // @ts-ignore
                                clickThing2.current?.click()
                            }
                        )
                    })

                }}>
                <h3 class="text-3xl">Material Gen</h3>

                <TextInput
                    title="Name"
                    name="name"
                    onChange={(e) => setData({...data, name: formatIdentifier(e.currentTarget.value)})}
                    val={data.name}
                />

                <TextInput
                    title="Namespace"
                    name="namespace"
                    onChange={(e) => setData({...data, namespace: formatIdentifier(e.currentTarget.value)})}
                    val={data.namespace}
                />

                <TextInput
                    title="Translation"
                    name="lang"
                    onChange={(e) => setData({...data, translation: e.currentTarget.value})}
                    val={data.translation}
                />

                <label>
                    Color:
                    <input type="color" name="color" id="color" required
                           onInput={(e) => setData({...data, color: e.currentTarget.value})}
                    />
                </label>

                <TextInput
                    title="Item"
                    name="item"
                    onChange={(e) => setData({...data, item: formatIdentifier(e.currentTarget.value)})}
                    val={data.item}
                />
                <ItemRender item={"minecraft:" + data.item} noAlt/>


                <ImageInput title="Pallet" name="pallet" required fileName={data.palletTexture?.name}
                            onChange={(e) => setData({...data, palletTexture: e.currentTarget.files![0]})}/>


                <RoundButton className="p-2 py-1 bg-gray-800 rounded-lg" type="submit">Gen</RoundButton>
            </form>
            <a href={url} ref={clickThing} download={`${data.name}ResourcePack.zip`}/>
            <a href={url2} ref={clickThing2} download={`${data.name}DataPack.zip`}/>
            {devMode && <CodePre>{format(data)}</CodePre>}
        </div>)
}