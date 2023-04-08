import { $, _$ } from './constants';
import { DB } from './db';

export class Process {
    constructor(index, title, dueDate, tasks, note, isBookmarked) {
        this.index = index;
        this.title = title;
        this.dueDate = dueDate;
        this.tasks = tasks;
        this.note = note;
        this.isBookmarked = isBookmarked;

        this.db = new DB();
        this.projects = this.db.projects;
    }

    addProject() {
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

    editProject(index) {}

    initialize() {}
}
