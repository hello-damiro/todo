import './styles/style.css';
import { DB } from './js/db';
import { mainUI } from './js/main-ui';

function retrieveLocal() {
    const projectsJson = localStorage.getItem('todo-projects');
    let parsedJSON = JSON.parse(projectsJson);
    return parsedJSON;
}

let projects = [];

if (retrieveLocal() === null) {
    projects = new DB().projects;
    console.log('FROM DB');
} else {
    projects = retrieveLocal();
    console.log('FROM LOCAL');
}

export let ui = mainUI(projects);
console.table(projects);
ui.renderCards();

// localStorage.removeItem('todo-projects');
// storeLocal();
