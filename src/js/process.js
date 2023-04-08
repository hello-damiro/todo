import { $, _$, colors, PROCESS_INDEX } from './constants';
import { DB } from './db';

export class Process {
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

    createProject(index) {
        this.projects.push({
            title: this.projectTitle.value,
            due_date: this.projectDueDate.value,
            note: this.projectNote.value,
            tasks: [],
            color: this.projectColor.value,
            bookmark: this.projectBookmark.classList.contains('bookmarked'),
        });
        this.emptyFields();
        console.log('creating ' + index);
        console.table(this.projects);
    }

    deleteProject(index) {
        console.log('deleting ' + index);
    }
}
