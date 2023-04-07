import { DB } from './db';

export class UI {
    constructor() {
        this.$ = (selector) => document.querySelector(selector);
        this._$ = (selector) => document.querySelectorAll(selector);

        this.card =
            '<div class="card"><div class="bookmark"></div><div class="details"><h3 class="title"></h3><h4 class="due-date"></h4><h4 class="description">Tasks</h4><ul class="tasks"></ul><h4 class="description">Note</h4><p class="note"></p></div><div class="settings"><div class="edit"></div><div class="delete-project"></div></div></div>';

        this.emptyCard = '<div class="empty-card"></div>';

        this.logo = this.$('.logo > img');
        this.toggleProjectPanelButton = this.$('.logo');
        this.addProjectUI = this.$('.create-container').parentNode;

        this.projectsGrid = this.$('.projects');
        this.projectEdits = this._$('.edit');
        this.projectDeletes = this._$('.delete-project');

        this.db = new DB();
        this.db.projects.forEach(() =>
            this.projectsGrid.insertAdjacentHTML('beforeend', this.card)
        );

        this.projectTitles = this._$('.title');
        this.projectDueDates = this._$('.due-date');
        this.projectNotes = this._$('.note');
        this.projectBookmarks = this._$('.bookmark');
        this.projectTasks = this._$('.tasks');
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

    renderProjects(projects) {
        this.projectTitles.forEach((title, index) => {
            title.textContent = projects[index].title;
        });

        this.projectDueDates.forEach((date, index) => {
            date.textContent = projects[index].due_date;
        });

        this.projectNotes.forEach((note, index) => {
            note.textContent = projects[index].note;
        });

        this.projectBookmarks.forEach((bookmark, index) => {
            if (projects[index].bookmark) this.projectBookmarks[index].classList.remove('hidden');
            else this.projectBookmarks[index].classList.add('hidden');
        });

        this.projectTasks.forEach((tesks, index) => {
            for (let i = 0; i < projects[index].tasks.length; i++) {
                let status = projects[index].tasks[i].status ? 'checked' : '';
                let name = projects[index].tasks[i].name;
                let task =
                    '<li><h5 class="' +
                    status +
                    '">' +
                    name +
                    '</h5><div class="delete-task"></div></li>';
                // let task = '<li><h5 class="${status}">${name}</h5><div class="delete-task"></div></li>';
                this.projectTasks[index].insertAdjacentHTML('beforeend', task);
            }
        });
    }

    toggleProjectBookmark() {
        this.projectBookmarks.forEach((bookmark, index) => {
            bookmark.addEventListener('click', () => {
                console.log('bookmark: ' + index);
                this.projectBookmarks[index].classList.add('hidden');
            });
        });
    }

    toggleTaskStatus(index, status) {
        const task = this.projectTasks[index].$('h5');
        task.addEventListener('click', () => {
            if (status) task.classList.add('checked');
            else task.classList.remove('checked');
        });
    }

    initialize() {
        this.renderProjects(this.db.projects);
        this.toggleAddProjectUI();
        this.toggleProjectBookmark();
    }
}
