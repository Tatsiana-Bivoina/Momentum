export const language = document.querySelector('.language');

export const addClassActive = (event) => {
  const active = document.querySelector('.language button.active');
  if (!event.target.classList.contains('active')) {
    active.classList.remove('active');
    event.target.classList.add('active');
  }
};