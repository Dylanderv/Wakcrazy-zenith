import {EquipmentLight} from "./EquipmentLight";

export interface Build {
    name_job: string;
    id_build: number;
    name_build: string;
    date_build: string;
    level_build: number;
    id_job: number;
    link_build: string;
    private: number;
    id_user: number;
    user: string;
    equipments_light: EquipmentLight[];
    pictos: any[];
}