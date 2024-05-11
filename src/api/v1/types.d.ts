type PatternData = {
    id: string;
    name: string;
    translation: string;
    item: string;
    decal?: boolean;
    baseTexture?: { name?: string; data: string };
    leggingsTexture?: { name?: string; data: string };
    icon?: string;
};

type MaterialData = {
    id: string;
    name: string;
    translation: string;
    color: string;
    item: string;
    palletTexture?: string;
    fileName?: string
    index: number;
};


type PackMeta = {
    pack: {
        pack_format: number;
        description: string;
    };
};

type PatternRecipe = {
    type: string;
    addition: { tag: string };
    base: { tag: string };
    template: { item: string };
};
type PatternJSON = {
    asset_id: string;
    decal?: boolean;
    description: {
        translate: string;
        fallback: string;
    };
    template_item: string;
};

type TrimAtlasesJSON = {
    sources: {
        type: string;
        textures: string[];
        palette_key: string;
        permutations: Record<string, string>
    }[];
};

type MaterialTag = {
    values: string[];
}

type MaterialJSON = {
    asset_name: string;
    description: {
        translate: string;
        color: string;
    };
    ingredient: string;
    item_model_index: number;
}

type BlocksAtlasJSON = {
    sources: {
        type: string;
        textures: string[];
        palette_key: string;
        permutations: Record<string, string>;
    }[];
}

type ArmorModelJSON = {
    parent: string;
    textures: {
        layer0: string;
        layer1: string;
        layer2?: string;
    };
}

type VanillaModelOverrideJSON = {
    parent: string;
    overrides: ModelOverrides[];
    textures: {
        layer0: string;
        layer1?: string;
    };
}
type ModelOverrides = {
    model: string;
    predicate: {
        trim_type: number;
    };
}

type NamedIndexes = {
    name: string;
    index: number
}

type IdentifiableTexture = { id: string, texture: string }