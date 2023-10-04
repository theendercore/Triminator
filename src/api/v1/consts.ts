import {MaterialData, PackContextData, PatternData} from "./types";

const getEmptyPack = (): PackContextData =>
    JSON.parse(JSON.stringify({
        version: "1.20",
        name: "",
        namespace: "",
        description: "",
        icon: null,
        patterns: [],
        materials: []
    }));

const getEmptyPattern = (): PatternData =>
    JSON.parse(JSON.stringify({
        id: "",
        name: "",
        translation: "",
        item: "",
    }));

const getEmptyMaterial = (): MaterialData =>
    JSON.parse(JSON.stringify({
        id: "",
        name: "",
        translation: "",
        color: "",
        item: "",
        index: 0
    }));

const getVanillaMaterials = (): Record<string, string> =>
    JSON.parse(JSON.stringify({
        quartz: "trims/color_palettes/quartz",
        iron: "trims/color_palettes/iron",
        gold: "trims/color_palettes/gold",
        diamond: "trims/color_palettes/diamond",
        netherite: "trims/color_palettes/netherite",
        redstone: "trims/color_palettes/redstone",
        copper: "trims/color_palettes/copper",
        emerald: "trims/color_palettes/emerald",
        lapis: "trims/color_palettes/lapis",
        amethyst: "trims/color_palettes/amethyst",
        iron_darker: "trims/color_palettes/iron_darker",
        gold_darker: "trims/color_palettes/gold_darker",
        diamond_darker: "trims/color_palettes/diamond_darker",
        netherite_darker: "trims/color_palettes/netherite_darker",
    }));

const getVanillaPatterns = (): string[] =>
    JSON.parse(JSON.stringify([
        "trims/models/armor/coast",
        "trims/models/armor/coast_leggings",
        "trims/models/armor/sentry",
        "trims/models/armor/sentry_leggings",
        "trims/models/armor/dune",
        "trims/models/armor/dune_leggings",
        "trims/models/armor/wild",
        "trims/models/armor/wild_leggings",
        "trims/models/armor/ward",
        "trims/models/armor/ward_leggings",
        "trims/models/armor/eye",
        "trims/models/armor/eye_leggings",
        "trims/models/armor/vex",
        "trims/models/armor/vex_leggings",
        "trims/models/armor/tide",
        "trims/models/armor/tide_leggings",
        "trims/models/armor/snout",
        "trims/models/armor/snout_leggings",
        "trims/models/armor/rib",
        "trims/models/armor/rib_leggings",
        "trims/models/armor/spire",
        "trims/models/armor/spire_leggings",
        "trims/models/armor/wayfinder",
        "trims/models/armor/wayfinder_leggings",
        "trims/models/armor/shaper",
        "trims/models/armor/shaper_leggings",
        "trims/models/armor/silence",
        "trims/models/armor/silence_leggings",
        "trims/models/armor/raiser",
        "trims/models/armor/raiser_leggings",
        "trims/models/armor/host",
        "trims/models/armor/host_leggings"
    ]))

const MCVersionList = ["1.20", "1.20.1", "1.20.2"] as const


export {
    getEmptyPack,
    getEmptyPattern,
    getEmptyMaterial,
    getVanillaMaterials,
    getVanillaPatterns,
    MCVersionList
};
