import { DB } from './db';

export class Card {
    constructor() {
        let $ = (selector) => document.querySelector(selector);
        let _$ = (selector) => document.querySelectorAll(selector);

        let card =
            '<div class="card"><div class="bookmark"></div><div class="details"><h3 class="title"></h3><h4 class="due-date"></h4><h4 class="description">Tasks</h4><ul class="tasks"></ul><h4 class="description">Note</h4><p class="note"></p></div><div class="settings"><div class="edit"></div><div class="delete-project"></div></div></div>';

        let emptyCard = '<div class="empty-card"></div>';

        this.logo = $('.logo > img');
        this.toggleProjectPanelButton = $('.logo');
        this.addProjectUI = $('.create-container').parentNode;
        this.projectsGrid = $('.projects');

        this.db = new DB();
        this.db.projects.forEach(() => this.projectsGrid.insertAdjacentHTML('beforeend', card));

        let minCard = 5;
        if (this.db.projects.length < minCard) {
            for (let i = 0; i < minCard - this.db.projects.length; i++) {
                this.projectsGrid.insertAdjacentHTML('beforeend', emptyCard);
            }
        }

        this.projects = _$('.card');
        this.projectTitles = _$('.title');
        this.projectDueDates = _$('.due-date');
        this.projectNotes = _$('.note');
        this.projectBookmarks = _$('.bookmark');
        this.projectTasks = _$('.tasks');
        this.projectEdits = _$('.edit');
        this.projectDeletes = _$('.delete-project');
    }

    toggleAddProjectUI() {
        let rotation = 0;
        this.toggleProjectPanelButton.addEventListener('click', () => {
            rotation += 45;
            this.logo.style.transform = 'rotate(' + rotation + 'deg)';
            this.logo.style.transition = 'transform 0.3s ease-out';
            this.addProjectUI.classList.toggle('hidden');
            window.scrollTo(0, 0); // Scroll to top of page
        });
    }

    renderProjects(projects) {
        this.projectTitles.forEach((title, index) => {
            title.textContent = projects[index].title;
        });

        this.projectDueDates.forEach((date, index) => {
            date.textContent = projects[index].due_date;
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
                this.projectTasks[index].insertAdjacentHTML('beforeend', task);
            }
        });

        this.projectNotes.forEach((note, index) => {
            note.textContent = projects[index].note;
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

    toggleTaskStatus() {
        this.projectTasks.forEach((projectTask, projectIndex) => {
            const tasks = projectTask.querySelectorAll('li');
            tasks.forEach((task, taskIndex) => {
                const status = task.querySelector('h5');
                status.addEventListener('click', () => status.classList.toggle('checked'));
                // TODO: Status should reflect on DB array
            });
        });
    }

    deleteTask() {
        this.projectTasks.forEach((projectTask, projectIndex) => {
            const tasks = projectTask.querySelectorAll('li');
            tasks.forEach((task, taskIndex) => {
                const status = task.querySelector('.delete-task');
                console.log(
                    'card ' + projectIndex + ' / ' + taskIndex + ' : ' + status.textContent
                );
            });
        });
    }

    applyColor() {
        this.colors = {
            white: '#E6E6E6',
            yellow: '#FEFFC1',
            blue: '#6DE5FF',
            green: '#B7F2A9',
            pink: '#FFBEDC',
        };

        this.projects.forEach((card, index) => {
            let color = this.db.projects[index].color;
            if (color === '') color = 'white';
            card.style.backgroundColor = this.colors[color];
        });
    }

    initialize() {
        this.renderProjects(this.db.projects);
        this.applyColor();
        this.toggleAddProjectUI();
        this.toggleProjectBookmark();
        this.toggleTaskStatus();
    }
}
