import { convertMs } from "./convertMs";
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";


const dateId = document.getElementById("datetime-picker");
const startBtn = document.querySelector('[data-start]');
const daysTime = document.querySelector('[data-days]');
const hoursTime = document.querySelector('[data-hours]');
const minutesTime = document.querySelector('[data-minutes]');
const secondsTime = document.querySelector('[data-seconds]');

let userSelectedDate;
let timeDifference;
let currentDate = Date.now();
startBtn.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
    onClose(selectedDates) {
     userSelectedDate = selectedDates[0].getTime();
     console.log(userSelectedDate);
     selectionDate();
    },
};
flatpickr(dateId, options);

function selectionDate() {
    if (currentDate >= userSelectedDate) {
        iziToast.error({
        title: 'Error!',
        message: "Please choose a date in the future"
        });
    } else {
        startBtn.disabled = false;
        timeDifference = userSelectedDate - currentDate;
        updateClockFace(convertMs(timeDifference));
    }
}

function updateClockFace({days, hours, minutes, seconds}) {
    daysTime.textContent = `${days}`;
    hoursTime.textContent = `${hours}`;
    minutesTime.textContent = `${minutes}`;
    secondsTime.textContent = `${seconds}`; 
}

function timer() {
    const intervalId = setInterval(() => {
     if (timeDifference > 1000) {
        timeDifference -= 1000;
        updateClockFace(convertMs(timeDifference));
     } else {
        clearInterval(intervalId); 
     }
    }, 1000);
}

startBtn.addEventListener('click', () => {
    timer();
    startBtn.disabled = true;
    dateId.disabled = true;
});