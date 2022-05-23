export const btnNextImg = document.querySelector('.slide-next');
export const btnPrevImg = document.querySelector('.slide-prev');
let i = 0;
let imageSrc = '';
let timesOfDay = '';

export function getRandomIndex(min, max) {
  i = Math.floor(Math.random() * (max - min)) + min;
  return i;
}

export function loadFirstImg() {
  getRandomIndex(1, 21);
  createPath();
}

function createPath() {
  const baseUrl = 'https://raw.githubusercontent.com/Tatsiana-Bivoina/stage1-tasks/assets/images/';
  const date = new Date();
  let hours = date.getHours();
  let minutes = date.getMinutes();
  if (hours >= 6 && hours <= 11 && minutes <= 59) timesOfDay = 'morning/';
  if (hours >= 12 && hours <= 17 && minutes <= 59) timesOfDay = 'day/';
  if (hours >= 18 && hours <= 23 && minutes <= 59) timesOfDay = 'evening/';
  if (hours >= 0 && hours <= 5 && minutes <= 59) timesOfDay = 'night/';
  if(i < 10) {
    imageSrc = baseUrl + timesOfDay + '0' + i + '.jpg';
  }
  if(i >= 10 && i <= 20) {
    imageSrc = baseUrl + timesOfDay + i + '.jpg';
  }
}

export function nextImage() {
  i++;
  if (i > 20) i = 1;
  createPath();
  viewBgImage(imageSrc);
};

export function prevImage() {
  --i;
  if (i < 0) i = 20;
  createPath();
  viewBgImage(imageSrc);
};

function viewBgImage(imageSrc) {
  const img = new Image();
  img.src = imageSrc;
  img.onload = () => {
    document.body.style.backgroundImage = `url(${imageSrc})`;
  };
};