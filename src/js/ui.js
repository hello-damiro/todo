import { DB } from './db';

export class UI {
    constructor() {
        this.$ = (selector) => document.querySelector(selector);
        this._$ = (selector) => document.querySelectorAll(selector);

        this.newCard =
            '<div class="card"><div class="bookmark"></div><div class="details"><h3 class="title"></h3><h4 class="due-date"></h4><h4 class="description">Tasks</h4><ul class="tasks"></ul><h4 class="description">Note</h4><p class="note"></p></div><div class="settings"><div class="edit"></div><div class="delete-project"></div></div></div>';

        this.placebo = '<div class="placebo"></div>';

        this.logo = this.$('.logo > img');
        this.toggleProjectPanelButton = this.$('.logo');
        this.addProjectUI = this.$('.create-container').parentNode;

        this.projectsGrid = this.$('.projects');
        this.projectEdits = this._$('.edit');
        this.projectDeletes = this._$('.delete-project');

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
        await projects.forEach(() => {
            this.projectsGrid.insertAdjacentHTML('beforeend', this.newCard);
        });

        this.projectTitles = this._$('.title');
        this.projectDueDates = this._$('.due-date');
        this.projectNotes = this._$('.note');
        this.projectBookmarks = this._$('.bookmark');
        this.projectTasks = this._$('.tasks');

        this.projectTitles.forEach((title, index) => {
            title.textContent = projects[index].title;
        });

        this.projectDueDates.forEach(
            (date, index) => (date.textContent = projects[index].due_date)
        );

        this.projectNotes.forEach((note, index) => (note.textContent = projects[index].note));

        this.projectBookmarks.forEach((bookmark, index) => {
            if (projects[index].bookmark) this.projectBookmarks[index].classList.remove('hidden');
            else this.projectBookmarks[index].classList.add('hidden');
        });

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
