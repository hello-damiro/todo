import { $, _$, colors, fieldHTML } from './constants';
import { addTaskField } from './helpers';
import dayjs from 'dayjs';

export class Control {
    constructor() {
        this.logo = $('.logo > img');
        this.logoButton = $('.logo');
        this.logoRotation = 0;
        this.createUI = $('.create-container').parentNode;
        this.curtain = $('.curtain');
        this.date = $('.clock');

        this.createCard = $('.create-card');
        this.createTitle = $('#add-project-title');
        this.createTitleAlert = $('.alert');
        this.createDueDate = $('#add-project-due');
        this.createTaskList = $('.task-lists');
        this.createTaskFieldButton = $('.add-task');
        this.createNote = $('#add-project-note');
        this.createColor = $('.add-project-color');
        this.createBookmark = $('.add-project-bookmark');
        this.createProjectButton = $('#add-project-button');
    }

    init() {
        this.setDate();
        this.listenLogoButton();
        this.listenCurtain();
        this.listenTaskField();
        this.listenProjectColor();
        this.listenCreateButton();
    }

    setDate() {
        this.currentDate = dayjs().format('DD MMM YYYY');
        this.date.textContent = this.currentDate;
    }

    toggleCreateUI() {
        this.logoRotation += 45;
        this.logo.style.transform = 'rotate(' + this.logoRotation + 'deg)';
        this.logo.style.transition = 'transform 0.3s ease-out';
        this.createUI.classList.toggle('hidden');
        window.scrollTo(0, 0);
    }

    listenLogoButton() {
        this.logoButton.addEventListener('click', () => {
            this.emptyCreateFields();
            this.toggleCreateUI();
        });
    }

    listenCurtain() {
        this.curtain.addEventListener('click', () => {
            this.toggleCreateUI();
        });
    }

    listenProjectColor() {
        this.createColor.addEventListener('change', (e) => {
            this.createCard.style.backgroundColor = colors[e.target.value];
        });
    }

    listenCreateButton() {
        this.createProjectButton.addEventListener('click', () => {
            if (this.createTitle.value != '') {
                this.createTitleAlert.textContent = '';
                if (this.type) {
                    // CREATE NEW
                    // add item to index 0
                } else {
                    // EDIT JSON
                    // delete index item
                    // add item to index
                }
                // ONCE CREATED, RE-RENDER CARDS
            } else {
                this.createTitleAlert.textContent = 'Title is required';
            }
            window.scrollTo(0, 0);
        });
    }

    listenTaskField() {
        this.createTaskFieldButton.addEventListener('click', () => addTaskField());
    }

    emptyCreateFields() {
        this.createTitle.value = '';
        this.createTitleAlert.value = '';
        this.createDueDate.value = '';
        this.createNote.value = '';
        this.createBookmark.classList.remove('bookmarked');
        this.createColor.value = 'white';
        this.createCard.style.backgroundColor = colors['white'];
        let taskFields = _$('.task-field');
        taskFields.forEach((field) => field.remove());
    }
}
