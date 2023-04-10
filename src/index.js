import './styles/style.css';
import { DB } from './js/db';
import { mainUI } from './js/main-ui';

let projects = new DB().projects;
export let ui = mainUI(projects);
ui.renderCards();
