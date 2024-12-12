import './scss/main.scss'

import { FindList } from './ts/classes/FindList';
import { Input } from './ts/classes/Input'
import { SavedList } from './ts/classes/SavedList';

const savedList = new SavedList();
const findList = new FindList(savedList);
new Input(findList);
