export let $ = (selector) => document.querySelector(selector);
export let _$ = (selector) => document.querySelectorAll(selector);

export const cardHTML =
    '<div class="card new-card"><div class="bookmark"></div><div class="details"><h3 class="title"></h3><h4 class="due-date"></h4><h4 class="description">Tasks</h4><ul class="tasks"></ul><h4 class="description">Note</h4><p class="note"></p></div><div class="settings"><div class="edit"></div><div class="delete-project"></div></div></div>';

export const fieldHTML =
    '<div class="task-field"><div class="delete-project-task"></div><input class="add-project-task" type="text" placeholder="Todo"><div class="prioritize-project-task">Prioritize</div></div>';

export const emptyCard = '<div class="empty-card"></div>';

export const colors = {
    white: '#E6E6E6',
    yellow: '#FEFFC1',
    blue: '#6DE5FF',
    green: '#B7F2A9',
    pink: '#FFBEDC',
};

export let PROCESS_TYPE = 'create'; // create or edit
export let PROCESS_INDEX = 9999;
