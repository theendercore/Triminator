import {MCVersionList} from "./consts.ts";
import {MaterialData, PatternData} from "./types";

export type MCVersion = typeof MCVersionList[number]

export type PackContextData = {
    name: string;
    namespace: string;
    description: string;
    version: MCVersion;
    icon: File | null;
    patterns: PatternData[];
    materials: MaterialData[];
};