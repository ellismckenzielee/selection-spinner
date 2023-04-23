const spinner = document.getElementById('spinner');
const spinnerCenter = document.getElementById('spinner-center');

let rotation = 200;

const setup = () => {
  spinnerCenter.addEventListener('click', () => {
    spinner.style.transition = 'transform 5s ease-out';
    spinner.style.transitionTimingFunction = 'cubic-bezier(0,.67,.46,1.03)';
    const newRotation = rotation + 100;
    rotation = newRotation;
    spinner.style.transform = `rotate(${newRotation}deg)`;
  });
};

setup();
