import {Class, zenithWakfuService} from "../Service/ZenithWakfu.service";
import {filterEventService} from "../Service/FilterEventService";

export class FiltersDiv {
    private readonly Div: HTMLDivElement;
    private readonly Classes: {className: string, classId: number}[];
    constructor(div: HTMLDivElement) {
        this.Div = div;

        // @ts-ignore
        this.Classes = Object.values(Class)
            .filter(x => typeof(x) === 'string')
            // @ts-ignore
            .map(x => ({className: x, classId: Class[x]}))
    }

    public DisplayFilters() {
        const filterList = [...this.GetClassFilterList(), ...this.GetLevelFilterList(), ...this.GetFilterResultList()];
        filterList.forEach(x => this.Div.appendChild(x));
    }

    private GetLevelFilterList(): HTMLDivElement[] {
        let divList: HTMLDivElement[] = [];

        const div = document.createElement('div');
        div.classList.add('levelFilterElement')
        div.classList.add('filterElement')

        const [minLevelText, minLevelInput] = this.getInputLevelDiv('min');
        const [maxLevelText, maxLevelInput] = this.getInputLevelDiv('max')

        div.appendChild(minLevelText);
        div.appendChild(minLevelInput);
        div.appendChild(maxLevelText);
        div.appendChild(maxLevelInput);

        divList.push(div);
        return divList;
    }

    private GetFilterResultList(): HTMLDivElement[] {
        let divList: HTMLDivElement[] = [];

        const div = document.createElement('div');

        const [enchantName, enchantInput] = this.getInputFilterResult('Enchant')
        const [EquipmentName, EquipmentInput] = this.getInputFilterResult('Equipment')
        const [PassiveName, PassiveInput] = this.getInputFilterResult('Passive')
        const [ActiveName, ActiveInput] = this.getInputFilterResult('Active')

        // @ts-ignore
        enchantInput.addEventListener('input', (e) => filterEventService.DispatchFilterResultEvent(enchantInput.checked, EquipmentInput.checked, ActiveInput.checked, PassiveInput.checked))

        div.appendChild(enchantName);
        div.appendChild(enchantInput);
        div.appendChild(EquipmentName);
        div.appendChild(EquipmentInput);
        div.appendChild(PassiveName);
        div.appendChild(PassiveInput);
        div.appendChild(ActiveName);
        div.appendChild(ActiveInput);

        divList.push(div);
        return divList;
    }

    private getInputFilterResult(name: string) {
        const filterName = document.createElement('span');
        filterName.innerText = name;

        const filterInput = document.createElement('input');
        filterInput.type = 'checkbox';

        return [filterName, filterInput];
    }

    private getInputLevelDiv(type: 'min' | 'max'): [HTMLSpanElement, HTMLInputElement] {
        const minLevelText = document.createElement('span');
        minLevelText.innerText = type === 'min' ? 'Niv. min : ' : 'Niv. max : ';

        const minLevelInput = document.createElement('input');
        minLevelInput.type = 'number';

        // @ts-ignore
        minLevelInput.addEventListener('input', (e) => filterEventService.DispatchLevelFilterUpdated(type, e.target.value))

        return [minLevelText, minLevelInput];
    }

    private GetClassFilterList(): HTMLDivElement[] {
        let divList: HTMLDivElement[] = [];

        for (let classElement of this.Classes) {
            const div = document.createElement('div');
            div.classList.add('classFilterElement')
            div.classList.add('filterElement')

            const input = document.createElement('input');
            input.type = 'checkbox';
            div.innerHTML = `<img src="${zenithWakfuService.GetClassIcon(classElement.classId.toString())}" alt="${classElement.className}"/>`;

            div.addEventListener('click', (e) => {
                filterEventService.DispatchToggleClassFilter(classElement.classId);
                input.checked = !input.checked;
                e.preventDefault()
            });

            input.addEventListener('click', (e) => {
                filterEventService.DispatchToggleClassFilter(classElement.classId);
                e.stopPropagation();
            })

            div.appendChild(input);
            divList.push(div);
        }

        return divList;
    }
}
