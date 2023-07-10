import { TexturesType } from "minecraft-textures";

const format = (obj: Object) => JSON.stringify(obj, null, 2);
const log = (...args: string[]) => console.log(...args);
const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

let _cached: TexturesType;
async function fetchMcData(): Promise<TexturesType> {
  if (_cached === null || _cached === undefined)
    _cached = await fetch(
      "https://unpkg.com/minecraft-textures@1.20.0/dist/textures/json/1.20.json"
    ).then((e) => e.json());
  return JSON.parse(JSON.stringify(_cached));
}

export { format, log, sleep, fetchMcData };
