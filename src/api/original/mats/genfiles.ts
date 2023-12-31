import {BlobReader, BlobWriter, TextReader, ZipWriter} from "@zip.js/zip.js";
import {format} from "../../Util.ts";
import {genPackMeta} from "../genJson.ts";
import {genLang} from "../../v1/genFiles.ts";
import {ArmorMaterials, ArmorMaterialsPartless, ArmorParts} from "./ArmorFiles.ts";


export async function genTrimDatapack(data: MatData) {
    const zipWriter = new ZipWriter(new BlobWriter());
    await Promise.all([
        zipWriter.add(
            `pack.png`,
            new BlobReader(await fetch("/img/dr_doof.png").then(e => e.blob()))
        ),
        zipWriter.add(
            "pack.mcmeta",
            new TextReader(
                format(genPackMeta(15, "Datapack generated By Triminator"))
            )),
        zipWriter.add(
            "data/minecraft/tags/items/trim_materials.json",
            new TextReader(format(genTrimMaterialsJSON([data.item])))
        ),  
        zipWriter.add(
            `data/${data.namespace}/trim_material/${data.name}.json`,
            new TextReader(
                format(genMaterialJSON(data.name, data.translation, data.color, data.item, data.index))
            )
        ),

    ])

    return URL.createObjectURL(await zipWriter.close());
}

export async function genTrimResourcePack(data: MatData) {
    const zipWriter = new ZipWriter(new BlobWriter());
    await Promise.all([

        zipWriter.add(
            `pack.png`,
            new BlobReader(await fetch("/img/dr_doof.png").then(e => e.blob()))
        ),
        zipWriter.add(
            "pack.mcmeta",
            new TextReader(format(genPackMeta(15, "Resource pack generated By Triminator")))
        ),
        zipWriter.add(
            `assets/${data.namespace}/lang/en_us.json`,
            new TextReader(format(
                genLang(data.namespace, [data.name], [data.translation])
            ))
        ),




        zipWriter.add(
            `assets/${data.namespace}/textures/trims/color_palettes/${data.name}.png`,
            new BlobReader(data.palletTexture!)
        ),

        zipWriter.add(
            `assets/${data.namespace}/models/items/${ArmorMaterialsPartless[0]}_${data.name}_trim.json`,
            new TextReader(format(genATMq(ArmorMaterialsPartless[0], data.name)))
        ),

        zipWriter.add(
            "assets/minecraft/atlases/armor_trims.json",
            new TextReader(format(genTrimAtlases(data.namespace, [data.name])))
        ),

        zipWriter.add(
            "assets/minecraft/atlases/blocks.json",
            new TextReader(format(getBlockAtlases([data.name])))
        ),
    ])

    for (let mat in ArmorMaterials) {
        for (let part in ArmorParts) {
            await zipWriter.add(
                `assets/${data.namespace}/models/items/${ArmorMaterials[mat]}_${ArmorParts[part]}_${data.name}_trim.json`,
                new TextReader(format(
                    genArmorTypeModel(ArmorMaterials[mat], ArmorParts[part], data.name)
                ))
            )

            await zipWriter.add(
                `assets/minecraft/models/items/${ArmorMaterials[mat]}_${ArmorParts[part]}.json`,
                new TextReader(format(
                    genArmorModelOverride(data.namespace, data.name, ArmorMaterials[mat], ArmorParts[part], data.index)
                ))
            )
        }
    }

    return URL.createObjectURL(await zipWriter.close());
}

function genTrimMaterialsJSON(items: string[]): TrimMaterialsTag {
    return {values: items}
}

function genMaterialJSON(name: string, lang: string, color: string, item: string, index: number): MaterialJson {
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

function genArmorTypeModel(material: string, part: string, name: string): ArmorTypeModelJson {
    return {
        parent: "minecraft:item/generated",
        textures: {
            layer0: `minecraft:item/${material}_${part}`,
            layer1: `minecraft:trims/items/${part}_trim_${name}`
        }

    }
}

function genATMq(matPart: string, name: string) {
    let mat_part = matPart.split("_")
    return genArmorTypeModel(mat_part[0], mat_part[1], name)
}

function genTrimAtlases(namespace: string, names: string[]): TrimAtlasesJSON {
    return {
        sources: [{
            type: "paletted_permutations",
            textures: getVanillaPatterns(),
            palette_key: "trims/color_palettes/trim_palette",
            permutations:
                names.reduce((record, name) => {
                    record[name] = `${namespace}:trims/color_palettes/${name}`;
                    return record;
                }, {} as Record<string, string>)

        }]
    }
}

function getBlockAtlases(names: string[]): BlocksAtlas {
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
            permutations: names.reduce((record, name) => {
                record[name] = `trims/color_palettes/${name}`;
                return record;
            }, {} as Record<string, string>)
        }]
    }
}

function genArmorModelOverride(namespace: string, name: string, material: string, part: string, index: number): ArmorModelOverrideJson {
    return {
        parent: "minecraft:item/generated",
        overrides: genVanillaPatternOverrides(material, part).concat({
            model: `${namespace}:item/${material}_${part}_${name}_trim`,
            predicate: {
                trim_type: index
            }
        }),
        textures: {
            layer0: `minecraft:item/${material}_${part}`
        }
    }
}

function getVanillaPatterns(): string[] {
    return [
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
    ]
}

function genVanillaPatternOverrides(material: string, part: string): ModelOverrides[] {
    return [
        {
            model: `minecraft:item/${material}_${part}_quartz_trim`,
            predicate: {
                trim_type: 0.1,
            },
        },
        {
            model: `minecraft:item/${material}_${part}_iron_trim`,
            predicate: {
                trim_type: 0.2,
            },
        },
        {
            model: `minecraft:item/${material}_${part}_netherite_trim`,
            predicate: {
                trim_type: 0.3,
            },
        },
        {
            model: `minecraft:item/${material}_${part}_redstone_trim`,
            predicate: {
                trim_type: 0.4,
            },
        },
        {
            model: `minecraft:item/${material}_${part}_copper_trim`,
            predicate: {
                trim_type: 0.5,
            },
        },
        {
            model: `minecraft:item/${material}_${part}_gold_trim`,
            predicate: {
                trim_type: 0.6,
            },
        },
        {
            model: `minecraft:item/${material}_${part}_emerald_trim`,
            predicate: {
                trim_type: 0.7,
            },
        },
        {
            model: `minecraft:item/${material}_${part}_diamond_trim`,
            predicate: {
                trim_type: 0.8,
            },
        },
        {
            model: `minecraft:item/${material}_${part}_lapis_trim`,
            predicate: {
                trim_type: 0.9,
            },
        },
        {
            model: `minecraft:item/${material}_${part}_amethyst_trim`,
            predicate: {
                trim_type: 1.0,
            },
        },
    ];
}