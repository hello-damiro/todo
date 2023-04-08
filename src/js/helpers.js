export function delay(ms) {
    return new Promise((res) => setTimeout(res, ms));
}

export function taskListHTML(name, isPriority) {
    return (
        '<li><h5 class="' + isPriority + '">' + name + '</h5><div class="delete-task"></div></li>'
    );
}
