import { Repositories } from "./types/items";

export const request = async (value: string) => {
    if(value.trim() === '') return null;

    const uri = `https://api.github.com/search/repositories?q=%22${value}%22+in:name&per_page=5&page=1&order=desc&sort=stars`;
    const response = await fetch(uri);

    if(!response.ok) return response.status;

    return await response.json() as Repositories;
}