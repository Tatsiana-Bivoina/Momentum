import {toggleBtn, playNext, playPrev, playNextAudio, audio, btnPlay, btnNext, btnPrev, playTrack, playItems, changeVolume, soundRange, btnSound, toggleSound, updateAudioTime, changeAudioTime, progress} from './audioPlayer.js';
import {inputCity, getWeather} from './weather.js';
import {timerId, deleteTimeout} from './timeAndDate.js';
import {name, setLocalStorage, getLocalStorage, showGreeting} from './greeting.js';
import {btnNextImg, btnPrevImg, nextImage, prevImage, loadFirstImg} from './backgroundImgSlider.js';
import {getQuotes, btnChangeQuote, translateQuote} from './dayQuote.js';
import {language, addClassActive} from './language.js';
import {btnRelax, showPageRest, translatePageRest} from './timeToRest.js';

let lang = 'en';

window.onload = () => {
  loadFirstImg();
  getWeather(lang);
  timerId(lang);
  getLocalStorage();
  getQuotes(lang);
  translatePageRest(lang);
};

// Audio Player
playItems.forEach((el, index) => {
  el.addEventListener('click', () => {
    playTrack(index);
  });
});
btnPlay.addEventListener('click', toggleBtn);
btnPrev.addEventListener('click', playPrev);
btnNext.addEventListener('click', playNext);
audio.addEventListener('timeupdate', updateAudioTime);
audio.addEventListener('ended', playNextAudio);
soundRange.addEventListener('input', changeVolume);
progress.addEventListener("input", changeAudioTime);
btnSound.addEventListener('click', toggleSound);

// Weather widget
inputCity.addEventListener('change', () => {
  getWeather(lang);
});

// Greeting
name.addEventListener('input', setLocalStorage);

// Background Slider
btnNextImg.addEventListener('click', nextImage);
btnPrevImg.addEventListener('click', prevImage)

// DayQuotes
btnChangeQuote.addEventListener('click', () => {
  getQuotes(lang);
});

// Language
language.addEventListener('click', (event) => {
  if (event.target.classList[0] == 'english') {
    addClassActive(event);
    lang = 'en';
  }
  if (event.target.classList[0] == 'russian') {
    addClassActive(event);
    lang = 'ru';
  }
  addClassActive(event);
  getWeather(lang);
  deleteTimeout();
  timerId(lang);
  translateQuote(lang);
  translatePageRest(lang)
});

// Time to rest
btnRelax.addEventListener('click', showPageRest);

console.log('???????? ???????????? - 127 ????????????');
console.log('???? ??????????????????????/???? ?????????????????????? ????????????: 1) ?????????????????????? ?????????????????? ????????????????????, ?????? ???????????????????????? ?????????? ???????????????????? ?? ????????????????????, ???????? ???????????????? ???????? ???????????????? 2) ?? ???????????????? ?????????????????? ?????????????????????? ?????????? ???????????????????????????? Unsplash API 3) ?? ???????????????? ?????????????????? ?????????????????????? ?????????? ???????????????????????????? Flickr API 4) ?? ???????????????????? ???????????????????? ?????????? ?????????????? ???????? ???????????????????? (en/ru ?????? en/be)  5) ?? ???????????????????? ???????????????????? ?????????? ?????????????? ???????????????? ?????????????????? ???????? ?????? ???????????????? ??????????????????????: ?????????????????? ?????????????????????? GitHub, Unsplash API, Flickr API 6) ???????? ???????????????????? ?????????????????? ???????? ???????????? API, ?? ???????????????????? ???????????????????? ?????????? ?????????????? ??????/????????, ?????? ?????????????? API ?????????? ?????????????????? ???????? 7) ?? ???????????????????? ???????????????????? ?????????? ????????????/???????????????????? ?????????? ???? ????????????, ?????????????? ?????????????????? ???? ????????????????: ??????????, ????????, ??????????????????????, ???????????? ??????, ?????????????? ????????????, ????????????????????, ???????????? ??????/???????????? ????????????/?????? ?????????????????????? ???????????????????????????? ???????????????????? 8) ?????????????? ?? ?????????????????????? ???????????? ???????????????????? ????????????, ???? ?????????? ???? ???????????? ????????????????, ?????????????? ?????????????????? ???? ????????????????, ?????? ???????????? ???????????? ???? 9) ?????????????????? ???????????????????? ?????????????????????? ?????? ???????????????????????? ????????????????');
console.log('?????????????????????? ????????????: 1) ?????????? ?????????????????? ?? 24-?????????????? ??????????????, ????????????????: 21:01:00 2) ?????????? ?????????????????????? ???????????? ?????????????? - ???????? ????????. ?????????? ???????????????? ???????? ???? ????????, ?????????????????? ?????? ???????? ???? ???????????? ???????? ?????????????????? ???? ???????????????? (?????????? ???? ??????????????????) 3) ?????????????????? ???????? ????????????, ??????????, ??????????, ????????????????: "??????????????????????, 16 ??????" / "Sunday, May 16" / "??????????????, 16 ????????????" 4) ?????????? ?????????????????????? ???????????????? ?? ?????????????????????? ???? ?????????????? ?????????? (????????, ????????, ??????????, ????????). ?????????????????????? ???????????????????????? ?????????????????????? ???????????????? ?????????????? ?????????? 5) ???????????????????????? ?????????? ???????????? ???????? ??????. ?????? ???????????????????????? ???????????????? ???????????????????? ?????? ???????????????????????? ?????????????????????? 6) ???????????? ???? ?????????????? ?????????????????????? ?????????????????????? ?? ???????????? ?????????????? ?????????? ?? ???????????????????? ???????????? ?????????????????????? (???? 01 ???? 20). ??????????????????, ?????? ?????? ???????????????????????? ???????????????? ?????????????? ?????????????????????? ????????????????????. ???????? ???? ????????????????????, ?????????????????????????? ???????????????? ?????? ?????? 7) ?????????????????????? ?????????? ?????????????????????????? ?????????????? ???? ????????????????, ?????????????????????????? ???? ?????????? ????????????.?????????????????????? ?????????????????????????????? ?????????????????????????????? - ?????????? 18 ?????????????????????? ???????? 19 (???????? ???? ???????????? ??????????????), ?????????? 18 ???????????????????????? ???????? 17 (???????? ???? ?????????? ??????????????) 8) ?????????????????????? ?????????????????????????????? ???? ??????????: ?????????? ???????????????????? ?????????????????????? ???????? ???????????? (???????? ???? ???????????? ??????????????), ?????????? 1 ???????????????????????? ???????? 20 (???????? ???? ?????????? ??????????????) 9) ?????? ?????????? ?????????????? ?????????? ???????????????????? ?????????????? ?????????? ?????????????? ??????????????????????. ???? ???????????? ???????? ??????????????????, ?????????? ???????????????????????? ?????????? ???????????????? ?????????????????????????? ?????????????????????? ?????? ???????????????? ?????? ???????????????? ??????????????????????. ?????????????? ?????????? ?????????????? ?????????????????????? ???? ??????????????????: 1) ?????? ???????????????? ?? ???????????????????????? ???????????????? 2) ?????? ???????????????? ?????????????? ???????????????? 3) ?????? ?????????????? ???????????? ???????????? ???? ???????????????? ?????? ?????????? ?????????????????????? 10) ?????? ???????????????????????? ???????????????? ???????????????????? ?????????????????? ?????????????????????????? ?????????? ??????????????????????, ???????????? ?? ?????? ???????????????? ?? local storage 11) ?????? ???????????????????? ?????????????????????????? ?????????????????????? ???????????? ?????????????????? ???????????? ?? ????????????, ???????? ???? ???????????????????? API. ???????????? ?? ???????????? ???????????????? ?? ????????: ???????????? ????????????, ???????????????? ????????????, ?????????????????????? ?? ??C, ???????????????? ?????????? ?? ??/??, ?????????????????????????? ?????????????????? ?????????????? ?? %. ???????????????? ?????????????????? ???????????? ?????????????????????? ???? ?????????? ?????????? 12) ?????????????????? ?????????????????????? ???? ???????????? ?????? ?????????? ???????????????????????? ????????????????, ?????? ?????????????? API ???? ???????????????????? ???????????? (???????????? ???????????? ?????? ?????????????????????????? ?????????? ????????????????) 13) ?????? ???????????????? ???????????????? ???????????????????? ???????????????????????? ?????????????????? ???????????? ?? ???? ?????????? 14) ?????? ???????????????????????? ???????????????? ???????????? ?????????????????????? (???????????????????? ???? ????????????). ???????? ????????????, ?????? ?????????? ???? ?????????????? ???????????? ?????????????????????? (???????????????????? ???? ????????????) 15) ?????? ?????????? ???? ???????????? Play/Pause ?????????????????????????? ???????????? ???????? ???? ?????????? play-list, ???????????? ???????????? ???????????????? ???? Pause 16) ?????? ?????????? ???? ???????????? Play/Pause ???? ?????????? ???????????????????????? ??????????, ?????????????????????????????? ???????????????????????? ??????????, ???????????? ???????????? ???????????????? ???? Play 17) ?????????? ???????????????????????????? ???? ?????????? - ?????????? ???????????????????? ???????? ???????????? (???????? ???? ???????????? Play-next), ?????????? ???????????? - ?????????????????? (???????? ???? ???????????? Play-prev) 18) ????????, ?????????????? ?? ???????????? ???????????? ??????????????????????????, ?? ?????????? Play-list ???????????????????? ???????????? 19) ?????????? ?????????????????? ???????????????????????? ?????????????? ??????????, ?????????????????????????? ?????????????????????? ???????????????????????? ????????????????????. ?????????? ?????????????????????????? ???? ??????????: ?????????? ???????????????????? ?????????? ?????????????????????????? ????????????. 20) ???????????????? ????????????????-?????? ?? ?????????????? ???????????????????????? ???????????????? ???????????????????????? 21) ?????? ?????????????????????? ???????????????? ????????????????-???????? ???????????????? ?????????????? ?????????? ?????????????????????????????? ?????????? 22) ?????? ????????????????-?????????? ???????????????????????? ???????????????? ?????????? 23) ???????????????????????? ?????????????? ?? ?????????? ?????????? ?????????????????????????????? ?????????? 24) ???????? ???????????? ?????????? ?????? ?????????? ???? ?????????????? ?????????? ????????????????/?????????????????? ???????? 25) ???????????????? ?????????????????? ??????????????????, ?????? ?????????????????????? ???????????????? ???????????????????? ?????????????????? ???????????????? ?????????????????? ???????????????????????? ?????????? 26) ?????????? ?????????????????? ?? ???????????????????? ???????????????????????? ?????????? ???????????? ???? ???????????? Play/Pause ?????????? ?? ?????? ?? ?????????????????? 27) ?????????????????????? ???????? ?? ???????????????? ???????????? ?????????????????????? ???????? 28) ?????????????????????? ?????????????????????? ?? placeholder 29) ?????????????????????? ?????????????? ???????????? ?? ??.?? ???????????????? ???????????? ?? ?????????? ???? ?????????????????? 30) ?????????????????????? ???????????? ?????? ??.?? ???????????? ???????????????????????? ???? ?????????????? ?????????? ????????????????????. ???????? ???????????? ?????????? ???????? ???????????? 31) ToDo List - ???????????? ?????? (?????? ?? ???????????????????????? ????????????????????) ?????? ???????????? ???????????? (?????? ?? ???????????????????????? ????????????????????) ?????? ???????? ?????????????????????? ???????????????????????????? ????????????????????, ???? ?????????????????? ?????????????????????? ????????????????????????');
