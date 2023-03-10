import {eventService} from "./Event.service";

class FilterEventService {
    private readonly ToggleClassFilterEvent: string = "ClassFilter_Toggled"
    private readonly ToggleLevelFilterEvent: string = "LevelFilterUpdated"
    private readonly FilterResultEvent: string = "FilterResultEvent"

    DispatchToggleClassFilter(classId: number) {
        const event = new CustomEvent(this.ToggleClassFilterEvent, {detail: classId});
        eventService.DispatchEvent(event);
    }

    DispatchLevelFilterUpdated(levelType: 'min' | 'max', value: number) {
        const event = new CustomEvent(this.ToggleLevelFilterEvent, {detail: {type: levelType, value}});
        eventService.DispatchEvent(event);
    }

    DispatchFilterResultEvent(hasEnchant: boolean, hasEquipment: boolean, hasActiveSpell: boolean, hasPassiveSpell: boolean, pageToRetrieve: number) {
        const event = new CustomEvent(this.FilterResultEvent, {detail: {hasEnchant, hasEquipment, hasActiveSpell, hasPassiveSpell, pageToRetrieve}});
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

    SetFilterResultEventListener(listener: (hasEnchant: boolean, hasEquipment: boolean, hasActiveSpell: boolean, hasPassiveSpell: boolean, pageToRetrieve: number) => void) {
        // @ts-ignore
        eventService.AddEventListener(this.FilterResultEvent, (event: CustomEvent) => {
            // @ts-FilterResultEvent
            console.log(event);
            listener(event.detail.hasEnchant, event.detail.hasEquipment, event.detail.hasActiveSpell, event.detail.hasPassiveSpell, event.detail.pageToRetrieve);
        })
    }
}


export const filterEventService = new FilterEventService();
