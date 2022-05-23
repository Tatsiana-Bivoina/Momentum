export const inputCity = document.querySelector('#input-city');
const weatherIcon = document.querySelector('.weather-icon');
const temperature = document.querySelector('.temperature');
const weatherDescription = document.querySelector('.weather-description');
const windSpeed = document.querySelector('.wind-speed');
const humidity = document.querySelector('.humidity');
const weatherError = document.querySelector('.weather-error');
let currentLocation = '';
let location = '';

const getCity = (lang) => {
  const inputCity = document.querySelector('#input-city');
  inputCity.setAttribute('value', localStorage.getItem('city'));

  if(localStorage.hasOwnProperty('city') === false) {
    lang == 'en' ? location = 'Minsk' : location = 'Минск';
    localStorage.setItem('city', `${location}`);
    inputCity.setAttribute('value', `${location}`);
  } else if(localStorage.getItem('city') != inputCity.value) {
    localStorage.setItem('city', inputCity.value);
    inputCity.setAttribute('value', inputCity.value);
  } else {
    localStorage.setItem('city', inputCity.value);
    inputCity.setAttribute('value', inputCity.value);
  }
  currentLocation = localStorage.getItem('city');
}

export async function getWeather(lang) {  
  getCity(lang);
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${currentLocation}&lang=${lang}&appid=27e5db49ec1318a15709b132fbf036e2&units=metric`;
  const res = await fetch(url);
  await res.json().then((data) => {
    localStorage.setItem('city', data.name);
    inputCity.setAttribute('value', data.name);
    weatherError.innerText = '';
    weatherIcon.className = 'weather-icon owf';
    weatherIcon.classList.add(`owf-${data.weather[0].id}`);
    temperature.textContent = `${Math.round(data.main.temp)}°C`;
    weatherDescription.textContent = data.weather[0].description;
    windSpeed.textContent = lang == 'en' ? `Wind speed: ${Math.round(data.wind.speed)} m/s` : `Скорость ветра: ${Math.round(data.wind.speed)} м/с`;
    humidity.textContent = lang == 'en' ? `Humidity: ${data.main.humidity}%` : `Влажность: ${data.main.humidity}%`;
  }).catch(err => {
    weatherError.innerText = lang == 'en' ? `Error! city not found for '${inputCity.value}'!` : `Ошибка! Город не найден для '${inputCity.value}'!`;
    weatherIcon.className = 'weather-icon owf';
    temperature.textContent = '';
    weatherDescription.textContent = '';
    windSpeed.textContent = '';
    humidity.textContent = '';
  });
}
