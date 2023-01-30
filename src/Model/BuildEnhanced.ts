import {Build} from "../Dto/Build";
import {Enchants} from "../Dto/Enchants";
import {BuildDetail} from "../Dto/BuildDetail";
import {BuildsDiv} from "../DisplayHandler/BuildsDiv";

class BuildEnhancedType {
    public Overview: Build;
    public Enchants?: Enchants;
    public Details?: BuildDetail;

    constructor(overview: Build) {
        this.Overview = overview;
        this.Enchants = undefined;
        this.Details = undefined;
    }
}

export class BuildEnhanced {
    private Base: BuildEnhancedType;
    private TriggerOnChange: (buildsDiv: BuildsDiv) => any;
    private BuildsDiv: BuildsDiv;
    public State: 'Fetching' | 'EnchantReceived' | 'DetailsReceived' | 'Complete'

    constructor(overview: Build, triggerOnChange: (buildsDiv: BuildsDiv) => any, buildsDiv: BuildsDiv, enchants: Promise<Enchants>, details: Promise<BuildDetail>) {
        this.Base = new BuildEnhancedType(overview);
        this.BuildsDiv = buildsDiv;
        this.TriggerOnChange = triggerOnChange;
        this.State = 'Fetching';
        // this.Proxy.Enchants = enchants;
        enchants.then(x => this.UpdateEnchants(x));
        details.then(x => this.UpdateDetails(x));
    }

    public HasEnchant(): boolean {
        return this.Enchants !== undefined && this.Enchants.sides && Object.values(this.Enchants.sides).length > 0;
    }

    public HasPassiveSkill(): boolean {
        return this.Details !== undefined && this.Details.deck && this.Details.deck.passives && this.Details.deck.passives.length > 0
    }

    public HasActiveSkill(): boolean {
        return this.Details !== undefined && this.Details.deck && this.Details.deck.actives && this.Details.deck.actives.length > 0
    }

    public HasEquipment(): boolean {
        return this.Overview && this.Overview.equipments_light && this.Overview.equipments_light.length > 0
    }

    private UpdateEnchants(enchants: Enchants) {
        this.Base.Enchants = enchants;

        if (this.State == 'DetailsReceived') {
            this.State = 'Complete';
        }
        else {
            this.State = 'EnchantReceived';
        }
        this.TriggerOnChange(this.BuildsDiv);

    }

    public IsStillFetching() {
        return this.State != 'Complete';
    }

    private UpdateDetails(details: BuildDetail) {
        this.Base.Details = details;

        if (this.State == 'EnchantReceived') {
            this.State = 'Complete';
        }
        else {
            this.State = 'DetailsReceived';
        }
        this.TriggerOnChange(this.BuildsDiv);

    }

    get Overview() {
        return this.Base.Overview;
    }

    get Enchants() {
        return this.Base.Enchants;
    }

    get Details() {
        return this.Base.Details;
    }

    set Overview(value) {
        if (value) {
            this.Base.Overview = value;
        }
    }

    set Enchants(value) {
        if (value) {
            this.Base.Enchants = value;
        }
    }

    set Details(value) {
        if (value) {
            this.Base.Details = value;
        }
    }

}