const emptyPackData: PackContextData = {
    version: "1.20",
    name: "",
    namespace: "",
    description: "",
    icon: null,
    patterns: [],
    materials: []
};

const emptyPatternData: PatternData = {
    id: "",
    name: "",
    translation: "",
    item: "",
};
const vanillaMaterials: Record<string, string> = {
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
}

const getEmptyPack = (): PackContextData =>
    JSON.parse(JSON.stringify(emptyPackData));

const getEmptyPattern = (): PatternData =>
    JSON.parse(JSON.stringify(emptyPatternData));

const getVanillaMaterials = (): Record<string, string> =>
    JSON.parse(JSON.stringify(vanillaMaterials));

export {getEmptyPack, getEmptyPattern, getVanillaMaterials};
