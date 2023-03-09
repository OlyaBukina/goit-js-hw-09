import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const startBtn = document.querySelector('[data-start]');
const myInput = document.querySelector('input#datetime-picker');
const timerEl = {
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
};

startBtn.addEventListener('click', onStartBtnClick);
const defaultDate = new Date();
let finalDate = defaultDate;

function checkBtnAvailability() {
  if (finalDate <= new Date()) {
    startBtn.setAttribute('disabled', '');
  } else {
    startBtn.removeAttribute('disabled', '');
  }
}
checkBtnAvailability();

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate,
  minuteIncrement: 1,
  onChange([selectedDate]) {
    finalDate = selectedDate;
    checkBtnAvailability();
    if (finalDate <= new Date()) {
      Notify.failure('Please choose a date in the future');
    }
  },
};
flatpickr(myInput, options);

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}
function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = addLeadingZero(Math.floor(ms / day));
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );

  return { days, hours, minutes, seconds };
}

function updateTimerEl({ days, hours, minutes, seconds }) {
  timerEl.days.textContent = days;
  timerEl.hours.textContent = hours;
  timerEl.minutes.textContent = minutes;
  timerEl.seconds.textContent = seconds;
}

function onStartBtnClick() {
  const updateTimer = () => {
    const currentTime = Date.now();
    const leftTime = finalDate.getTime() - currentTime;
    if (leftTime > 0) {
      const formatTime = convertMs(leftTime);
      updateTimerEl(formatTime);
    } else {
      clearInterval(intervalId);
    }
  };
  updateTimer();
  const intervalId = setInterval(updateTimer, 1000);
}
