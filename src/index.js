import './styles/style.css';
import { UI } from './js/ui';
import { DB } from './js/db';

const ui = new UI();
ui.initialize();

const db = new DB();
console.log(db.projects[2].note);
