import {getRandomIndex} from './backgroundImgSlider.js';
const quote = document.querySelector('.quote');
const author = document.querySelector('.author');
export const btnChangeQuote = document.querySelector('.change-quote');
let index = 0;

export async function getQuotes(lang) {  
  const quotes = 'quotes.json';
  const res = await fetch(quotes);
  await res.json().then((data) => {
    index = getRandomIndex(0, data.length);
    lang == 'en'? quote.innerHTML = `${data[index].en.text}` : quote.innerHTML = `${data[index].ru.text}`;
    lang == 'ru'? author.innerHTML = `${data[index].ru.author}` : author.innerHTML = `${data[index].en.author}`;
  }); 
}

export async function translateQuote(lang) {
  const quotes = 'quotes.json';
  const res = await fetch(quotes);
  await res.json().then((data) => {
    lang == 'en'? quote.innerHTML = `${data[index].en.text}` : quote.innerHTML = `${data[index].ru.text}`;
    lang == 'ru'? author.innerHTML = `${data[index].ru.author}` : author.innerHTML = `${data[index].en.author}`;
  });
}