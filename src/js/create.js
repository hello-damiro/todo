import { $, _$, colors } from './constants';
import { addTaskField } from './helpers';

export class Create {
    constructor() {
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
        this.listenTaskField();
        this.listenProjectColor();
        this.listenProjectBookmark();
        this.listenCreateButton();
    }

    listenProjectColor() {
        this.createColor.addEventListener('change', (e) => {
            this.createCard.style.backgroundColor = colors[e.target.value];
        });
    }

    listenProjectBookmark() {
        this.createBookmark.addEventListener('click', () => {
            this.createBookmark.classList.toggle('bookmarked');
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

// class CardEdit extends Card {}
