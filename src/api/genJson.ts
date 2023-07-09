function genTrimJson(
  namespace: string,
  name: string,
  fallback: string,
  item: string
): TrimJson {
  return {
    asset_id: `${namespace}:${name}`,
    description: {
      translate: `trim_pattern.${namespace}.${name}`,
      fallback: fallback,
    },
    template_item: item,
  };
}

function genArmorTrimJson(item: string): ArmorTrimJson {
  return {
    type: "minecraft:smithing_trim",
    addition: {
      tag: "minecraft:trim_materials",
    },
    base: {
      tag: "minecraft:trimmable_armor",
    },
    template: {
      item: item,
    },
  };
}

function genPackMeta(version: number, desc: string): PackMeta {
  return { pack: { pack_format: version, description: desc } };
}

function genLang(namespace: string, name: string[], lang: string[]) {
  let x: any = {};
  name.map((e, i) => {
    let y = `trim_pattern.${namespace}.${e}`;
    x[y] = lang[i];
  });
  return x;
}

function genArmorTrimsJson(namespace: string, names: string[]): ArmorTrimsJson {
  let x: ArmorTrimsJson = {
    sources: [
      {
        type: "paletted_permutations",
        textures: [],
        palette_key: "trims/color_palettes/trim_palette",
        permutations: {
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
        },
      },
    ],
  };
  names.forEach((e) => {
    x.sources[0].textures.push(`${namespace}:trims/models/armor/${e}`);
    x.sources[0].textures.push(`${namespace}:trims/models/armor/${e}_leggings`);
  });
  return x;
}
export { genTrimJson, genArmorTrimJson, genPackMeta, genLang, genArmorTrimsJson };
