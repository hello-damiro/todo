import { $, _$, colors, fieldHTML, emptyCard } from './constants';
import { events } from './pubsub';
import dayjs from 'dayjs';

export function mainUI() {
    let logoRotation = 0;

    const grid = $('.projects');
    const cards = _$('.card');
    const logoButton = $('.logo');
    const logo = $('.logo > img');
    const curtain = $('.curtain');
    const createUI = $('.create-container').parentNode;

    const createCard = $('.create-card');
    const createTitle = $('#add-project-title');
    const createTitleAlert = $('.alert');
    const createDueDate = $('#add-project-due');
    const createTaskFieldButton = $('.add-task');
    const createNote = $('#add-project-note');
    const createColor = $('.add-project-color');
    const createBookmark = $('.add-project-bookmark');
    const createProjectButton = $('#add-project-button');

    const date = $('.clock');
    const currentDate = dayjs().format('DD MMM YYYY');
    (() => (date.textContent = currentDate))();

    curtain.addEventListener('click', () => toggleCreateUI());
    logoButton.addEventListener('click', () => {
        emptyCreateFields();
        toggleCreateUI();
        events.emit('create-UI-type', true);
    });
    createTaskFieldButton.addEventListener('click', () => addTaskField());
    createBookmark.addEventListener('click', () => createBookmark.classList.toggle('bookmarked'));
    createColor.addEventListener(
        'change',
        (e) => (createCard.style.backgroundColor = colors[e.target.value])
    );
    createProjectButton.addEventListener('click', () => {
        createTitleAlert.textContent = '';
        if (createTitle.value != '') processForm(newOrEdit);
        else createTitleAlert.textContent = 'Title is required';

        // ONCE CREATED, RE-RENDER CARDS
        window.scrollTo(0, 0);
    });

    // Bind events
    events.on('create-UI-status', toggleCreateUI);

    function toggleCreateUI() {
        logoRotation += 45;
        logo.style.transform = 'rotate(' + logoRotation + 'deg)';
        logo.style.transition = 'transform 0.3s ease-out';
        createUI.classList.toggle('hidden');
        window.scrollTo(0, 0);
    }

    function processForm(newOrEdit) {
        if (newOrEdit) {
            console.log('new');
            // CREATE NEW
            // add item to index 0
        } else {
            console.log('edit');
            // EDIT JSON
            // delete index item
            // add item to index
        }
    }

    function emptyCreateFields() {
        createTitle.value = '';
        createTitleAlert.value = '';
        createDueDate.value = '';
        createNote.value = '';
        createBookmark.classList.remove('bookmarked');
        createColor.value = 'white';
        createCard.style.backgroundColor = colors['white'];
        let taskFields = _$('.task-field');
        taskFields.forEach((field) => field.remove());
    }

    function renderEmptyCard(length) {
        const emptyCards = _$('.empty-card');
        emptyCards.forEach((emptyCard) => emptyCard.remove());
        const minCard = 5;
        const projectsGrid = $('.projects');
        if (length < minCard) {
            for (let i = 0; i < minCard - length; i++) {
                projectsGrid.insertAdjacentHTML('beforeend', emptyCard);
            }
        }
    }

    function addTaskField(name, priority) {
        const createTaskList = $('.task-lists');
        createTaskList.insertAdjacentHTML('beforeend', fieldHTML);
        const newField = $('.task-field:last-child');
        const deleteField = newField.querySelector('.delete-project-task');
        const inputField = newField.querySelector('.add-project-task');
        const priorityField = newField.querySelector('.prioritize-project-task');
        const parent = deleteField.parentNode;
        name == undefined ? '' : (inputField.value = name);
        if (priority) priorityField.classList.add('prioritized');
        deleteField.addEventListener('click', () => parent.remove());
        priorityField.addEventListener('click', () =>
            priorityField.classList.toggle('prioritized')
        );
    }
}
