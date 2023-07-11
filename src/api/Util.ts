import { TexturesType } from "minecraft-textures";

// Generic Util
const log = (...args: unknown[]) => console.log(...args);
const sleep = (ms: number): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, ms));

// Styling Util
const format = (obj: Object) => JSON.stringify(obj, null, 2);
const formatIdentifier = (id: string) =>
  id
    .toLowerCase()
    .replace(" ", "_")
    .replace(/[^A-z0-9:_]/, "")
    .replace("^", "");
const validateImg = (
  file: File,
  x: number,
  y: number = x
): void | "NoImage" | "WrongSize" => {
  if (file.type === "image/png") {
    let img = new Image();
    let isValid = false;
    img.src = window.URL.createObjectURL(file);
    img.onload = () => {
      isValid = img.width === x && img.height === y;
    };
    if (isValid) return;
    return "WrongSize";
  }
  return "NoImage";
};

// Special Util
const getImgAlertMessage = (
  code: "NoImage" | "WrongSize",
  x?: number,
  y: number | undefined = x
) => {
  switch (code) {
    case "NoImage":
      return "The file you uploaded is not a PNG!";
    case "WrongSize":
      return `The file you uploaded is not the correct size ${x}x${y}!`;
  }
};

let _cached: TexturesType;
const fetchMcData = async (): Promise<TexturesType> => {
  if (_cached === null || _cached === undefined)
    _cached = await fetch(
      "https://unpkg.com/minecraft-textures@1.20.0/dist/textures/json/1.20.json"
    ).then((e) => e.json());
  return JSON.parse(JSON.stringify(_cached));
};

export {
  log,
  sleep,
  format,
  formatIdentifier,
  validateImg,
  getImgAlertMessage,
  fetchMcData,
};
