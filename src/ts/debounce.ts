export const debounce = (fn: (value: string) => void, debounceTime: number) => {
    let timeoutId: number;
    let valueArg: string;

    return function (value: string) {
        valueArg = value;

        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => fn(valueArg), debounceTime)
    }
};
