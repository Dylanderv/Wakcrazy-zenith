import {zenithWakfuService} from "./Service/ZenithWakfu.service";
import {Build} from "./Dto/Build";
import {getBuildsCallEventService} from "./Service/GetBuildsCallEventService";
import {FetchNextPageButton} from "./DisplayHandler/FetchNextPageButton";
import {BuildsDiv} from "./DisplayHandler/BuildsDiv";
import {BuildEnhanced} from "./Model/BuildEnhanced";
import {FiltersDiv} from "./DisplayHandler/FiltersDiv";
import {filterEventService} from "./Service/FilterEventService";
import {BuildFilters} from "./Model/BuildFilters";
import {BuildsFilteredDiv} from "./DisplayHandler/BuildsFilteredDiv";

let buildsDiv: BuildsDiv;
let buildsFilteredDiv: BuildsFilteredDiv;
let filterDiv: FiltersDiv;
let getPageButton: FetchNextPageButton;
const currentBuilds: Build[] = [];
let currentFetchedPage = 0;
let currentClassFilter: number[] = [];
let currentLevelFilter: {min: number, max: number} = {min: 0, max: 500};
let isInFilterState = true;
let pageToRetrieveInFilterMode = 10;
let currentPagination = 0;

getBuildsCallEventService.SetGetBuildsCallStartedEventListener(HandleBuildFetchingStarted);
getBuildsCallEventService.SetGetBuildsCallEndedEventListener(HandleBuildFetchingEnded);
filterEventService.SetToggleClassFilterListener(HandleFilterClassToggled);
filterEventService.SetLevelFilterUpdatedListener(HandleFilterLevelUpdated);
filterEventService.SetFilterResultEventListener(HandleFilterResultUpdated);

export function setupTestCallButton(fetchNextPageButton: HTMLButtonElement, builds: HTMLDivElement, filters: HTMLDivElement) {
    buildsDiv = new BuildsDiv(builds);
    buildsFilteredDiv = new BuildsFilteredDiv(builds);
    filterDiv = new FiltersDiv(filters);
    getPageButton = new FetchNextPageButton(fetchNextPageButton);
    getPageButton.SetDefaultState()
    getPageButton.SetClickEventHandler(HandleBuilds);

    filterDiv.DisplayFilters();
}

async function HandleBuilds(): Promise<void> {
    getBuildsCallEventService.DispatchGetBuildsCallStartedEvent();
    let buildsFetched: Build[] = [];
    if (isInFilterState) {
        console.log(pageToRetrieveInFilterMode)
        for(currentPagination = 1; currentPagination < pageToRetrieveInFilterMode; currentPagination++) {
            const buildList = await zenithWakfuService
                .GetBuilds(
                    currentPagination,
                    {
                        LevelFilter: {Min: currentLevelFilter.min, Max: currentLevelFilter.max},
                        ClassFilter: currentClassFilter
                    });

            buildsFilteredDiv.DisplayIsFetching(currentPagination * 10, pageToRetrieveInFilterMode * 10);
            buildsFetched.push(...buildList.builds)
        }
    } else {
        const buildList = await zenithWakfuService
            .GetBuilds(
                ++currentFetchedPage,
                {
                    LevelFilter: {Min: currentLevelFilter.min, Max: currentLevelFilter.max},
                    ClassFilter: currentClassFilter
                });

        buildsFetched.push(...buildList.builds)
    }

    currentBuilds.push(...buildsFetched);

    const buildsEnhanced = buildsFetched.map(x => {
        return new BuildEnhanced(
            x,
            (buildsDiv) => {
                if (isInFilterState) {
                    buildsFilteredDiv.UpdateFetching();
                }
                else {
                    buildsDiv.RefreshDisplay()
                }

            },
            buildsDiv,
            zenithWakfuService.GetEnchants(x.id_build),
            zenithWakfuService.GetBuildDetails(x.link_build))
    });

    getBuildsCallEventService.DispatchGetBuildsCallEndedEvent();
    if (isInFilterState) {
        buildsFilteredDiv.GatherBuildsAndUpdateFetchingView(buildsEnhanced);
    }
    else {
        buildsDiv.PushNewBuilds(buildsEnhanced);
    }
}

function HandleBuildFetchingStarted(_evt: Event) {
    if (isInFilterState) {
        buildsFilteredDiv.DisplayIsFetching(currentPagination * 10, pageToRetrieveInFilterMode * 10);
    }
    getPageButton.SetFetchingDataState();
}

function HandleBuildFetchingEnded(_evt: Event) {
    if (isInFilterState) {
        buildsFilteredDiv.DisplayEndFetching(pageToRetrieveInFilterMode * 10);
    }
    getPageButton.SetFetchingEndedState();
}

function HandleFilterClassToggled(classId: number) {
    let index = currentClassFilter.indexOf(classId)
    index === -1
        ? currentClassFilter.push(classId)
        : currentClassFilter.splice(index, 1)
}

function HandleFilterLevelUpdated(levelType: 'min' | 'max', value: number) {
    if (levelType === 'min') {
        currentLevelFilter = {min: Number(value), max: currentLevelFilter.max};
    }
    else {
        currentLevelFilter = {min: currentLevelFilter.min, max: Number(value)};
    }
}

function HandleFilterResultUpdated(hasEnchant: boolean, hasEquipment: boolean, hasActiveSpell: boolean, hasPassiveSpell: boolean, pageToRetrieve: number) {
    const filter = new BuildFilters(hasEnchant, hasEquipment, hasActiveSpell, hasPassiveSpell, pageToRetrieve);
    pageToRetrieveInFilterMode = pageToRetrieve;
    console.log(pageToRetrieve)
    buildsFilteredDiv.UpdateFilters(filter);
}

