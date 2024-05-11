import {TexturesType} from "minecraft-textures";
import {MCVersion} from "./v1/ExtraTypes";

// Generic Util
const log = (...args: unknown[]) => console.log(...args);
const sleep = (ms: number): Promise<void> =>
    new Promise((resolve) => setTimeout(resolve, ms));

// Styling Util
const format = (obj: Object) => JSON.stringify(obj, null, 2);
const formatIdentifier = (id: string) => formatName(id).toLowerCase()
const formatName = (name: string) =>
    name
        .replace(/ /gm, "_")
        .replace(/[^A-z0-9:]/gm, "")
        .replace(/\^/gm, "");

// noinspection JSSuspiciousNameCombination
const validateImg = (
    file: File,
    x: number,
    y: number = x
): void | "NoImage" | "WrongSize" => {
    if (file.type === "image/png") {
        y;
        /* let img = new Image();
        let isValid = false;
        img.src = window.URL.createObjectURL(file);
        img.onload = () => {
          isValid = img.width === x && img.height === y;
        };
        if (isValid) return;
        else return "WrongSize";
        */
        return;
    }
    return "NoImage";
};

// Special Util
// noinspection JSSuspiciousNameCombination
const getImgAlertMessage = (
    code: "NoImage" | "WrongSize",
    x: number,
    y: number = x
) => {
    switch (code) {
        case "NoImage":
            return "The file you uploaded is not a PNG!";
        case "WrongSize":
            return `The file you uploaded is not the correct size ${x}x${y}!`;
    }
};

const genIndex = () => Number(`0.714${Math.floor(Math.random() * 10000)}`)

let _cached: TexturesType;
const fetchMcData = async (): Promise<TexturesType> => {
    if (_cached === null || _cached === undefined) {
        log("Getting new Data");
        _cached = await fetch(
            "https://unpkg.com/minecraft-textures@1.20.0/dist/textures/json/1.20.json"
        ).then((e) => e.json());
    }
    return JSON.parse(JSON.stringify(_cached));
};

const getItemTexture = async (
    name: string
): Promise<"TexNotFound" | Omit<string, "TexNotFound">> => {
    let item = await fetchMcData().then((e) =>
        e.items.find((item) => item.id === name)
    );
    if (item === undefined) return "TexNotFound";
    return item.texture;
};

const resolveDataPackVersion = (version: MCVersion) => {
    switch (version) {
        case "1.20":
            return 15;
        case "1.20.1":
            return 15;
        case "1.20.2":
            return 18;
        case "1.20.4":
            return 26;
        case "1.20.6":
            return 32;
        default:
            throw Error("Unhandled version!")
    }
};

const resolveResourcePackVersion = (version: MCVersion) => {
    switch (version) {
        case "1.20":
            return 15;
        case "1.20.1":
            return 15;
        case "1.20.2":
            return 18;
        case "1.20.4":
            return 22;
        case "1.20.6":
            return 41;
        default:
            throw Error("Unhandled version!")
    }
};

const getDoof = () => fetch("./img/dr_doof.png").then(e => e.blob())

const genDescription = (desc: string, type: string) =>
    desc.trim() !== "" ? `${desc}\nBy Triminator` : `${type} generated\nby Triminator`

export function downloadBlob(blob: Blob, name: string) {
    const aTag = window.document.createElement('a');
    let link = URL.createObjectURL(blob);
    aTag.href = link
    aTag.download = name;
    aTag.click();
    URL.revokeObjectURL(link)
}

export function getBase64(file: Blob, callback: (it: string | ArrayBuffer | null) => void) {
    let reader = new FileReader();
    reader.onload = function () {
        callback(reader.result)
    };
    reader.onerror = function (error) {
        console.error('Error: ', error);
    };
    reader.readAsDataURL(file as Blob);
}

export function setDragImageEmpty(e:DragEvent){
    let img = document.createElement("img");
    img.src = "https://raw.githubusercontent.com/theendercore/Triminator/dev/public/empty.png";
    e.dataTransfer?.setDragImage(img, 0, 0)
}

export {
    log,
    sleep,
    format,
    formatName,
    formatIdentifier,
    validateImg,
    getImgAlertMessage,
    genIndex,
    fetchMcData,
    getItemTexture,
    resolveDataPackVersion,
    resolveResourcePackVersion,
    getDoof,
    genDescription
};
