import {BuildEnhanced} from "./BuildEnhanced";

export class BuildFilters {
    private readonly ShouldContainEnchant: boolean;
    private readonly ShouldContainEquipment: boolean;
    private readonly ShouldContainActiveSpell: boolean;
    private readonly ShouldContainPassiveSpell: boolean;
    public readonly NumberOfPagesToRetrieve: number;

    constructor(hasEnchant: boolean, hasEquipment: boolean, hasActiveSpell: boolean, hasPassiveSpell: boolean, numberOfPagesToRetrieve: number) {
        this.ShouldContainPassiveSpell = hasPassiveSpell;
        this.ShouldContainActiveSpell = hasActiveSpell;
        this.ShouldContainEquipment = hasEquipment;
        this.ShouldContainEnchant = hasEnchant;
        this.NumberOfPagesToRetrieve = numberOfPagesToRetrieve;
    }


    public IsMatching(build: BuildEnhanced): boolean {
        if (this.ShouldContainEnchant) {
            if (!build.HasEnchant()) {
                return false;
            }
        }

        if (this.ShouldContainEquipment) {
            if (!build.HasEquipment()) {
                return false;
            }
        }

        if (this.ShouldContainActiveSpell) {
            if (!build.HasActiveSkill()) {
                return false;
            }
        }

        if (this.ShouldContainPassiveSpell) {
            if (!build.HasPassiveSkill()) {
                return false;
            }
        }

        return true;
    }
}