import { $, _$, fieldHTML, emptyCard } from './constants';

export function delay(ms) {
    // asynchronous function to delay
    return new Promise((res) => setTimeout(res, ms));
}

export function addTaskField(name, priority) {
    let createTaskList = $('.task-lists');
    createTaskList.insertAdjacentHTML('beforeend', fieldHTML);
    const newField = $('.task-field:last-child');
    const deleteField = newField.querySelector('.delete-project-task');
    const inputField = newField.querySelector('.add-project-task');
    const priorityField = newField.querySelector('.prioritize-project-task');
    const parent = deleteField.parentNode;
    name == undefined ? '' : (inputField.value = name);
    if (priority) priorityField.classList.add('prioritized');
    deleteField.addEventListener('click', () => parent.remove());
    priorityField.addEventListener('click', () => priorityField.classList.toggle('prioritized'));
}

export function renderEmptyCard(length) {
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
