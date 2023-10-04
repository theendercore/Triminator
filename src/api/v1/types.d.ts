type PackContextData = {
    name: string;
    namespace: string;
    description: string;
    version: MCVersion;
    icon: File | null;
    patterns: PatternData[];
    materials: MaterialData[];
};

type PatternData = {
    id: string;
    name: string;
    translation: string;
    item: string;
    baseTexture?: File;
    leggingsTexture?: File;
};

type MaterialData = {
    id: string;
    name: string;
    translation: string;
    color: string;
    item: string;
    palletTexture?: File;
    index: number;
};

type MCVersion = "1.20"

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
    };
}

type VanillaModelOverrideJSON = {
    parent: string;
    overrides: ModelOverrides[];
    textures: {
        layer0: string;
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