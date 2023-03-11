import { Notify } from 'notiflix/build/notiflix-notify-aio';

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

const form = document.querySelector('.form');

function onSubmitCreatePromises(e) {
  e.preventDefault();
  const firstDelay = e.currentTarget.elements.delay.value;
  const stepDelay = e.currentTarget.elements.step.value;
  const amount = e.currentTarget.elements.amount.value;

  for (let i = 0; i < amount; i++) {
    createPromise(i + 1, Number(firstDelay) + Number(stepDelay) * i)
      .then(({ position, delay }) => {
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
  }
}

form.addEventListener('submit', onSubmitCreatePromises);
