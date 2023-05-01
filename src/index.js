import { calculateAngle, calculateEndCoords } from './utils/arcs';
import getWinner from './utils/logic';

const spinner = document.getElementById('spinner');
const spinnerCenter = document.getElementById('spinner-center');

const numOfSegments = 5;

const options = [
  'Ellis',
  'Corey',
  'Waldo',
  'Pip',
  'Polar',
  'Skye',
].slice(0, numOfSegments);

let currentAngle = 0;
const currentSelection = getWinner(currentAngle, options);
console.log(currentAngle, currentSelection);

const setup = () => {
  spinnerCenter.addEventListener('click', () => {
    const rotation = 10;
    currentAngle -= rotation;
    const winner = getWinner(Math.abs(currentAngle), options);
    console.log(currentAngle, winner);
    spinner.style.transform = `rotate(${currentAngle}deg)`;
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

const addSegments = (angle, coord) => {
  for (let segNum = 0; segNum < numOfSegments; segNum += 1) {
    const segment = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    path.setAttribute('d', `M 50,50 L 50,5 A45,45 1 0,1 ${coord.x},${coord.y} z`);
    text.setAttribute('x', '48');
    text.setAttribute('y', '25');
    text.style.transform = `rotate(${-90}deg)`;
    text.textContent = options[segNum];
    text.setAttribute('id', 'segment-text');
    segment.appendChild(path);
    segment.appendChild(text);
    segment.setAttribute('id', 'segment');
    segment.setAttribute('viewBox', '0 0 100 100');
    segment.style.transform = `rotate(${90 + (angle * segNum)}deg)`;
    segment.style.fill = colours[segNum];
    spinner.appendChild(segment);
  }
};

const angle = calculateAngle(numOfSegments);
console.log(angle);
const endCoord = calculateEndCoords(angle);
addSegments(angle, endCoord);
