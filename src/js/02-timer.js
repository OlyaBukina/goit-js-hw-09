import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const startBtn = document.querySelector('[data-start]');
startBtn.setAttribute('disabled', '');
const myInput = document.querySelector('input#datetime-picker');
const timerEl = {
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
};

startBtn.addEventListener('click', onStartBtnClick);

let finalDate = null;
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    finalDate = selectedDates[0].getTime();

    if (finalDate < this.now.getTime()) {
      alert('Please choose a date in the future');
      startBtn.setAttribute('disabled', '');
    } else {
      startBtn.removeAttribute('disabled', '');
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
  const intervalId = setInterval(() => {
    const currentTime = Date.now();
    const leftTime = finalDate - currentTime;
    if (leftTime > 0) {
      const formatTime = convertMs(leftTime);
      updateTimerEl(formatTime);
    } else {
      clearInterval(intervalId);
    }
  }, 1000);
}
