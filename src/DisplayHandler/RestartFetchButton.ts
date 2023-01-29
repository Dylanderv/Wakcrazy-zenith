export class RestartFetchButton {
    private readonly Button: HTMLButtonElement;
    private readonly DefaultStateText = 'Relancer la recherche';
    private readonly FetchingStateText = '↺ wsh click plus attend pélo';

    constructor(button: HTMLButtonElement) {
        this.Button = button;
    }

    public SetFetchingDataState() {
        this.Button.innerHTML = this.FetchingStateText;
    }

    public SetDefaultState() {
        this.Button.innerHTML = this.DefaultStateText;
    }

    public SetFetchingEndedState() {
        this.Button.innerHTML = this.DefaultStateText;
    }

    public SetClickEventHandler(clickHandler: () => any) {
        this.Button.addEventListener('click', clickHandler)
    }
}