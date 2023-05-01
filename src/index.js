import randomColor from 'randomcolor';
import { calculateAngle, calculateEndCoords } from './utils/arcs';
import getWinner from './utils/logic';

const spinner = document.getElementById('spinner');
const spinnerCenter = document.getElementById('spinner-center');
const numOfSegments = 3;
const options = [
  { title: 'Ellis', color: randomColor() },
  { title: 'Corey', color: randomColor() },
  { title: 'Waldo', color: randomColor() },
  { title: 'Pip', color: randomColor() },
  { title: 'Polar', color: randomColor() },
].slice(0, numOfSegments);

let currentAngle = 0;

const setup = () => {
  spinnerCenter.addEventListener('click', () => {
    const rotation = Math.random() * 10000;
    currentAngle -= rotation;
    const winner = getWinner(Math.abs(currentAngle), options);
    setTimeout(() => {
      alert(winner);
    }, 5000);
    spinner.style.transform = `rotate(${currentAngle}deg)`;
  });
};

setup();

class SelectionSpinner {
  angle;

  coord;

  constructor() {
    this.segments = [];
  }

  addSegment(title) {
    const entry = {
      title,
      color: randomColor(),
    };

    this.segments.push(entry);
    this.angle = calculateAngle(this.segments.length);
    this.coord = calculateEndCoords(this.angle);
    this.redraw();
  }

  removeSegment() {
    this.angle = calculateAngle(this.numOfSegments - 1);
    this.endCoord = calculateEndCoords(this.angle);
  }

  redraw() {
    for (let segNum = 0; segNum < this.segments.length; segNum += 1) {
      const segment = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      path.setAttribute('d', `M 50,50 L 50,5 A45,45 1 0,1 ${this.coord.x},${this.coord.y} z`);
      text.style.transform = `rotate(${-90}deg)`;
      text.setAttribute('x', '48');
      text.setAttribute('y', '25');
      text.textContent = options[segNum].title;
      text.setAttribute('id', 'segment-text');
      segment.appendChild(path);
      segment.appendChild(text);
      segment.setAttribute('id', 'segment');
      segment.setAttribute('viewBox', '0 0 100 100');
      segment.style.transform = `rotate(${90 + (this.angle * segNum)}deg)`;
      segment.style.fill = this.segments[segNum].color;
      spinner.appendChild(segment);
    }
  }
}

const selectionSpinner = new SelectionSpinner();

for (let optionNum = 0; optionNum < options.length; optionNum += 1) {
  selectionSpinner.addSegment(options[optionNum].title);
}
