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

    constructor(overview: Build, triggerOnChange: (buildsDiv: BuildsDiv) => any, buildsDiv: BuildsDiv, enchants: Promise<Enchants>, details: Promise<BuildDetail>) {
        this.Base = new BuildEnhancedType(overview);
        this.BuildsDiv = buildsDiv;
        this.TriggerOnChange = triggerOnChange;
        // this.Proxy.Enchants = enchants;
        enchants.then(x => this.UpdateEnchants(x));
        details.then(x => this.UpdateDetails(x));
    }

    private UpdateEnchants(enchants: Enchants) {
        this.Base.Enchants = enchants;
        this.TriggerOnChange(this.BuildsDiv);
    }

    private UpdateDetails(details: BuildDetail) {
        this.Base.Details = details;
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