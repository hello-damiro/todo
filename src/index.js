import './styles/style.css';
import { ListCards } from './js/card-list';
import { CreateCard } from './js/card-create';
import { Process } from './js/process';
import { delay } from './js/helpers';
import { DB } from './js/db';

let projects = new DB().projects;
let cards = new ListCards();

function initialize() {
    cards.renderCards(projects);
    cards.renderProjectDetails(projects);
}

initialize();
