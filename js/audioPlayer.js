export const playItems = document.querySelectorAll('.play-item');
const buttonsPlay = document.querySelectorAll('.play-item button');
export const btnPlay = document.querySelector('.play');
export const btnNext = document.querySelector('.play-next');
export const btnPrev = document.querySelector('.play-prev');
export const btnSound = document.querySelector('.sound');
export const soundRange = document.querySelector('.sound-range');
export const progress = document.querySelector('.progress');
const currentTime = document.querySelector('.current-time');
const totalTime = document.querySelector('.total-time');
let isPlay = false;
let playNum = 0;
let timeCurrent = 0;
export const audio = new Audio();

const playList = [
  {      
    title: 'Aqua Caelestis',
    src: './assets/audio/Aqua Caelestis.mp3',
    duration: '01:53'
  },  {      
    title: 'River Flows In You',
    src: './assets/audio/River Flows In You.mp3',
    duration: '02:52'
  },
  {      
    title: 'Summer Wind',
    src: './assets/audio/Summer Wind.mp3',
    duration: '02:57'
  },
  {      
    title: 'Ennio Morricone',
    src: './assets/audio/Ennio Morricone.mp3',
    duration: '05:02'
  }
]

function playAudio() {
  audio.src = playList[playNum].src;
  audio.currentTime = timeCurrent;
  audio.play();
}

function removeClass() {
  btnPlay.classList.remove('pause');
  buttonsPlay[playNum].classList.remove('pause');
}

function addClass() {
  btnPlay.classList.add('pause');
  buttonsPlay[playNum].classList.add('pause');
}

export function toggleBtn() {
  if(!isPlay) {
    addClass();
    playAudio();
    isPlay = true;
  } else {
    removeClass();
    audio.pause();
    isPlay = false;
  }
}

export function playTrack(index) {
  if(index != playNum) {
    timeCurrent = 0;
  }
  playItems[playNum].classList.remove('item-active');
  playNum = index;
  toggleBtn();
  playItems[playNum].classList.add('item-active');
}

export function playNext() {
  removeClass();
  playNum++;
  if(playNum == playList.length) {
    playNum = 0;
  }
  addClass();
  isPlay = true;
  playAudio();
}

export function playPrev() {
  removeClass();
  playNum--;
  if(playNum < 0) {
    playNum = playList.length-1;
  }
  addClass();
  isPlay = true;
  playAudio();
}

export function playNextAudio() {
  audio.currentTime = 0;
  progress.value = 0;
  playItems[playNum].classList.remove('item-active');
  buttonsPlay[playNum].classList.remove('pause');
  playNum++;
  if(playNum == playList.length) {
    playNum = 0;
  }
  playItems[playNum].classList.add('item-active');
  buttonsPlay[playNum].classList.add('pause');
  audio.src = playList[playNum].src;
  audio.play();
}

export function changeVolume() {
  const value = this.value;
  this.style.background = `linear-gradient(to right, #C5B358 0%, #C5B358 ${value}%, #fff ${value}%, #fff 100%)`;
  if(value == 0) {
    toggleSound();
    audio.volume = value / 100;
  } else {
    audio.volume = value / 100;
    btnSoundActive();
    audio.muted = false;
  }
}

function btnSoundActive() {
  btnSound.classList.remove('mute');
}

export function toggleSound() {
  if(audio.muted == false) {
    btnSound.classList.add('mute');
    audio.muted = true;
  } else {
    btnSoundActive();
    audio.muted = false;
  }
}

const convertTime = function(time) {    
  let mins = Math.floor(time / 60);
  if (mins < 10) {
    mins = '0' + String(mins);
  }
  let sec = Math.floor(time % 60);
  if (sec < 10) {
    sec = '0' + String(sec);
  }
  return mins + ':' + sec;
}

export function updateAudioTime() {
  timeCurrent = audio.currentTime;
  let value = (100 / audio.duration) * audio.currentTime;
  totalTime.innerHTML = `${convertTime(audio.duration)}`;
  currentTime.innerHTML = `${convertTime(audio.currentTime)}`;
  progress.value = value;
  progress.style.background = `linear-gradient(to right, #C5B358 0%, #C5B358 ${value}%, #fff ${value}%, #fff 100%)`;
}

export function changeAudioTime() {
  const value = progress.value;
  progress.style.background = `linear-gradient(to right, #C5B358 0%, #C5B358 ${value}%, #fff ${value}%, #fff 100%)`
  let time = audio.duration * (progress.value / 100);
  audio.currentTime = time;
}
