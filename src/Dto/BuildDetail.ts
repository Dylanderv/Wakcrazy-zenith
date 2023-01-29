export interface BuildDetail {
    id_build: number;
    name_build: string;
    date_build: string;
    level_build: number;
    id_job: number;
    link_build: string;
    private: number;
    id_user: any;
    user: string;
    equipments: BuildDetailsEquipment[];
    deck: Deck;
}

export interface Deck {
    passives: SpellInfo[];
    actives: SpellInfo[];
}

export interface SpellInfo {
    id_spell: number;
    name_spell: string;
    gfx_id: string;
}

export interface BuildDetailsEquipment {
    image_equipment_type: string;
    id_equipment: number;
    gfx_id: string;
    level: number;
    id_equipment_type: number;
    id_rarity: number;
    ap_cost: number;
    mp_cost: number;
    wp_cost: number;
    min_range: number;
    max_range: number;
    name_equipment: string;
    line_of_sight: number;
    metadata: any;
    translations: any;
    criterias: any;
    effects: any;
}