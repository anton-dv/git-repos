import { createFindItem, createFindListMessage } from "../create";
import { Item } from "../types/items";
import { SavedList } from "./SavedList";

type MakeChoiceEvent = (() => void) | undefined; 

export class FindList {
    static readonly className: string = 'find-list';

    #findList: HTMLUListElement;
    #savedList: SavedList;

    #makeChoiceEvent: MakeChoiceEvent; 

    constructor(savedList: SavedList, element?: HTMLUListElement) {
        this.#findList = element ?? document.getElementById(FindList.className) as HTMLUListElement; 
        if(!this.#findList) throw new Error('Not found FindList Element.');

        this.#savedList = savedList;
    }

    setMakeChoiceEvent(func: MakeChoiceEvent) {
        this.#makeChoiceEvent = func;
    }


    fill (items: Item[]) {
        this.clear();

        if(!items.length) {
            this.message("Not found matches");
        }

        items.forEach((item) => {
            const findItem = createFindItem(item, () => {
                this.#savedList.addItem(item);
                if(this.#makeChoiceEvent) this.#makeChoiceEvent();
            })

            this.#findList.append(findItem);
        })
    }

    message(text: string) {
        this.clear();

        const element = createFindListMessage(text);
        this.#findList.append(element);
    }

    clear() {
        this.#findList.setHTMLUnsafe('');    
    }
}
