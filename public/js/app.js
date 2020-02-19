console.log('Client side');


fetch('http://localhost:3000/weather?address=India').then(response => {
    response.json().then((data) => {
        console.log(data.error);
    })
}, error => {
    error.json().then((data) => {
        console.log(data);
    })
});

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    console.log('Testing');
    fetch('http://localhost:3000/weather?address=' + search.value).then(response => {
        response.json().then((data) => {
            console.log(data.error);
        })
    }, error => {
        error.json().then((data) => {
            console.log(data);
        })
    });
})


// fetch('http://puzzle.mead.io/puzzle').then(response => {
//     response.json().then((data) => {
//         console.log(data);
//     })
// }, error => {

// });