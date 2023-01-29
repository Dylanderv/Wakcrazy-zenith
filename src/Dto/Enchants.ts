export interface Enchants {
    sides: {[key: number]: ItemEchant}
    epic: any;
    relic: any;
}

export interface ItemEchant {
    shards: Shard[];
    sublimation: Shard;
}

export interface Shard {
    id_shard: number;
    name_shard: string;
}