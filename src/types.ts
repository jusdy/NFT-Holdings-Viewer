export type Asset = {
    identifier: string;
    name: string;
    display_image_url: string;
    description: string;
    metadata_url: string;
};

export type ApiResponse = {
    nfts: Asset[];
};

export type Attribute = {
    trait_type: string;
    value: string;
};

export type Metadata = {
    id: string;
    attributes: Attribute[];
    description: string;
    image: string;
    name: string;
};