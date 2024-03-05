import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";


const form = document.querySelector('.form');

const start = (event) => {
    event.preventDefault();
    const delay = event.target.elements.delay.value;
    const state = event.target.elements.state.value
    form.reset();

    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (state === 'fulfilled') {
                resolve(delay);
            } else {
                reject(delay);
            }
        }, delay);
    })
}

form.addEventListener('submit', event => {
    start(event)
    .then(value => 
            iziToast.success({
                message: `Fulfilled promise in ${value}ms`,
                position: 'topCenter',
                backgroundColor: '#59a10d',
                titleColor: '#FFFFFF',
                messageColor: '#FFFFFF',
                theme: 'dark',
            })
        )
    .catch(error =>
            iziToast.error({
                message: `Rejected promise in ${error}ms`,
                position: 'topCenter',
                backgroundColor: '#ef4040',
                titleColor: '#FFFFFF',
                messageColor: '#FFFFFF',
                theme: 'dark',
            })
        )    
});