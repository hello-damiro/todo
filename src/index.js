import './styles/style.css';
import { ListCards } from './js/card-list';
import { CreateCard } from './js/card-create';
import { Process } from './js/process';

const listCards = new ListCards();
listCards.initialize();

const addCard = new CreateCard();
addCard.initialize();

const process = new Process();
process.initialize();
