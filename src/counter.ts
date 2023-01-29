import {zenithWakfuService} from "./Service/ZenithWakfu.service";
import {Build} from "./Dto/Build";
import {getBuildsCallEventService} from "./Service/GetBuildsCallEventService";
import {FetchNextPageButton} from "./DisplayHandler/FetchNextPageButton";
import {BuildsDiv} from "./DisplayHandler/BuildsDiv";
import {BuildEnhanced} from "./Model/BuildEnhanced";
import {FiltersDiv} from "./DisplayHandler/FiltersDiv";
import {filterEventService} from "./Service/FilterEventService";
import {RestartFetchButton} from "./DisplayHandler/RestartFetchButton";

let buildsDiv: BuildsDiv;
let filterDiv: FiltersDiv;
let getPageButton: FetchNextPageButton;
let restartFetch: RestartFetchButton;
const currentBuilds: Build[] = [];
let currentFetchedPage = 0;
let currentClassFilter: number[] = [];
let currentLevelFilter: {min: number, max: number} = {min: 0, max: 500};

getBuildsCallEventService.SetGetBuildsCallStartedEventListener(HandleBuildFetchingStarted);
getBuildsCallEventService.SetGetBuildsCallEndedEventListener(HandleBuildFetchingEnded);
filterEventService.SetToggleClassFilterListener(HandleFilterClassToggled);
filterEventService.SetLevelFilterUpdatedListener(HandleFilterLevelUpdated);

export function setupTestCallButton(fetchNextPageButton: HTMLButtonElement, restartFetchButton: HTMLButtonElement, builds: HTMLDivElement, filters: HTMLDivElement) {
    buildsDiv = new BuildsDiv(builds);
    filterDiv = new FiltersDiv(filters);
    getPageButton = new FetchNextPageButton(fetchNextPageButton);
    getPageButton.SetDefaultState()
    getPageButton.SetClickEventHandler(HandleBuilds);

    restartFetch = new RestartFetchButton(restartFetchButton);
    restartFetch.SetClickEventHandler(restartFetchHandler)
    restartFetch.SetDefaultState();

    filterDiv.DisplayFilters();
}

async function restartFetchHandler(): Promise<void> {
    currentFetchedPage = 0;
    currentBuilds.length = 0;
    buildsDiv.CleanBuildList()
    buildsDiv.RefreshDisplay()
    await HandleBuilds();
}

async function HandleBuilds(): Promise<void> {
    getBuildsCallEventService.DispatchGetBuildsCallStartedEvent();
    const buildList = await zenithWakfuService
        .GetBuilds(
            ++currentFetchedPage,
            {
                LevelFilter: {Min: currentLevelFilter.min, Max: currentLevelFilter.max},
                ClassFilter: currentClassFilter
            });

    currentBuilds.push(...buildList.builds);

    const buildsEnhanced = buildList.builds.map(x => {
        return new BuildEnhanced(
            x,
            (buildsDiv) => {
                console.log("trigger")
                buildsDiv.RefreshDisplay()
            },
            buildsDiv,
            zenithWakfuService.GetEnchants(x.id_build),
            zenithWakfuService.GetBuildDetails(x.link_build))
    });

    getBuildsCallEventService.DispatchGetBuildsCallEndedEvent();

    buildsDiv.PushNewBuilds(buildsEnhanced);
}

function HandleBuildFetchingStarted(_evt: Event) {
    getPageButton.SetFetchingDataState();
    restartFetch.SetFetchingDataState();
}

function HandleBuildFetchingEnded(_evt: Event) {
    getPageButton.SetFetchingEndedState();
    restartFetch.SetFetchingEndedState();
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

