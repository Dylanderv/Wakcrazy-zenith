import {BuildCard} from "./BuildCard";
import {BuildEnhanced} from "../Model/BuildEnhanced";

export class BuildsDiv {
    private readonly Div: HTMLDivElement;
    private readonly BuildCards: BuildCard[] = [];
    constructor(div: HTMLDivElement) {
        this.Div = div;
    }

    CleanBuildList() {
        this.BuildCards.length = 0;
    }

    PushNewBuilds(builds: BuildEnhanced[]) {
        const buildCards = builds.map(x => new BuildCard(x));
        this.BuildCards.push(...buildCards);
        this.RefreshDisplay();
    }

    RefreshDisplay() {
        this.Div.innerHTML = this.TurnBuildsIntoHtml();
    }

    private TurnBuildsIntoHtml() {
        return this.BuildCards
            .reduce((previousValue, currentValue) => previousValue += currentValue.ToHtml(), '');
    }
}