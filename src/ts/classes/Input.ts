import { debounce } from "../debounce";
import { request } from "../request";
import { FindList } from "./FindList";

type Undefinable<T> = T | undefined;
type Func = (value: string) => void

export class Input {
    static readonly eventName = 'keyup';

    #input: HTMLInputElement;
    #timer: number;
    #handler: () => void = () => {};
    #func: Undefinable<Func>;

    constructor(findList: FindList, element?: HTMLInputElement, ms?: number, fn?: Func) {
        this.#input = element ?? document.getElementById('input') as HTMLInputElement;
        if(!this.#input) throw new Error('Not found Input Element.')

        this.#timer = ms ?? 700;

        findList.setMakeChoiceEvent(() => {
            findList.clear();
            this.#input.value = '';
        });

        this.#func = fn ?? (async (value) => {
            const repos = await request(value);

            if(repos === null) {
                findList.clear();
                return;
            }

            if(typeof repos === 'number') {
                findList.message(`Error ${repos}`);
                return;
            }

            findList.fill(repos.items);
        })

        this.#init();
    }

    #init = () => {
        if(!this.#func) return;

        const debounceFunc = debounce(this.#func, this.#timer)
        this.#handler = () => debounceFunc(this.#input.value);

        this.#input.addEventListener(Input.eventName, this.#handler);
    }

    setInputHandler = (fn: Undefinable<Func>) => {
        this.#func = fn;
        this.#input.removeEventListener(Input.eventName, this.#handler);
        this.#init();
    }

    setTimer = (ms: number) => {
        this.#timer = ms;
        this.setInputHandler(this.#func)
    }
}