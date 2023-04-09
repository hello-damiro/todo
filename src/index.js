import './styles/style.css';
import { ListCards } from './js/card-list';
import { CreateCard } from './js/card-create';
import { Process } from './js/process';
import { delay } from './js/helpers';
import { Card } from './js/card';
import { DB } from './js/db';

let projects = new DB().projects;

async function test() {
    const card = new Card(projects[1]).render();
    await delay(2000);
    Card = null;
    console.log('whoa!');
}

test();
