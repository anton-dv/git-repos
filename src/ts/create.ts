import { SavedList } from "./classes/SavedList";
import { Item } from "./types/items";

export const createFindItem = (item: Item, clickHandler: () => void) => {
    const findItem = document.createElement('li');

    findItem.classList.add('find-list__item');
    findItem.innerText = cropString(item.name, 30);
    findItem.addEventListener('click', clickHandler)

    return findItem;
}

export const createFindListMessage = (text: string) => {
    const messageElement = document.createElement('div');
    messageElement.innerText = text;
    messageElement.classList.add('find-list__message');

    return messageElement;
}

export const createSavedItem = (item: Item, savedList: SavedList) => {
    const savedItem = document.createElement('li');

    savedItem.classList.add('saved-list__item');

    const removeButton = createRemoveButton(() => {
        savedList.removeItem(item.name);
        savedItem.remove();
    });

    const savedLink = createSavedLink(item);

    savedItem.append(savedLink);
    savedItem.append(removeButton);

    return savedItem;
}


export const createSavedLink = (item: Item) => {
    const savedLink = document.createElement('a');

    savedLink.href = item.html_url;
    savedLink.target = "_blank";
    savedLink.classList.add('saved-list__link');

    const content = `<span>Name: ${cropString(item.name, 27)}</span>
                     <span>Owner: ${cropString(item.owner.login, 27)}</span>
                     <span>Stars: ${item.stargazers_count}</span>`

    savedLink.innerHTML = content;

    return savedLink;
}

export const createRemoveButton = (clickHandler: () => void) => {
    const removeButton = document.createElement('button');

    removeButton.classList.add('saved-list__remove');
    removeButton.innerHTML = `<svg width="46" height="42" viewBox="0 0 46 42" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M44 40.5L2 2" stroke="#FF0000" stroke-width="4"/>
                              <path d="M2 40.5L44 2" stroke="#FF0000" stroke-width="4"/>
                              </svg>`;

    removeButton.addEventListener('click', (event) => {
        if(event.target && (event.target as Element).closest('.saved-list__remove')) {
            clickHandler();
        }

    })

    return removeButton;
}


function cropString(content: string, max: number) {
    return content.length > max ? content.slice(0, 27) + '...' : content; 
}
