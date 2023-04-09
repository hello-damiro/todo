import './styles/style.css';
import { renderEmptyCard } from './js/helpers';
import { DB } from './js/db';
import { Card } from './js/card';
import { mainUI } from './js/main-ui';
import { Create } from './js/create';

let projects = new DB().projects;
let create = new Create();

function render() {
    console.log('rendering!');
    projects.forEach((project) => new Card(project).render());
    renderEmptyCard(projects.length);
}

mainUI();
create.init();
render();
