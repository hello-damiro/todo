import './styles/style.css';
import { ListCards } from './js/card-list';
import { AddCard } from './js/card-add';

const listCards = new ListCards();
listCards.initialize();

const addCard = new AddCard();
addCard.initialize();
