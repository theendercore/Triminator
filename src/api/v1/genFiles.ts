// BOTH
import {getVanillaMaterials} from "./consts.ts";

function genPackMeta(version: number, desc: string): PackMeta {
    return {pack: {pack_format: version, description: desc}};
}


// DATA
function genPatternRecipe(item: string): PatternRecipe {
    return {
        type: "minecraft:smithing_trim",
        addition: {tag: "minecraft:trim_materials",},
        base: {tag: "minecraft:trimmable_armor",},
        template: {item}
    }
}

function genPatternJSON(namespace: string, name: string, fallback: string, item: string): PatternJSON {
    return {
        asset_id: `${namespace}:${name}`,
        description: {
            translate: `trim_pattern.${namespace}.${name}`,
            fallback,
        },
        template_item: item,
    };
}


// RESOURCE
function genLang(namespace: string, name: string[], lang: string[]): Record<string, string> {
    return name.reduce((record, name, i) => {
        const key = `trim_pattern.${namespace}.${name}`
        record[key] = lang[i];
        return record;
    }, {} as Record<string, string>);
}

function genTrimAtlases(namespace: string, names: string[]): TrimAtlasesJSON {
    return {
        sources: [{
            type: "paletted_permutations",
            textures: names.reduce((arr, name) => {
                    arr.push(`${namespace}:trims/models/armor/${name}`)
                    arr.push(`${namespace}:trims/models/armor/${name}_leggings`)
                    return arr
                }
                , [] as string[]),
            palette_key: "trims/color_palettes/trim_palette",
            permutations: getVanillaMaterials()
        }]
    }
}

export {genPackMeta, genPatternRecipe, genPatternJSON, genLang, genTrimAtlases}