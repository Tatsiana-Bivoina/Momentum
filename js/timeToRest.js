export const btnRelax = document.querySelector('.button-relax');
const coverElem = document.querySelector('.cover');
const relaxSection = document.querySelector('.relax-section');
const closeIcon = document.querySelector('.close-icon');
const seaSounds = new Audio('./assets/audio/sea-sounds.mp3');
const tryAgain = document.querySelector('.try-again');
const timer = document.querySelector('.timer');
const relaxTitle = document.querySelector('.relax-title');
const note = document.querySelector('.note h4');
let secondsRemaining = 120;

export function showPageRest() {
  document.body.classList.add('lock');
  coverElem.classList.remove('hidden');
  relaxSection.classList.remove('hidden');
  relaxSection.addEventListener('mousemove', reset);
  seaSounds.play();
  displayTime();
  startTimer();
  setTimeout(setOpacity, 1500);
}

export function translatePageRest(lang) {
  if(lang == 'en') {
    btnRelax.innerHTML = 'Time to rest';
    relaxTitle.innerHTML = 'Do nothing for 2 minutes';
    tryAgain.innerHTML = 'Try again';
    note.innerHTML = `Relax and listen to the sound of the sea. Don't move your mouse.`;
  } else {
    btnRelax.innerHTML = 'Время отдыха';
    relaxTitle.innerHTML = 'Не делайте ничего в течение 2 минут';
    tryAgain.innerHTML = 'Попробуйте снова';
    note.innerHTML = `Расслабьтесь и слушайте шум моря. Не двигайте мышкой.`;
  }
}

function closeRelaxContainer() {
  secondsRemaining = 120;
  coverElem.removeEventListener('click', closeRelaxContainer);
  closeIcon.removeEventListener('click', closeRelaxContainer);
  document.body.classList.remove('lock');
  coverElem.classList.add('hidden');
  relaxSection.classList.add('hidden');
  seaSounds.pause();
}

const displayTime = () => {
  let minutes = Math.floor(secondsRemaining / 60);
  let seconds = secondsRemaining - (minutes * 60);
  if(seconds < 10) {
    seconds = "0" + seconds;
  }
  let time = minutes + ":" + seconds;
  timer.innerHTML = `${time}`;
}

const startTimer = () => {
  let relaxTimer = setTimeout(function tick() {
    secondsRemaining--;
    if(secondsRemaining < 0) {
      clearTimeout(relaxTimer);
      closeRelaxContainer();
      return;
    }
    displayTime();
    relaxTimer = setTimeout(tick, 1000);
  }, 1000);
  coverElem.addEventListener('click',() => {
    closeRelaxContainer();
    clearTimeout(relaxTimer);
  });
  closeIcon.addEventListener('click',() => {
    closeRelaxContainer();
    clearTimeout(relaxTimer);
  });
}

const reset = () => {
  secondsRemaining = 120;
  timer.animate([{ color: '#d43131' }, { color: '#07193c' }], {
    duration: 1500,
  });
  displayTime();
  setOpacity();
}

const setOpacity = () => {
  let opacity = 1;
  setTimeout(function changeOpacity() {
    if(opacity < 0) return;
    tryAgain.setAttribute('style', `opacity: ${opacity}`);
    opacity = (opacity - 0.1).toFixed(1);
    setTimeout(changeOpacity, 120);
  }, 120);
};