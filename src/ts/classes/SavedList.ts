import { createSavedItem } from "../create";
import { Item } from "../types/items";

export class SavedList {
    static readonly className: string = 'saved-list';

    #savedList: HTMLUListElement;

    constructor (element?: HTMLUListElement) {
        this.#savedList = element ?? document.getElementById(SavedList.className) as HTMLUListElement;
        if(!this.#savedList) throw new Error('Not found SavedList Element.')
        
        this.#init();
    }

    #init() {
        this.#load().forEach((item) => {
            const element = createSavedItem(item, this);
            this.#savedList.append(element);
        })
    }

    #load() {
        const json = localStorage.getItem(SavedList.className);
        if(!json) return [];

        return JSON.parse(json) as Item[];
    }

    #save(list: Item[]) {
        const json = JSON.stringify(list);
        localStorage.setItem(SavedList.className, json);
    }

    addItem(item: Item) {
        const list = this.#load();
        
        if(list.find(listItem => listItem.name === item.name)) return;

        list.unshift(item);
        this.#save(list);

        const element = createSavedItem(item, this);
        this.#savedList.prepend(element);
    }

    removeItem(name: string) {
        const list = this.#load();
        const newList = list.filter((value) => value.name !== name);
        this.#save(newList);
    }
}
