console.log('JS is connected to the page!')

const spinner = document.getElementById('spinner');
const spinnerCenter = document.getElementById('spinner-center');
const numberOfSegments = 4;
let rotation = 200;
const colors = ['yellow', 'black', 'green', 'teal']
const create_segments = (spinner, numberOfSegments) => {
    const increment = 360 / numberOfSegments;
    
}


const setup = () => {
    spinnerCenter.addEventListener('click', () => {
        console.log(true)
        spinner.style.transition = 'transform 5s ease-out';
        spinner.style.transitionTimingFunction = 'cubic-bezier(0,.67,.46,1.03)';
        const newRotation = rotation + 100;
        rotation = newRotation;
        console.log(newRotation)
        spinner.style.transform = `rotate(${newRotation}deg)`;
    })
}

setup()