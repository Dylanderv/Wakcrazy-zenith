import {EquipmentLightMetadata} from "./EquipmentLightMetadata";

export interface EquipmentLight {
    id_equipment: number;
    gfx_id: string;
    side: number;
    id_rarity: number;
    level: number;
    metadata: EquipmentLightMetadata[];
}