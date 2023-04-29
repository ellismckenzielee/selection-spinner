import { calculateAngle, calculateEndCoords } from './utils/arcs.js';  // eslint-disable-line

const spinner = document.getElementById('spinner');
const spinnerCenter = document.getElementById('spinner-center');

let rotation = 80;

const setup = () => {
  spinnerCenter.addEventListener('click', () => {
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
  'seagreen',
  'lightgray',
];

const numOfSegments = 7;

const addSegments = (angle, coord) => {
  for (let segNum = 0; segNum < numOfSegments; segNum += 1) {
    const segment = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    path.setAttribute('d', `M 50,50 L 50,5 A45,45 1 0,1 ${coord.x},${coord.y} z`);
    text.setAttribute('x', '10');
    text.setAttribute('y', '70');
    text.style.transform = `rotate(-${angle}deg)`;
    text.textContent = segNum;
    text.setAttribute('id', 'segment-text');
    segment.appendChild(path);
    segment.appendChild(text);
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
