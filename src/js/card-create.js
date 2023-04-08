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
        this.createProjectButton = $('#add-project-button');

        this.listenTaskField();
        this.listenCreateButton();
        this.listenProjectColor();
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

    editCard(project) {
        this.projectTitle.value = project.title;
        this.projectDueDate.value = project.due_date;

        this.taskFields = _$('.task-field');
        this.taskFields.forEach((field) => field.remove());
        project.tasks.forEach(() => this.addTaskField());

        this.taskFields = _$('.task-field');
        this.taskFields.forEach((field, i) => {
            field.querySelector('.add-project-task').value = project.tasks[i].name;
            if (project.tasks[i].priority) {
                field.querySelector('.prioritize-project-task').classList.add('prioritized');
            } else {
                field.querySelector('.prioritize-project-task').classList.remove('prioritized');
            }
        });

        this.projectNote.value = project.note;

        let color = project.color;
        if (color == '') color = 'white';
        this.projectColor.value = color;
        this.createCard.style.backgroundColor = colors[color];

        if (project.bookmark) this.projectBookmark.classList.add('bookmarked');
        else this.projectBookmark.classList.remove('bookmarked');
    }

    listenTaskField() {
        this.taskFieldButton.addEventListener('click', () => {
            this.addTaskField();
        });
    }

    listenProjectColor() {
        this.projectColor.addEventListener('change', (e) => {
            this.createCard.style.backgroundColor = colors[e.target.value];
        });
    }

    listenCreateButton() {
        this.createProjectButton.addEventListener('click', () => {
            // TODO: check required values
            console.log('CREATED!');
        });
    }
}
