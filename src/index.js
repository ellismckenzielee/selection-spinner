import { calculateAngle, calculateEndCoords } from './utils/arcs.js';  // eslint-disable-line

const spinner = document.getElementById('spinner');
const spinnerCenter = document.getElementById('spinner-center');

let rotation = 80;

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

const colours = [
  'green',
  'red',
  'pink',
  'yellow',
  'purple',
  'blue',
  'white',
];

const numOfSegments = 3;

const addSegments = (angle, coord) => {
  for (let segNum = 0; segNum <= numOfSegments; segNum += 1) {
    const segment = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('d', `M 50,50 L 50,5 A45,45 1 0,1 ${coord.x},${coord.y} z`);
    segment.appendChild(path);
    segment.setAttribute('id', 'segment');
    segment.setAttribute('viewBox', '0 0 100 100');
    segment.style.transform = `rotate(${angle * segNum}deg)`;
    segment.style.fill = colours[segNum];
    spinner.appendChild(segment);
  }
};

const angle = calculateAngle(numOfSegments);
const endCoord = calculateEndCoords(angle);
addSegments(angle, endCoord);
