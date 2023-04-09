import { $, _$, cardHTML, colors } from './constants';
import { addTaskField } from './helpers';
import dayjs from 'dayjs';

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
        let cardTitle = card.querySelector('.title');
        let cardDueDate = card.querySelector('.due-date');
        let cardBookmark = card.querySelector('.bookmark');
        let cardTasks = card.querySelector('.tasks');
        let cardNote = card.querySelector('.note');
        let cardEdit = card.querySelector('.edit');
        let cardDelete = card.querySelector('.delete-project');

        cardTitle.textContent = this.title;
        cardDueDate.textContent = dayjs(this.due_date).format('DD MMM YYYY');
        card.style.backgroundColor = this.getColor(this.color);
        cardNote.textContent = this.note;

        cardBookmark.addEventListener('click', () => cardBookmark.classList.add('hidden'));
        if (this.bookmark) cardBookmark.classList.remove('hidden');
        else cardBookmark.classList.add('hidden');

        this.tasks.forEach((task, i) => {
            let name = this.tasks[i].name;
            const parentLi = document.createElement('li');
            cardTasks.appendChild(parentLi);

            const nameH5Child = document.createElement('h5');
            nameH5Child.textContent = name;
            parentLi.appendChild(nameH5Child);
            task.priority ? nameH5Child.classList.add('checked') : '';
            nameH5Child.addEventListener('click', () => {
                nameH5Child.classList.toggle('checked');
                // POINT TO CONTROL FOR ARRAY MANIPULATION
            });

            const deleteDivChild = document.createElement('div');
            deleteDivChild.classList.add('delete-task');
            parentLi.appendChild(deleteDivChild);
            deleteDivChild.addEventListener('click', () => {
                parentLi.remove();
                // POINT TO CONTROL FOR ARRAY MANIPULATION
            });
        });

        cardEdit.addEventListener('click', () => {
            this.copyCardToEdit();
        });

        cardDelete.addEventListener('click', () => {
            card.remove();
            // POINT TO CONTROL FOR ARRAY MANIPULATION
        });

        card.classList.remove('new-card');
    }

    getColor(color) {
        if (color == '') color = 'white';
        return colors[color];
    }

    copyCardToEdit() {
        console.log('edit');
        let createCard = $('.create-card');
        let createTitle = $('#add-project-title');
        let createDueDate = $('#add-project-due');
        let createNote = $('#add-project-note');
        let createColor = $('.add-project-color');
        let createBookmark = $('.add-project-bookmark');

        createTitle.value = this.title;
        createDueDate.value = this.dueDate;
        createNote.value = this.note;
        createBookmark.classList.remove('bookmarked');
        createColor.value = 'white';
        createCard.style.backgroundColor = colors['white'];

        this.tasks.forEach((field) => {
            addTaskField();
        });
    }
}
