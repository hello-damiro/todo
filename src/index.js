import './styles/style.css';
import { $, _$ } from './js/constants';
import { emptyCard } from './js/constants';
import { Control } from './js/control';
import { delay } from './js/helpers';
import { Card } from './js/card';
import { DB } from './js/db';

let projects = new DB().projects;
let control = new Control();

control.init();

async function test() {
    const card = new Card(projects[1]).render();
    // const card1 = new Card(projects[3]).render();
    // const card2 = new Card(projects[7]).render();
    const card3 = new Card(projects[5]).render();
    const card4 = new Card(projects[2]).render();
    renderEmptyCard();

    await delay(2000);
    console.log('whoa!');
}

function renderEmptyCard() {
    const emptyCards = _$('.empty-card');
    const cards = _$('.card');
    const minCard = 5;

    const grid = $('.projects');
    const gridStyles = getComputedStyle(grid);
    const gridWidth = parseInt(gridStyles.width);
    const columnWidth = parseInt(gridStyles.gridTemplateColumns.split(' ')[0]);
    const numColumns = Math.ceil(gridWidth / columnWidth);

    console.log('Number of columns:', numColumns);

    emptyCards.forEach((emptyCard) => emptyCard.remove());
    if (cards.length < minCard) {
        for (let i = 0; i < minCard - cards.length; i++) {
            grid.insertAdjacentHTML('beforeend', emptyCard);
        }
    }
}

test();
