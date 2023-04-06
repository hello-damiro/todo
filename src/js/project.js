import { DB } from './js/db';

export class Project {
    constructor(title, tasks, notes) {
        this.title = title;
        this.tasks = tasks;
        this.notes = notes;
    }
}
