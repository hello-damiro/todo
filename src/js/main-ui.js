import { $, _$ } from './constants';
import dayjs from 'dayjs';

export function mainUI() {
    let createUIStatus = false;
    let logoRotation = 0;

    const grid = $('.projects');
    const cards = _$('.card');
    const logoButton = $('.logo');
    const logo = $('.logo > img');
    const curtain = $('.curtain');
    const createUI = $('.create-container').parentNode;

    const date = $('.clock');
    const currentDate = dayjs().format('DD MMM YYYY');
    (() => (date.textContent = currentDate))();

    logoButton.addEventListener('click', () => {
        toggleCreateUI();
    });
    curtain.addEventListener('click', () => toggleCreateUI());

    function toggleCreateUI() {
        logoRotation += 45;
        logo.style.transform = 'rotate(' + logoRotation + 'deg)';
        logo.style.transition = 'transform 0.3s ease-out';
        createUI.classList.toggle('hidden');
        createUIStatus ? false : true;
        window.scrollTo(0, 0);
    }
}
