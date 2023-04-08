import { $, _$, fieldHTML, colors } from './constants';
import { DB } from './db';
import dayjs from 'dayjs';
import 'dayjs/locale/en';

export class CreateCard {
    constructor() {
        this.createCard = $('.create-card');
        this.projectTitle = $('#add-project-title');
        this.projectDueDate = $('#add-project-due');
        this.projectTaskList = $('.task-lists');
        this.taskFieldButton = $('.add-task');
        this.projectNote = $('#add-project-note');
        this.projectColor = $('.add-project-color');
        this.projectBookmark = $('.add-project-bookmark');
        this.addProjectButton = $('#add-project-button');

        this.db = new DB();
        this.projects = this.db.projects;
    }

    addTaskField() {
        this.projectTaskList.insertAdjacentHTML('beforeend', fieldHTML);
        const newField = $('.task-field:last-child');
        const deleteField = newField.querySelector('.delete-project-task');
        const prioritizeField = newField.querySelector('.prioritize-project-task');
        const parent = deleteField.parentNode;
        deleteField.addEventListener('click', () => parent.remove());
        prioritizeField.addEventListener('click', () =>
            prioritizeField.classList.toggle('prioritized')
        );
    }

    emptyFields() {
        this.projectTitle.value = '';
        this.projectDueDate.value = '';
        this.taskFields = _$('.task-field');
        this.taskFields.forEach((field) => field.remove());
        this.projectNote.value = '';
        this.projectColor.value = 'white';
        this.createCard.style.backgroundColor = colors['white'];
        this.projectBookmark.classList.remove('bookmarked');
    }

    editCard(index) {
        this.projectTitle.value = this.projects[index].title;
        this.projectDueDate.value = this.projects[index].due_date;

        this.taskFields = _$('.task-field');
        this.taskFields.forEach((field) => field.remove());
        this.projects[index].tasks.forEach(() => this.addTaskField());

        this.taskFields = _$('.task-field');
        this.taskFields.forEach((field, i) => {
            field.querySelector('.add-project-task').value = this.projects[index].tasks[i].name;
            if (this.projects[index].tasks[i].priority) {
                field.querySelector('.prioritize-project-task').classList.add('prioritized');
            } else {
                field.querySelector('.prioritize-project-task').classList.remove('prioritized');
            }
        });

        this.projectNote.value = this.projects[index].note;

        let color = this.db.projects[index].color;
        if (color == '') color = 'white';
        this.projectColor.value = color;
        this.createCard.style.backgroundColor = colors[color];

        if (this.projects[index].bookmark) this.projectBookmark.classList.add('bookmarked');
        else this.projectBookmark.classList.remove('bookmarked');
    }

    listenTaskField() {
        this.taskFieldButton.addEventListener('click', () => {
            this.addTaskField();
        });
    }

    getProjectTitle() {
        return this.projectTitle.value;
    }

    getProjectDueDate() {
        let date = new Date();
        this.projectDueDate.value ? (date = this.projectDueDate.value) : date;
        return dayjs(date).format('DD MMM YYYY');
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
        this.listenTaskField();
        this.getProjectDueDate();
        this.getProjectColor();
        this.getProjectBookmark();
        this.getProjctDetalis();
    }
}
