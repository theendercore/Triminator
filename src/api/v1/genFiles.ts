// BOTH
import {getVanillaMaterials, getVanillaPatterns} from "./consts.ts";


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

function genMaterialTag(items: string[]): MaterialTag {
    return {values: items}
}

function genMaterialJSON(name: string, lang: string, color: string, item: string, index: number): MaterialJSON {
    return {
        asset_name: name,
        description: {
            translate: lang,
            color,
        },
        ingredient: item,
        item_model_index: index
    }
}


// RESOURCE
function genLang(namespace: string, name: string[], lang: string[]): Record<string, string> {
    return name.reduce((record, name, i) => {
        const key = `trim_pattern.${namespace}.${name}`
        record[key] = lang[i];
        return record;
    }, {} as Record<string, string>);
}

function genTrimAtlas(namespace: string, patterns: string[], materials: string[]): TrimAtlasesJSON {
    return {
        sources: [{
            type: "paletted_permutations",
            textures: patterns.reduce((arr, name) => {
                arr.push(`${namespace}:trims/models/armor/${name}`)
                arr.push(`${namespace}:trims/models/armor/${name}_leggings`)
                return arr
            }, getVanillaPatterns()),
            palette_key: "trims/color_palettes/trim_palette",
            permutations: materials.reduce((record, name) => {
                record[name] = `${namespace}:trims/color_palettes/${name}`;
                return record;
            }, getVanillaMaterials())
        }]
    }
}

function getBlockAtlas(namespace: string, materials: string[]): BlocksAtlasJSON {
    return {
        sources: [{
            type: "paletted_permutations",
            textures: [
                "trims/items/leggings_trim",
                "trims/items/chestplate_trim",
                "trims/items/helmet_trim",
                "trims/items/boots_trim"
            ],
            palette_key: "trims/color_palettes/trim_palette",
            permutations: materials.reduce((record, name) => {
                record[name] = `${namespace}:trims/color_palettes/${name}`;
                return record;
            }, {} as Record<string, string>)
        }]
    }
}


function genArmorModel(material: string, part: string, name: string): ArmorModelJSON {
    let id = `minecraft:trims/items/${part}_trim_${name}`
    let isLet = material === "leather"
    return {
        parent: "minecraft:item/generated",
        textures: {
            layer0: `minecraft:item/${material}_${part}`,
            layer1: isLet ? `minecraft:item/${material}_${part}_overlay` : id,
            layer2: isLet ? id : undefined
        }
    }
}


function genVanillaModelOverride(namespace: string, namedIndexesIn: NamedIndexes[], material: string, part: string): VanillaModelOverrideJSON {
    return {
        parent: "minecraft:item/generated",
        overrides:
            namedIndexesIn.reduce((arr: ModelOverrides[], data: NamedIndexes): ModelOverrides[] =>
                    arr.concat({
                        model: `${namespace}:item/${material}_${part}_${data.name}_trim`,
                        predicate: {
                            trim_type: data.index
                        }
                    })
                , genVanillaOverrides(material, part,))
                .sort((a, b) => a.predicate.trim_type - b.predicate.trim_type),
        textures: {
            layer0: `minecraft:item/${material}_${part}`
        }
    }
}

function genVanillaOverrides(material: string, part: string,): ModelOverrides[] {
    const vanilla = [
        {index: 0.1, mat: "quartz"},
        {index: 0.2, mat: "iron"},
        {index: 0.3, mat: "netherite"},
        {index: 0.4, mat: "redstone"},
        {index: 0.5, mat: "copper"},
        {index: 0.6, mat: "gold"},
        {index: 0.7, mat: "emerald"},
        {index: 0.8, mat: "diamond"},
        {index: 0.9, mat: "lapis"},
        {index: 1.0, mat: "amethyst"},
    ]
    return vanilla.reduce((arr, data) =>
            arr.concat({
                model: `minecraft:item/${material}_${part}_${
                    (data.mat === material || data.mat === "gold") ? `${data.mat}_darker` : data.mat
                }_trim`,
                predicate: {
                    trim_type: data.index,
                },
            })
        , [] as ModelOverrides[])

}


export {
    genPackMeta,
    genPatternRecipe,
    genPatternJSON,
    genMaterialTag,
    genMaterialJSON,
    genLang,
    genTrimAtlas,
    getBlockAtlas,
    genArmorModel,
    genVanillaModelOverride
}