import { $, _$ } from './constants';
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

    createProject() {
        this.projects.push({
            title: this.projectTitle.value,
            due_date: this.projectDueDate.value,
            note: this.projectNote.value,
            tasks: [],
            color: this.projectColor.value,
            bookmark: this.projectBookmark.classList.contains('bookmarked'),
        });
        this.projectTitle.value = '';
        this.projectDueDate.value = '';
        this.projectNote.value = '';
        this.projectColor.value = 'white';
        this.projectBookmark.classList.remove('bookmarked');

        console.table(this.projects);
    }

    updateProject(index) {}

    initialize() {}
}
