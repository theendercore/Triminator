type MatData = {
    name: string;
    namespace: string;
    translation: string;
    color: string;
    item: string;
    palletTexture: File | null;
    index: number;
}

type TrimMaterialsTag = {
    values: string[];
}

type MaterialJson = {
    asset_name: string;
    description: {
        translate: string;
        color: string;
    };
    ingredient: string;
    item_model_index: number;
}

type ArmorTypeModelJson = {
    parent: string;
    textures: {
        layer0: string;
        layer1: string;
    };
}


type BlocksAtlas = {
    sources: {
        type: string;
        textures: string[];
        palette_key: string;
        permutations: Record<string, string>;
    }[];
}

type ArmorModelOverrideJson = {
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