const timeBlock = document.querySelector('.time');
const dateBlock = document.querySelector('.date');
import {showGreeting} from './greeting.js';
export let currentDate = null;
export let date = '';
export let time = '';
let idSettimeout = 0;

const createDate = () => {
  timeBlock.innerHTML = `${time}`;
  dateBlock.innerHTML = `${date}`;
}

export let timerId = (lang) => {
  setTimeout(function tick() {
    currentDate = new Date();
    let options = { weekday: 'long', month: 'long', day: 'numeric' };
    date = currentDate.toLocaleDateString(`${lang}`, options);
    time = currentDate.toLocaleTimeString(`${lang}`, { hour12: false });
    createDate();
    showGreeting(lang);
    idSettimeout=setTimeout(tick, 1000);
  }, 1000)
};

export function deleteTimeout() {
  clearTimeout(idSettimeout);
}