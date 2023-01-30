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

        const [minLevelText, minLevelInput] = this.getInputNumber('min');
        const [maxLevelText, maxLevelInput] = this.getInputNumber('max')

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

        const [namePage, inputPage] = this.getInputNumber('page');

        // @ts-ignore
        inputPage.addEventListener('input', (e) => filterEventService.DispatchFilterResultEvent(enchantInput.checked, EquipmentInput.checked, ActiveInput.checked, PassiveInput.checked, inputPage.value))
        // @ts-ignore
        enchantInput.addEventListener('input', (e) => filterEventService.DispatchFilterResultEvent(enchantInput.checked, EquipmentInput.checked, ActiveInput.checked, PassiveInput.checked, inputPage.value))
// @ts-ignore
        EquipmentInput.addEventListener('input', (e) => filterEventService.DispatchFilterResultEvent(enchantInput.checked, EquipmentInput.checked, ActiveInput.checked, PassiveInput.checked, inputPage.value))
        // @ts-ignore
        PassiveInput.addEventListener('input', (e) => filterEventService.DispatchFilterResultEvent(enchantInput.checked, EquipmentInput.checked, ActiveInput.checked, PassiveInput.checked, inputPage.value))
        // @ts-ignore
        ActiveInput.addEventListener('input', (e) => filterEventService.DispatchFilterResultEvent(enchantInput.checked, EquipmentInput.checked, ActiveInput.checked, PassiveInput.checked, inputPage.value))

        div.appendChild(document.createElement('br'));
        div.appendChild(enchantName);
        div.appendChild(enchantInput);
        div.appendChild(EquipmentName);
        div.appendChild(EquipmentInput);
        div.appendChild(PassiveName);
        div.appendChild(PassiveInput);
        div.appendChild(ActiveName);
        div.appendChild(ActiveInput);
        div.appendChild(document.createElement('br'));
        div.appendChild(namePage);
        div.appendChild(inputPage);

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

    private getInputNumber(type: 'min' | 'max' | 'page'): [HTMLSpanElement, HTMLInputElement] {
        const name = document.createElement('span');
        name.innerText = type === 'min' ? 'Niv. min : ' : type === 'max' ? 'Niv. max : ' : 'Nombre de page a récupérer (10 elements par page)';

        const input = document.createElement('input');
        input.type = 'number';


        if (type !== 'page') {
            // @ts-ignore
            input.addEventListener('input', (e) => filterEventService.DispatchLevelFilterUpdated(type, e.target.value))
        }
        else {
            // @ts-ignore
            input.value = 10;
        }


        return [name, input];
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
