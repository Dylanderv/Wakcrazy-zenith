import {eventService} from "./Event.service";

class FilterEventService {
    private readonly ToggleClassFilterEvent: string = "ClassFilter_Toggled"
    private readonly ToggleLevelFilterEvent: string = "LevelFilterUpdated"

    DispatchToggleClassFilter(classId: number) {
        const event = new CustomEvent(this.ToggleClassFilterEvent, {detail: classId});
        eventService.DispatchEvent(event);
    }

    DispatchLevelFilterUpdated(levelType: 'min' | 'max', value: number) {
        const event = new CustomEvent(this.ToggleLevelFilterEvent, {detail: {type: levelType, value}});
        eventService.DispatchEvent(event);
    }

    SetToggleClassFilterListener(listener: (classId: number) => void) {
        // @ts-ignore
        eventService.AddEventListener(this.ToggleClassFilterEvent, (event: CustomEvent) => {
            listener(event.detail);
        })
    }

    SetLevelFilterUpdatedListener(listener: (type: 'min' | 'max', value: number) => void) {
        // @ts-ignore
        eventService.AddEventListener(this.ToggleLevelFilterEvent, (event: CustomEvent) => {
            // @ts-ignore
            listener(event.detail.type, event.detail.value);
        })
    }
}


export const filterEventService = new FilterEventService();
