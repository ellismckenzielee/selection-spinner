import randomColor from 'randomcolor';
import { calculateAngle, calculateEndCoords } from './utils/arcs';
import getWinner from './utils/logic';

class SelectionSpinner {
  angle;

  coord;

  constructor() {
    this.segments = [];
    this.spinner = document.getElementById('spinner');
    this.currentAngle = 0;
  }

  addSegment(title) {
    const entry = {
      title,
      color: randomColor(),
    };

    this.segments.push(entry);
    this.angle = calculateAngle(this.segments.length);
    this.coord = calculateEndCoords(this.angle);
    this.draw();
  }

  removeSegment(title) {
    this.segments = this.segments.filter((segment) => segment.title !== title);
    this.angle = calculateAngle(this.segments.length);
    this.coord = calculateEndCoords(this.angle);
    this.draw();
  }

  spin() {
    this.currentAngle -= Math.random() * 10000;
    const winner = getWinner(Math.abs(this.currentAngle), this.segments);
    setTimeout(() => {
      alert(winner);
    }, 5100);
    this.spinner.style.transform = `rotate(${this.currentAngle}deg)`;
  }

  draw() {
    this.spinner.innerHTML = '';
    for (let segNum = 0; segNum < this.segments.length; segNum += 1) {
      const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      path.setAttribute('d', `M 50,50 L 50,5 A45,45 1 0,1 ${this.coord.x},${this.coord.y} z`);

      const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      text.style.transform = `rotate(${-90}deg)`;
      text.setAttribute('x', '48');
      text.setAttribute('y', '25');
      text.textContent = this.segments[segNum].title;
      text.setAttribute('id', 'segment-text');

      const segment = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      segment.appendChild(path);
      segment.appendChild(text);
      segment.setAttribute('id', 'segment');
      segment.setAttribute('viewBox', '0 0 100 100');
      segment.style.transform = `rotate(${90 + (this.angle * segNum)}deg)`;
      segment.style.fill = this.segments[segNum].color;

      this.spinner.appendChild(segment);
    }
  }
}

const getTitlesFromQueryParams = () => {
  try {
    return window.location.search.split('=')[1].split(',');
  } catch {
    console.log('No segment titles in query params.');
    return [];
  }
};

const selectionSpinner = new SelectionSpinner();

const setup = () => {
  const titles = getTitlesFromQueryParams();
  if (titles.length) {
    const spinnerCenter = document.getElementById('spinner-center');
    spinnerCenter.addEventListener('click', () => {
      selectionSpinner.spin();
    });
    for (let i = 0; i < titles.length; i += 1) {
      selectionSpinner.addSegment(titles[i]);
    }
  } else {
    alert('add items to the spinner using query params');
  }
};

setup();
