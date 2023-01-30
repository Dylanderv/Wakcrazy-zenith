import {BuildEnhanced} from "../Model/BuildEnhanced";
import {BuildFilters} from "../Model/BuildFilters";
import {BuildCard} from "./BuildCard";

export class BuildsFilteredDiv {

    private readonly MainDiv: HTMLDivElement;
    private readonly DivBaseFetching: HTMLDivElement;
    private readonly DivAddFetching: HTMLDivElement;
    private newBuilds: BuildEnhanced[] = [];
    private builds: BuildEnhanced[] = [];
    private BuildCards: BuildCard[] = [];
    private filter: BuildFilters = new BuildFilters(true, false, false, false);

    constructor(div: HTMLDivElement) {
        this.MainDiv = div;
        this.DivBaseFetching = document.createElement('div');
        this.DivAddFetching = document.createElement('div')
        this.MainDiv.appendChild(this.DivBaseFetching);
        this.MainDiv.appendChild(this.DivAddFetching);
    }

    public DisplayIsFetching(total: number) {
        this.MainDiv.appendChild(this.DivBaseFetching);
        this.MainDiv.appendChild(this.DivAddFetching);
        this.DivBaseFetching.innerHTML = `<p>Récupération des ${total} premiers éléments  ...</p>`;
    }

    public DisplayEndFetching(total: number) {
        this.DivBaseFetching.innerHTML = `<p>Récupération des ${total} premiers éléments terminée</p>`;
    }

    public GatherBuildsAndUpdateFetchingView(buildsToFilterAndDisplay: BuildEnhanced[]) {
        this.newBuilds.push(...buildsToFilterAndDisplay);
        this.UpdateFetching();
    }

    public UpdateFetching() {
        const elementStillFetching = this.newBuilds.filter(x => x.IsStillFetching());

        this.builds.push(...this.newBuilds.filter(x => !x.IsStillFetching()));
        this.newBuilds = elementStillFetching;

        const percentageDone = (this.builds.length  / (this.newBuilds.length + this.builds.length)) * 100;
        this.DivAddFetching.innerHTML = `<p>Récupération des données supplémentaires - ${percentageDone}%</p>`

        if (this.newBuilds.length === 0) {
            this.FilterAndDisplayElements();
        }
    }

    public FilterAndDisplayElements() {
        const filteredBuilds = this.builds.filter(x => this.filter.IsMatching(x));
        this.BuildCards = filteredBuilds.map(x => new BuildCard(x));
        this.RefreshDisplay()
    }

    RefreshDisplay() {
        this.DivAddFetching.innerHTML = '';
        this.DivBaseFetching.innerHTML = '';
        this.MainDiv.innerHTML = this.TurnBuildsIntoHtml();
    }

    private TurnBuildsIntoHtml() {
        return this.BuildCards
            .reduce((previousValue, currentValue) => previousValue += currentValue.ToHtml(), '');
    }

    UpdateFilters(filter: BuildFilters) {
        this.filter = filter;
    }
}