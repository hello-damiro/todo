import { $, _$, cardHTML, emptyCard, colors } from './constants';
import { CreateCard } from './card-create';
import { DB } from './db';
import { delay } from './helpers';

export class ListCards {
    constructor() {
        this.logo = $('.logo > img');
        this.logoButton = $('.logo');
        this.addProjectUI = $('.create-container').parentNode;
        this.projectsGrid = $('.projects');

        this.db = new DB();
        this.db.projects.forEach(() => this.projectsGrid.insertAdjacentHTML('beforeend', cardHTML));

        this.cards = _$('.card');
        this.projectTitles = _$('.title');
        this.projectDueDates = _$('.due-date');
        this.projectNotes = _$('.note');
        this.projectBookmarks = _$('.bookmark');
        this.projectTasks = _$('.tasks');
        this.projectEdits = _$('.edit');
        this.projectDeletes = _$('.delete-project');

        this.logoRotation = 0;
    }

    openAddProjectUI() {
        this.logoRotation += 45;
        this.logo.style.transform = 'rotate(' + this.logoRotation + 'deg)';
        this.logo.style.transition = 'transform 0.3s ease-out';
        this.addProjectUI.classList.toggle('hidden');
        window.scrollTo(0, 0);
    }

    listenLogoButton() {
        this.logoButton.addEventListener('click', () => {
            this.openAddProjectUI();
        });
    }

    renderProjectDetails(projects) {
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
                const parent = task.querySelector('.delete-task').parentNode;
                const deleteButton = task.querySelector('.delete-task');
                deleteButton.addEventListener('click', () => {
                    parent.remove();
                });
            });
        });
    }

    renderEmptyCard() {
        let emptyCards = _$('.empty-card');
        let projects = _$('.card');
        let minCard = 5;

        emptyCards.forEach((emptyCard) => emptyCard.remove());

        if (projects.length < minCard) {
            for (let i = 0; i < minCard - projects.length; i++) {
                this.projectsGrid.insertAdjacentHTML('beforeend', emptyCard);
            }
        }
    }

    editProject() {
        const addCard = new CreateCard();
        this.projectEdits.forEach((editProject, index) => {
            editProject.addEventListener('click', () => {
                this.openAddProjectUI();
                addCard.editCard(index);
            });
        });
    }

    deleteProject() {
        this.projectDeletes.forEach((deleteProject, index) => {
            deleteProject.addEventListener('click', () => {
                this.cards[index].remove();
                this.renderEmptyCard();
                // TODO: remove from DB
            });
        });
    }

    applyColors() {
        this.cards.forEach((card, index) => {
            card.style.backgroundColor = colors[this.getColor(index)];
        });
    }

    getColor(index) {
        let color = this.db.projects[index].color;
        if (color == '') color = 'white';
        return color;
    }

    initialize() {
        // this.renderCards();

        this.renderProjectDetails(this.db.projects);
        this.renderEmptyCard();
        this.applyColors();
        this.listenLogoButton();
        this.toggleProjectBookmark();
        this.toggleTaskPriority();
        this.deleteTask();
        this.editProject();
        this.deleteProject();
    }
}

class CardModel {
    constructor(title, dueDate, tasks, note, isBookmarked) {
        this.title = title;
        this.dueDate = dueDate;
        this.tasks = tasks;
        this.note = note;
        this.isBookmarked = isBookmarked;
    }
}
