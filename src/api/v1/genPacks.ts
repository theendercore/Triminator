import {BlobReader, BlobWriter, TextReader, ZipWriter} from "@zip.js/zip.js";
import {format, genDescription, getDoof, resolveDataPackVersion} from "../Util";
import {
    genArmorModel,
    genLang,
    genMaterialJSON,
    genMaterialTag,
    genPackMeta,
    genPatternJSON,
    genPatternRecipe,
    genTrimAtlas, genVanillaModelOverride, getBlockAtlas
} from "./genFiles";
import * as Armor from "./ArmorTypes.ts"

async function genDatapack(packData: PackContextData) {
    const zipWriter = new ZipWriter(new BlobWriter());

    await Promise.all([
        zipWriter.add(`pack.mcmeta`,
            new TextReader(format(genPackMeta(
                resolveDataPackVersion(packData.version),
                genDescription(packData.description, "Datapack")
            )))
        ),
        zipWriter.add(`pack.png`,
            new BlobReader(packData.icon || await getDoof())
        ),
        zipWriter.add(`data/minecraft/tags/items/trim_materials.json`,
            new TextReader(format(genMaterialTag(packData.materials.map(m => m.item))))
        )
    ]);

    for (const pat of packData.patterns) {
        await zipWriter.add(`data/${packData.namespace}/recipes/${pat.name}_armor_trim.json`,
            new TextReader(format(genPatternRecipe(pat.item)))
        )

        await zipWriter.add(`data/${packData.namespace}/trim_pattern/${pat.name}.json`,
            new TextReader(format(genPatternJSON(packData.namespace, pat.name, pat.translation, pat.item)))
        )
    }

    for (const mat of packData.materials) {
        await zipWriter.add(`data/${packData.namespace}/trim_material/${mat.name}.json`,
            new TextReader(format(genMaterialJSON(mat.name, mat.translation, mat.color, mat.item, mat.index)))
        )
    }

    return URL.createObjectURL(await zipWriter.close());
}


async function genResourcePack(packData: PackContextData) {
    const zipWriter = new ZipWriter(new BlobWriter());

    await Promise.all([

        zipWriter.add(`pack.mcmeta`,
            new TextReader(format(genPackMeta(
                resolveDataPackVersion(packData.version),
                genDescription(packData.description, "Resource Pack")
            )))
        ),

        zipWriter.add(`pack.png`,
            new BlobReader(packData.icon || await getDoof())
        ),

        zipWriter.add(`assets/${packData.namespace}/lang/en_us.json`,
            new TextReader(format(
                genLang(packData.namespace,
                    packData.patterns.map(({name}) => name)
                        .concat(packData.materials.map(({name}) => name)),
                    packData.patterns.map(({translation}) => translation)
                        .concat(packData.materials.map(({translation}) => translation)))
            ))
        ),

        zipWriter.add(`assets/minecraft/atlases/armor_trims.json`,
            new TextReader(format(genTrimAtlas(packData.namespace,
                packData.patterns.map(({name}) => name),
                packData.materials.map(({name}) => name))
            ))
        ),

        zipWriter.add("assets/minecraft/atlases/blocks.json",
            new TextReader(format(getBlockAtlas(packData.materials.map(({name}) => name))))
        ),

    ]);

    for (const pat of packData.patterns) {
        await zipWriter.add(`assets/${packData.namespace}/textures/trims/models/armor/${pat.name}.png`,
            new BlobReader(pat.baseTexture!)
        )

        await zipWriter.add(`assets/${packData.namespace}/textures/trims/models/armor/${pat.name}_leggings.png`,
            new BlobReader(pat.leggingsTexture!)
        )
    }

    for (const mat of packData.materials) {
        await zipWriter.add(`assets/${packData.namespace}/textures/trims/color_palettes/${mat.name}.png`,
            new BlobReader(mat.palletTexture!)
        )

        for (const matPart of Armor.materialsWithParts) {
            let [material, part] = matPart.split("_")

            await zipWriter.add(`assets/${packData.namespace}/models/items/${matPart}_${mat.name}_trim.json`,
                new TextReader(format(genArmorModel(material, part, mat.name)))
            )
            await zipWriter.add(`assets/minecraft/models/items/${material}_${part}.json`,
                new TextReader(format(genVanillaModelOverride(packData.namespace, [mat.name], material, part, [mat.index])))
            )
        }

        Armor.materials.forEach(material => {
            Armor.parts.forEach(async part => {
                await zipWriter.add(`assets/${packData.namespace}/models/items/${material}_${part}_${mat.name}_trim.json`,
                    new TextReader(format(genArmorModel(material, part, mat.name)))
                )


            })
        })
    }

    Armor.materials.forEach(material => {
        Armor.parts.forEach(async part => {
            await zipWriter.add(`assets/minecraft/models/items/${material}_${part}.json`,
                new TextReader(format(
                    genVanillaModelOverride(packData.namespace, packData.materials.map(({name}) => name), material, part, packData.materials.map(({index}) => index))
                ))
            )
        })
    })

    return URL.createObjectURL(await zipWriter.close());
}


export {genDatapack, genResourcePack}

