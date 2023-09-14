import {TexturesType} from "minecraft-textures";

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
        log("new get data");
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
    }
};

const resolveResourcePackVersion = (version: MCVersion) => {
    switch (version) {
        case "1.20":
            return 15;
    }
};

const getDoof = () => fetch("./img/dr_doof.png").then(e => e.blob())

const genDescription = (desc: string, type: string) =>
    desc.trim() !== "" ? `${desc}\nBy Triminator` : `${type} generated\nby Triminator`

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
