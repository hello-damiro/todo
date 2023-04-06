import { DB } from './db';

export class UI {
    constructor() {
        let $ = (selector) => document.querySelector(selector);
        let $$ = (selector) => document.querySelectorAll(selector);

        this.logo = $('.logo > img');
        this.toggleProjectPanelButton = $('.logo');
        this.addProjectUI = $('.create-container').parentNode;

        this.projectsGrid = $('.projects');
        this.projectEdits = $$('.edit');
        this.projectDeletes = $$('.delete-project');

        this.db = new DB();
    }

    toggleProjectBookmark() {
        this.projectBookmarks = document.querySelectorAll('.bookmark');
        this.projectBookmarks.forEach((bookmark, index) => {
            bookmark.addEventListener('click', () => {
                console.log('bookmark: ' + index);
                this.projectBookmarks[index].classList.add('hidden');
            });
        });
    }

    toggleAddProjectUI() {
        let rotation = 0;
        this.toggleProjectPanelButton.addEventListener('click', () => {
            rotation += 45;
            this.logo.style.transform = 'rotate(' + rotation + 'deg)';
            this.logo.style.transition = 'transform 0.3s ease-out';
            this.addProjectUI.classList.toggle('hidden');
        });
    }

    async renderProjects(projects) {
        const newCard =
            '<div class="card"><div class="bookmark"></div><div><h3 class="title"></h3><h4 class="due-date"></h4><h4 class="description">Tasks</h4><ul class="tasks"></ul><h4 class="description">Note</h4><p class="note"></p></div><div class="settings"><div class="edit"></div><div class="delete-project"></div></div></div>';
        const placebo = '<div class="placebo"></div>';

        await projects.forEach(() => this.projectsGrid.insertAdjacentHTML('beforeend', newCard));

        this.projectTitles = document.querySelectorAll('.title');
        this.projectTitles.forEach((title, index) => (title.textContent = projects[index].title));

        this.projectDueDates = document.querySelectorAll('.due-date');
        this.projectDueDates.forEach(
            (date, index) => (date.textContent = projects[index].due_date)
        );

        this.projectNotes = document.querySelectorAll('.note');
        this.projectNotes.forEach((note, index) => (note.textContent = projects[index].note));

        this.projectBookmarks = document.querySelectorAll('.bookmark');
        this.projectBookmarks.forEach((bookmark, index) => {
            if (projects[index].bookmark) this.projectBookmarks[index].classList.remove('hidden');
            else this.projectBookmarks[index].classList.add('hidden');
        });

        this.projectTasks = document.querySelectorAll('.tasks');
        this.projectTasks.forEach((tesks, index) => {
            for (let i = 0; i < projects[index].tasks.length; i++) {
                let newTask =
                    '<li><h5>' +
                    projects[index].tasks[i].name +
                    '</h5><div class="delete-task"></div></li>';
                this.projectTasks[index].insertAdjacentHTML('beforeend', newTask);
            }
        });
    }

    initialize() {
        this.renderProjects(this.db.projects);
        this.toggleAddProjectUI();
        this.toggleProjectBookmark();
    }
}
