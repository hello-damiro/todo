import { $, _$, cardHTML, emptyCard, colors, CREATE_TYPE } from './constants';
import { CreateCard } from './card-create';
import { taskListHTML } from './helpers';
import dayjs from 'dayjs';
import 'dayjs/locale/en';

export class ListCards {
    constructor() {
        this.logo = $('.logo > img');
        this.logoButton = $('.logo');
        this.logoRotation = 0;
        this.addProjectUI = $('.create-container').parentNode;
        this.projectsGrid = $('.projects');
        this.curtain = $('.curtain');
        this.date = $('.clock');

        this.setDate();
        this.listenLogoButton();
        this.listenCurtain();

        this.createCard = new CreateCard();
    }

    setDate() {
        this.currentDate = dayjs().format('DD MMM YYYY');
        this.date.textContent = this.currentDate;
    }

    renderCards(projects) {
        this.projectsGrid.innerHTML = '';
        projects.forEach(() => this.projectsGrid.insertAdjacentHTML('beforeend', cardHTML));
    }

    renderProjectDetails(projects) {
        let cards = _$('.card');
        let projectTitles = _$('.title');
        let projectDueDates = _$('.due-date');
        let projectBookmarks = _$('.bookmark');
        let projectTasks = _$('.tasks');
        let projectNotes = _$('.note');

        projectTitles.forEach((title, index) => (title.textContent = projects[index].title));

        projectDueDates.forEach((date, index) => {
            date.textContent = dayjs(projects[index].due_date).format('DD MMM YYYY');
        });

        projectBookmarks.forEach((bookmark, index) => {
            if (projects[index].bookmark) bookmark.classList.remove('hidden');
            else bookmark.classList.add('hidden');
        });

        projectTasks.forEach((tesks, index) => {
            for (let i = 0; i < projects[index].tasks.length; i++) {
                let isPriority = projects[index].tasks[i].priority ? 'checked' : '';
                let name = projects[index].tasks[i].name;
                let task = taskListHTML(name, isPriority);
                tesks.insertAdjacentHTML('beforeend', task);
            }
        });

        projectNotes.forEach((note, index) => {
            if (projects[index].note == '') {
            } else {
                note.textContent = projects[index].note;
            }
        });

        cards.forEach((card, index) => {
            card.style.backgroundColor = colors[this.getColor(projects, index)];
        });

        this.toggleProjectBookmark();
        this.toggleTaskPriority();
        this.deleteTask();
        this.deleteProject();
        this.editProject(projects);
    }

    openAddProjectUI() {
        this.logoRotation += 45;
        this.logo.style.transform = 'rotate(' + this.logoRotation + 'deg)';
        this.logo.style.transition = 'transform 0.3s ease-out';
        this.createCard.emptyFields();
        window.scrollTo(0, 0);
        this.addProjectUI.classList.toggle('hidden');
    }

    listenLogoButton() {
        this.logoButton.addEventListener('click', () => {
            CREATE_TYPE = 'create';
            this.openAddProjectUI();
        });
    }

    listenCurtain() {
        this.curtain.addEventListener('click', () => {
            this.openAddProjectUI();
        });
    }

    toggleProjectBookmark() {
        let projectBookmarks = _$('.bookmark');
        projectBookmarks.forEach((bookmark, index) => {
            bookmark.addEventListener('click', () => {
                console.log('bookmark: ' + index);
                projectBookmarks[index].classList.add('hidden');
            });
        });
    }

    toggleTaskPriority() {
        let projectTasks = _$('.tasks');
        projectTasks.forEach((projectTask, projectIndex) => {
            const tasks = projectTask.querySelectorAll('li');
            tasks.forEach((task, taskIndex) => {
                const priority = task.querySelector('h5');
                priority.addEventListener('click', () => priority.classList.toggle('checked'));
                // TODO: priority should reflect on DB array
            });
        });
    }

    deleteTask() {
        let projectTasks = _$('.tasks');
        projectTasks.forEach((projectTask, projectIndex) => {
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
        let cards = _$('.card');
        let minCard = 5;
        emptyCards.forEach((emptyCard) => emptyCard.remove());
        if (cards.length < minCard) {
            for (let i = 0; i < minCard - cards.length; i++) {
                this.projectsGrid.insertAdjacentHTML('beforeend', emptyCard);
            }
        }
    }

    editProject(projects) {
        let projectEdits = _$('.edit');
        projectEdits.forEach((editProject, index) => {
            editProject.addEventListener('click', () => {
                CREATE_TYPE = 'edit';
                this.openAddProjectUI();
                this.createCard.editCard(projects[index]);
            });
        });
    }

    deleteProject() {
        let cards = _$('.card');
        let projectDeletes = _$('.delete-project');
        projectDeletes.forEach((deleteProject, index) => {
            deleteProject.addEventListener('click', () => {
                cards[index].remove();
                this.renderEmptyCard();
                // TODO: remove from DB
            });
        });
    }

    getColor(projects, index) {
        let color = projects[index].color;
        if (color == '') color = 'white';
        return color;
    }
}
