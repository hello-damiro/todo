import { $, _$, cardHTML, emptyCard, colors } from './constants';
import { DB } from './db';

export class ListCards {
    constructor() {
        this.logo = $('.logo > img');
        this.toggleProjectPanelButton = $('.logo');
        this.addProjectUI = $('.create-container').parentNode;
        this.projectsGrid = $('.projects');

        this.db = new DB();
        this.db.projects.forEach(() => this.projectsGrid.insertAdjacentHTML('beforeend', cardHTML));

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

    renderEmptyCard() {
        let emptyCards = _$('.empty-card');
        let projects = _$('.card');
        let minCard = 5;

        emptyCards.forEach((emptyCard, index) => emptyCard.remove());

        if (projects.length < minCard) {
            for (let i = 0; i < minCard - projects.length; i++) {
                this.projectsGrid.insertAdjacentHTML('beforeend', emptyCard);
            }
        }
    }

    deleteProject() {
        this.projectDeletes.forEach((deleteProject, index) => {
            deleteProject.addEventListener('click', () => {
                this.projects[index].remove();
                this.renderEmptyCard();
                // TODO: remove from DB
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
        this.deleteProject();
    }
}
