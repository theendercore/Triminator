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

function getPackMeta(version: number, desc: string): PackMeta {
  return { pack: { pack_format: version, description: desc } };
}

export { genTrimJson, genArmorTrimJson, getPackMeta };
