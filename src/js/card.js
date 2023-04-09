import { $, _$, cardHTML, emptyCard } from './constants';
import { taskListHTML } from './helpers';
import { getColor } from './helpers';

export class Card {
    constructor(titleOrJson, dueDate, isBookmarked, color, tasks, note) {
        if (typeof titleOrJson === 'object') {
            const project = titleOrJson;
            this.title = project.title;
            this.dueDate = project.dueDate;
            this.isBookmarked = project.isBookmarked;
            this.color = project.color;
            this.tasks = project.tasks;
            this.note = project.note;
        } else {
            this.title = title;
            this.dueDate = dueDate;
            this.isBookmarked = isBookmarked;
            this.color = color;
            this.tasks = tasks;
            this.note = note;
        }
    }

    render() {
        this.projectsGrid = $('.projects');
        this.projectsGrid.insertAdjacentHTML('beforeend', cardHTML);

        let card = $('.new-card');
        let projectTitle = card.querySelector('.title');
        let projectDueDate = card.querySelector('.due-date');
        let projectBookmark = card.querySelector('.bookmark');
        let projectTasks = card.querySelector('.tasks');
        let projectNote = card.querySelector('.note');

        projectTitle.textContent = this.title;
        projectDueDate.textContent = this.due_date;
        console.log(this.color);
        card.style.backgroundColor = getColor(this.color);
        projectNote.textContent = this.note;

        if (this.bookmark) projectBookmark.classList.remove('hidden');
        else projectBookmark.classList.add('hidden');

        for (let i = 0; i < this.tasks.length; i++) {
            let isPriority = this.tasks[i].priority ? 'checked' : '';
            let name = this.tasks[i].name;
            let task = taskListHTML(name, isPriority);
            projectTasks.insertAdjacentHTML('beforeend', task);
        }

        card.classList.remove('new-card');
        this.renderEmptyCard();
    }

    activateCard() {}

    renderEmptyCard() {
        let emptyCards = _$('.empty-card');
        let cards = _$('.card');
        let minCard = 5;
        emptyCards.forEach((emptyCard) => emptyCard.remove());
        if (cards.length < minCard) {
            for (let i = 0; i < minCard - cards.length; i++) {
                this.projectsGrid.insertAdjacentHTML('beforeend', emptyCard);
            }
        }
    }
}
