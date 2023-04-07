import { $, _$, fieldHTML, colors } from './constants';
import { DB } from './db';

export class CreateCard {
    constructor() {
        this.createCard = $('.create-card');
        this.projectTitle = $('#add-project-title');
        this.projectDueDate = $('#add-project-due');
        this.projectTaskList = $('.task-lists');
        this.addFieldButton = $('.add-task');
        this.projectNote = $('#add-project-note');
        this.projectColor = $('.add-project-color');
        this.projectBookmark = $('.add-project-bookmark');
        this.addProjectButton = $('#add-project-button');
    }

    async addTaskField() {
        await this.addFieldButton.addEventListener('click', () => {
            this.projectTaskList.insertAdjacentHTML('beforeend', fieldHTML);
            const newField = document.querySelector('.task-field:last-child');
            const deleteField = newField.querySelector('.delete-project-task');
            const prioritizeField = newField.querySelector('.prioritize-project-task');
            deleteField.addEventListener('click', () => this.projectTaskList.removeChild(newField));
            prioritizeField.addEventListener('click', () =>
                prioritizeField.classList.toggle('prioritized')
            );
        });
    }

    getProjectTitle() {
        return this.projectTitle.value;
    }

    getProjectDueDate() {
        return this.projectDueDate.value ? this.projectDueDate.value : 'NOW';
    }

    getProjectTasks() {
        const tasks = _$('add-project-task');
        const priority = _$('prioritize-project-task');
        tasks.forEach((task, index) => {});
    }

    getProjectBookmark() {
        this.projectBookmark.addEventListener('click', () => {
            this.projectBookmark.classList.toggle('bookmarked');
        });
    }

    getProjectNotes() {
        return this.projectNote.value;
    }

    getProjectColor() {
        this.projectColor.addEventListener('change', (e) => {
            this.createCard.style.backgroundColor = colors[e.target.value];
        });
    }

    getProjctDetalis() {
        this.addProjectButton.addEventListener('click', () => {
            // TODO: check required values
            console.log('TITLE: ' + this.getProjectTitle());
            console.log('DUE: ' + this.getProjectDueDate());
        });
    }

    initialize() {
        this.addTaskField();
        this.getProjectDueDate();
        this.getProjectColor();
        this.getProjectBookmark();
        this.getProjctDetalis();
    }
}
