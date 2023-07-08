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

type DataPackValues = {
  namespace: string;
  name: string;
  lang: string;
  item: string;
};
