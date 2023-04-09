import { colors } from './constants';

export function delay(ms) {
    // asynchronous function to delay
    return new Promise((res) => setTimeout(res, ms));
}

export function taskListHTML(name, isPriority) {
    return (
        '<li><h5 class="' + isPriority + '">' + name + '</h5><div class="delete-task"></div></li>'
    );
}

export function getColor(color) {
    if (color == '') color = 'white';
    return colors[color];
}
