const refs = {
  startBtn: document.querySelector('[data-start]'),
  stopBtn: document.querySelector('[data-stop]'),
};
refs.stopBtn.setAttribute('disabled', '');

let intervalId = null;
function onStartBtnClick() {
  intervalId = setInterval(() => {
    changeBodyBg();
  }, 1000);
  refs.startBtn.setAttribute('disabled', '');
  refs.stopBtn.removeAttribute('disabled');
}

function onStopBtnClick() {
  clearInterval(intervalId);
  refs.startBtn.removeAttribute('disabled');
  refs.stopBtn.setAttribute('disabled', '');
}

refs.startBtn.addEventListener('click', onStartBtnClick);
refs.stopBtn.addEventListener('click', onStopBtnClick);

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

function changeBodyBg() {
  document.body.style.backgroundColor = getRandomHexColor();
}
