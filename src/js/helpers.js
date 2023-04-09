import { $, _$, colors, fieldHTML } from './constants';

export function delay(ms) {
    // asynchronous function to delay
    return new Promise((res) => setTimeout(res, ms));
}

export function addTaskField() {
    let createTaskList = $('.task-lists');
    createTaskList.insertAdjacentHTML('beforeend', fieldHTML);
    const newField = $('.task-field:last-child');
    const deleteField = newField.querySelector('.delete-project-task');
    const prioritizeField = newField.querySelector('.prioritize-project-task');
    const parent = deleteField.parentNode;
    deleteField.addEventListener('click', () => parent.remove());
    prioritizeField.addEventListener('click', () =>
        prioritizeField.classList.toggle('prioritized')
    );
}

// DELETE THIS
export function taskListHTML(name, isPriority) {
    return (
        '<li><h5 class="' + isPriority + '">' + name + '</h5><div class="delete-task"></div></li>'
    );
}
