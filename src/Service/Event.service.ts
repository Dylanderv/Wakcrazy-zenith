
class EventService {
    DispatchEvent(event: Event) {
        window.dispatchEvent(event);
    }

    AddEventListener(eventName: string, listener: (evt: Event) => void) {
        window.addEventListener(eventName, listener);
    }
}


export const eventService = new EventService();
