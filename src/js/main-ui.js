import { $, _$, colors, fieldHTML, emptyCard } from './constants';
import { Card } from './card';
import { events } from './pubsub';
import dayjs from 'dayjs';

export function mainUI(projects) {
    let logoRotation = 0;
    let createType = true; // true: new | false: edit
    let createIndex = 0;

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
    const createTaskList = $('.task-lists');
    const createTaskFieldButton = $('.add-task');
    const createNote = $('#add-project-note');
    const createColor = $('.add-project-color');
    const createBookmark = $('.add-project-bookmark');
    const createProjectButton = $('#add-project-button');

    const date = $('.clock');
    const currentDate = dayjs().format('DD MMM YYYY');
    (() => (date.textContent = currentDate))();

    // Bind events
    curtain.addEventListener('click', () => toggleCreateUI());
    logoButton.addEventListener('click', () => {
        setCreateType(true);
        emptyCreateFields();
        toggleCreateUI();
        events.emit('create-UI-type', true);
    });
    createTaskFieldButton.addEventListener('click', () => addTaskField());
    createBookmark.addEventListener('click', () => createBookmark.classList.toggle('bookmarked'));
    createColor.addEventListener('change', (e) => {
        createCard.style.backgroundColor = colors[e.target.value];
    });
    createProjectButton.addEventListener('click', () => {
        createTitleAlert.textContent = '';
        if (createTitle.value != '') processForm(createType);
        else createTitleAlert.textContent = 'Title is required';
        renderCards();
        emptyCreateFields();
        window.scrollTo(0, 0);
    });

    // PubSub
    events.on('create-UI-status', toggleCreateUI);

    function setCreateType(type, index) {
        createType = type;
        createIndex = index;
    }

    function toggleCreateUI() {
        logoRotation += 45;
        logo.style.transform = 'rotate(' + logoRotation + 'deg)';
        logo.style.transition = 'transform 0.3s ease-out';
        createUI.classList.toggle('hidden');
        window.scrollTo(0, 0);
    }

    function renderCards() {
        sortIndex();
        console.table(projects);
        grid.innerHTML = '';
        projects.forEach((project) => new Card(project).render());
        renderEmptyCard(projects.length);
    }

    function processForm(newOrEdit) {
        if (newOrEdit) {
            console.log('new');
            projects.splice(0, 0, cardModel());
        } else {
            console.log('edit');
            projects[createIndex] = cardModel();
            toggleCreateUI();
        }
    }

    function sortIndex() {
        projects.forEach((project, index) => {
            project.index = index;
        });
    }

    function editCard() {
        projects[createIndex] = cardModel();
        emptyCreateFields();
        sortIndex();
        renderCards();
    }

    function deleteCard() {
        projects.splice(createIndex, 1);
        emptyCreateFields();
        sortIndex();
        renderCards();
    }

    function cardModel() {
        const card = {
            title: createTitle.value,
            due_date:
                createDueDate.value == '' ? dayjs().format('DD MMM YYYY') : createDueDate.value,
            bookmark: createBookmark.classList.contains('bookmarked'),
            color: createColor.value,
            tasks: tasksModel(),
            note: createNote.value,
        };
        return card;
    }

    function tasksModel() {
        const taskFields = _$('.task-field');
        const tasks = [];
        taskFields.forEach((taskField) => {
            const taskInput = taskField.querySelector('.add-project-task');
            const taskName = taskInput.value;
            const isPriority = taskField
                .querySelector('.prioritize-project-task')
                .classList.contains('prioritized');
            const task = {
                name: taskName,
                priority: isPriority,
            };
            tasks.push(task);
        });
        return tasks;
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
        const minCard = 5;
        const projectsGrid = $('.projects');
        if (length < minCard) {
            for (let i = 0; i < minCard - length; i++) {
                projectsGrid.insertAdjacentHTML('beforeend', emptyCard);
            }
        }
    }

    function addTaskField(name, priority) {
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

    return {
        editCard: editCard,
        deleteCard: deleteCard,
        setCreateType: setCreateType,
        addTaskField: addTaskField,
        renderCards: renderCards,
        emptyCreateFields: emptyCreateFields,
    };
}
