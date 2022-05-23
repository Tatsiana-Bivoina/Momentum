const greeting = document.querySelector('.greeting');
export const name = document.querySelector('.name');
export let timeOfDay = '';
let hours = null;
let minutes = null;
let greetingTranslation = {
  'morning': {
    'ru': 'Доброе утро',
    'en': 'Good morning',
  },
  'afternoon': {
    'ru': 'Добрый день',
    'en': 'Good afternoon',
  },
  'evening': {
    'ru': 'Добрый вечер',
    'en': 'Good evening',
  },
  'night': {
    'ru': 'Доброй ночи',
    'en': 'Good night',
  }
}

function getTime() {
  const date = new Date();
  hours = date.getHours();
  minutes = date.getMinutes();
}

export function getTimeOfDay() {
  getTime();
  if (hours >= 6 && hours <= 11 && minutes <= 59) timeOfDay = 'morning';
  if (hours >= 12 && hours <= 17 && minutes <= 59) timeOfDay = 'afternoon';
  if (hours >= 18 && hours <= 23 && minutes <= 59) timeOfDay = 'evening';
  if (hours >= 0 && hours <= 5 && minutes <= 59) timeOfDay = 'night';
}

export function showGreeting(lang) {
  getTimeOfDay();
  greeting.innerHTML = greetingTranslation[timeOfDay][lang];
  lang == 'en' ? name.setAttribute('placeholder', '[Enter your name]') : name.setAttribute('placeholder', '[Введите ваше имя]');
}

export function setLocalStorage() {
  if(name.value != '') {
    localStorage.setItem('name', name.value);
  }
}

export function getLocalStorage() {
  if(localStorage.getItem('name')) {
    name.value = localStorage.getItem('name');
  }
}