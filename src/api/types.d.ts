type ArmorTrimJson = {
  type: string;
  addition: { tag: string };
  base: { tag: string };
  template: { item: string };
};

type TrimJson = {
  asset_id: string;
  description: {
    translate: string;
    fallback: string;
  };
  template_item: string;
};

type PackMeta = {
  pack: {
    pack_format: number;
    description: string;
  };
};

type PackValues = {
  namespace: string;
  name: string;
  lang: string;
  item: string;
  baseTexture: File | null;
  legsTexture: File | null;
};


type ArmorTrimsJson = {
  sources: {
    type: string;
    textures: string[];
    palette_key: string;
    permutations: {
      quartz: string;
      iron: string;
      gold: string;
      diamond: string;
      netherite: string;
      redstone: string;
      copper: string;
      emerald: string;
      lapis: string;
      amethyst: string;
      iron_darker: string;
      gold_darker: string;
      diamond_darker: string;
      netherite_darker: string;
    };
  }[];
};
