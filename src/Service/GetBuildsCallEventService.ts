import {eventService} from "./Event.service";

class GetBuildsCallEventService {
    private readonly GetBuildsCallStartedEventName: string = "GetBuilds_Call_Started"
    private readonly GetBuildsCallEndedEventName: string = "GetBuilds_Call_Ended"

    DispatchGetBuildsCallStartedEvent() {
        const event = new Event(this.GetBuildsCallStartedEventName);
        eventService.DispatchEvent(event);
    }

    DispatchGetBuildsCallEndedEvent() {
        const event = new CustomEvent(this.GetBuildsCallEndedEventName);
        eventService.DispatchEvent(event);
    }

    SetGetBuildsCallStartedEventListener(listener: (evt: Event) => void) {
        eventService.AddEventListener(this.GetBuildsCallStartedEventName, listener)
    }

    SetGetBuildsCallEndedEventListener(listener: (evt: Event) => void) {
        eventService.AddEventListener(this.GetBuildsCallEndedEventName, listener)
    }
}


export const getBuildsCallEventService = new GetBuildsCallEventService();
