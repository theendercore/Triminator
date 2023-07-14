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

type MaterialData = {};


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