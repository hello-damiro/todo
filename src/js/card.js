import { $, _$, cardHTML, colors } from './constants';
import { ui } from '..';
import { events } from './pubsub';
import dayjs from 'dayjs';

export class Card {
    constructor(titleOrJson, dueDate, isBookmarked, color, tasks, note, index) {
        if (typeof titleOrJson === 'object') {
            const project = titleOrJson;
            this.title = project.title;
            this.dueDate = project.due_date;
            this.isBookmarked = project.bookmark;
            this.color = project.color;
            this.tasks = project.tasks;
            this.note = project.note;
            this.index = project.index;
        } else {
            this.title = title;
            this.dueDate = dueDate;
            this.isBookmarked = isBookmarked;
            this.color = color;
            this.tasks = tasks;
            this.note = note;
            this.index = index;
        }

        this.tasksArray = [];
    }

    render() {
        this.projectsGrid = $('.projects');
        this.projectsGrid.insertAdjacentHTML('beforeend', cardHTML);

        this.card = $('.new-card');
        this.cardTitle = this.card.querySelector('.title');
        this.cardDueDate = this.card.querySelector('.due-date');
        this.cardBookmark = this.card.querySelector('.bookmark');
        this.cardTasks = this.card.querySelector('.tasks');
        this.cardNote = this.card.querySelector('.note');
        this.cardEdit = this.card.querySelector('.edit');
        this.cardDelete = this.card.querySelector('.delete-project');

        this.cardTitle.textContent = this.title;
        this.cardDueDate.textContent = dayjs(this.dueDate).format('DD MMM YYYY');
        this.card.style.backgroundColor = this.getColor(this.color);
        this.cardNote.textContent = this.note;

        if (this.isBookmarked) this.cardBookmark.classList.remove('hidden');
        else this.cardBookmark.classList.add('hidden');
        this.cardBookmark.addEventListener('click', () => {
            this.cardBookmark.classList.toggle('hidden');
            this.copyCardToEdit();
            ui.setCreateType(false, this.index);
            ui.editCard();
        });

        this.tasks.forEach((task, i) => {
            let name = this.tasks[i].name;
            const parentLi = document.createElement('li');
            this.cardTasks.appendChild(parentLi);

            const nameH5Child = document.createElement('h5');
            nameH5Child.textContent = name;
            parentLi.appendChild(nameH5Child);
            task.priority ? nameH5Child.classList.add('checked') : '';

            nameH5Child.addEventListener('click', () => {
                nameH5Child.classList.toggle('checked');
                this.getTaskFields(this.index);
                this.copyCardToEdit();
                ui.setCreateType(false, this.index);
                ui.editCard();
            });

            const deleteDivChild = document.createElement('div');
            deleteDivChild.classList.add('delete-task');
            parentLi.appendChild(deleteDivChild);
            deleteDivChild.addEventListener('click', () => {
                parentLi.remove();
                this.getTaskFields(this.index);
                this.copyCardToEdit();
                ui.setCreateType(false, this.index);
                ui.editCard();
            });
        });

        this.cardEdit.addEventListener('click', () => {
            this.getTaskFields(this.index);
            this.copyCardToEdit();
            ui.setCreateType(false, this.index);
            events.emit('create-UI-status', true);
            // events.emit('create-UI-type', false);
        });

        this.cardDelete.addEventListener('click', () => {
            this.copyCardToEdit();
            ui.setCreateType(false, this.index);
            ui.deleteCard();
            // POINT TO CONTROL FOR ARRAY MANIPULATION
        });

        this.card.classList.remove('new-card');
    }

    getTaskFields(index) {
        this.tasksArray = [];
        const tasks = _$('.tasks');
        const tasksH5 = tasks[index].querySelectorAll('h5');
        tasksH5.forEach((task, i) => {
            const name = task.textContent;
            const isPriority = task.classList.contains('checked');
            const taskItem = { name: name, priority: isPriority };
            this.tasksArray.push(taskItem);
        });
        // console.table(this.tasksArray);
    }

    getColor(color) {
        if (color == '') color = 'white';
        return colors[color];
    }

    copyCardToEdit() {
        let createTaskList = $('.task-lists');
        let createCard = $('.create-card');
        let createTitle = $('#add-project-title');
        let createDueDate = $('#add-project-due');
        let createNote = $('#add-project-note');
        let createColor = $('.add-project-color');
        let createBookmark = $('.add-project-bookmark');

        createTaskList.innerHTML = '';
        createTitle.value = this.title;
        createDueDate.value = this.dueDate;
        createNote.value = this.note;
        this.color == '' ? (createColor.value = 'white') : (createColor.value = this.color);
        createCard.style.backgroundColor = colors[this.color];

        if (this.cardBookmark.classList.contains('hidden'))
            createBookmark.classList.remove('bookmarked');
        else createBookmark.classList.add('bookmarked');

        this.tasksArray.forEach((task) => ui.addTaskField(task.name, task.priority));
    }
}
