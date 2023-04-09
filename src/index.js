import './styles/style.css';
import { events } from './js/pubsub';
import { DB } from './js/db';
import { Card } from './js/card';
import { mainUI } from './js/main-ui';

let projects = new DB().projects;

function render() {
    console.log('rendering!');
    projects.forEach((project) => new Card(project).render());
    mainUI.renderEmptyCard(projects.length);
}

mainUI();
render();
