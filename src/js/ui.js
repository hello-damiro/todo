import { $, _$, cardHTML, fieldHTML, emptyCard, colors } from './constants';
import { DB } from './db';

export class Card {
    constructor() {
        this.logo = $('.logo > img');
        this.toggleProjectPanelButton = $('.logo');
        this.addProjectUI = $('.create-container').parentNode;
        this.projectsGrid = $('.projects');

        this.db = new DB();
        this.db.projects.forEach(() => this.projectsGrid.insertAdjacentHTML('beforeend', cardHTML));

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
                let isPriority = projects[index].tasks[i].priority ? 'checked' : '';
                let name = projects[index].tasks[i].name;
                let task =
                    '<li><h5 class="' +
                    isPriority +
                    '">' +
                    name +
                    '</h5><div class="delete-task"></div></li>';
                this.projectTasks[index].insertAdjacentHTML('beforeend', task);
            }
        });

        this.projectNotes.forEach((note, index) => {
            if (projects[index].note == '') {
            } else {
                note.textContent = projects[index].note;
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

    toggleTaskPriority() {
        this.projectTasks.forEach((projectTask, projectIndex) => {
            const tasks = projectTask.querySelectorAll('li');
            tasks.forEach((task, taskIndex) => {
                const priority = task.querySelector('h5');
                priority.addEventListener('click', () => priority.classList.toggle('checked'));
                // TODO: priority should reflect on DB array
            });
        });
    }

    deleteTask() {
        this.projectTasks.forEach((projectTask, projectIndex) => {
            const tasks = projectTask.querySelectorAll('li');
            tasks.forEach((task, taskIndex) => {
                const deleteTask = task.querySelector('.delete-task');
                console.log(
                    'card ' + projectIndex + ' / ' + taskIndex + ' : ' + deleteTask.textContent
                );
            });
        });
    }

    applyColor() {
        this.projects.forEach((card, index) => {
            let color = this.db.projects[index].color;
            if (color === '') color = 'white';
            card.style.backgroundColor = colors[color];
        });
    }

    initialize() {
        this.renderProjects(this.db.projects);
        this.applyColor();
        this.toggleAddProjectUI();
        this.toggleProjectBookmark();
        this.toggleTaskPriority();
    }
}

export class AddCard {
    constructor() {
        this.createCard = $('.create-card');
        this.projectTitle = $('#add-project-title');
        this.projectDueDate = $('#add-project-due');
        this.projectTaskList = $('.task-lists');
        this.addFieldButton = $('.add-task');
        this.projectNote = $('#add-project-note');
        this.projectColor = $('.add-project-color');
        this.projectBookmark = $('.add-project-bookmark');
        this.addProjectButton = $('#add-project-button');
    }

    getProjectTitle() {
        return this.projectTitle.value;
    }

    getProjectDueDate() {
        return this.projectDueDate.value ? this.projectDueDate.value : 'NOW';
    }

    async addTaskField() {
        await this.addFieldButton.addEventListener('click', () => {
            this.projectTaskList.insertAdjacentHTML('beforeend', fieldHTML);
            const newField = document.querySelector('.task-field:last-child');
            const deleteField = newField.querySelector('.delete-project-task');
            const prioritizeField = newField.querySelector('.prioritize-project-task');
            deleteField.addEventListener('click', () => this.projectTaskList.removeChild(newField));
            prioritizeField.addEventListener('click', () =>
                prioritizeField.classList.toggle('prioritized')
            );
        });
    }

    getProjectTasks() {
        const tasks = _$('add-project-task');
        const priority = _$('prioritize-project-task');
        tasks.forEach((task, index) => {});
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
        this.addTaskField();
        this.getProjectDueDate();
        this.getProjectColor();
        this.getProjectBookmark();
        this.getProjctDetalis();
    }
}
