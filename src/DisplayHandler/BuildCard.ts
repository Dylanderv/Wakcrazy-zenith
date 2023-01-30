import {zenithWakfuService} from "../Service/ZenithWakfu.service";
import {BuildEnhanced} from "../Model/BuildEnhanced";

export class BuildCard {
    // @ts-ignore
    public readonly BuildEnhanced: BuildEnhanced;

    constructor(buildEnhanced: BuildEnhanced) {
        this.BuildEnhanced = buildEnhanced;
    }

    public ToHtml(): string {
        return `
            <div class="box blue">
                <div>
                    
                    <a href="${zenithWakfuService.GetRedirectLink(this.BuildEnhanced.Overview)}" target="_blank">
                        <img class="inner-image" src="${zenithWakfuService.GetClassIcon(this.BuildEnhanced.Overview.id_job.toString())}"/>
                        [NIV.${this.BuildEnhanced.Overview.level_build}] ${this.BuildEnhanced.Overview.name_build} - ${this.BuildEnhanced.Overview.date_build}
                        
                        ${this.BuildEnhanced.Overview.pictos
                            .map(x => `<img class="picto-image" alt="${x.name_picto}" src="${zenithWakfuService.GetBuildPictoFromName(x.gfx_id)}"/>`)
                            .join('')
                        }
                        
                    </a>
                    <br>
                    ${this.BuildEnhanced.Overview.equipments_light.length > 0
                            ? this.BuildEnhanced.Overview.equipments_light.map(x => `
                                <img class="items-image" src="${zenithWakfuService.GetItemImageFromGfxId(x.gfx_id)}">
                            `).join('')
                            : `<p>❌ Pas d'items</p>`}
                    
                    ${
                        this.BuildEnhanced.Enchants ?
                            Object.values(this.BuildEnhanced.Enchants?.sides).length > 0
                                ? '<p>✅ Ya des subli / enchant</p>'
                                : '<p>❌ Pas de subli / enchant</p>'
                            : '<p>Recuperation des infos sur les subli / enchant ...</p>'
                    }
                    
                    ${this.BuildEnhanced.Details ?
                            `${this.BuildEnhanced.Details?.deck?.actives.length > 0 
                                ? this.BuildEnhanced.Details?.deck?.actives
                                    .map(s => `<img class="items-image" alt="Id Sort ${s.id_spell}" src="${zenithWakfuService.GetSpellIcon(s.id_spell.toString())}">`)
                                : '<p>❌ Pas de sorts actifs</p>'}
                            ${this.BuildEnhanced.Details?.deck?.passives.length > 0 
                                ? this.BuildEnhanced.Details?.deck?.passives
                                    .map(s => `<img class="items-image" alt="Id Sort ${s.id_spell}" src="${zenithWakfuService.GetSpellIcon(s.id_spell.toString())}">`)
                                : '<p>❌ Pas de sorts passifs</p>'}`
                        : `<p>Recuperation des infos sur les sorts ...</p>`
                    }
                    

                </div>
            </div>
        `;
    }


}

