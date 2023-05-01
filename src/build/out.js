(() => {
  // src/utils/arcs.js
  var calculateAngle = (numberOfSegments) => Math.floor(360 / numberOfSegments * 100) / 100;
  var calculateEndCoords = (angle2) => {
    const radius = 45;
    const x = 50 + radius * Math.sin(Math.PI * (angle2 / 180));
    const y = 50 - radius * Math.cos(Math.PI * (angle2 / 180));
    return {
      x: Math.round(x * 100) / 100,
      y: Math.round(y * 100) / 100
    };
  };

  // src/utils/logic.js
  var logic_default = (angle2, choices) => {
    const normalised = Math.floor(angle2 % 360 / 360 * choices.length);
    console.log(angle2, choices, normalised);
    return choices[normalised];
  };

  // src/index.js
  var spinner = document.getElementById("spinner");
  var spinnerCenter = document.getElementById("spinner-center");
  var numOfSegments = 2;
  var options = [
    "Ellis",
    "Corey",
    "Waldo",
    "Pip",
    "Polar",
    "Skye"
  ].slice(0, numOfSegments);
  var currentAngle = 0;
  var currentSelection = logic_default(currentAngle, options);
  console.log(currentAngle, currentSelection);
  var setup = () => {
    spinnerCenter.addEventListener("click", () => {
      const rotation = Math.random() * 1e3;
      currentAngle -= rotation;
      const winner = logic_default(Math.abs(currentAngle), options);
      console.log(currentAngle, winner);
      spinner.style.transform = `rotate(${currentAngle}deg)`;
    });
  };
  setup();
  var colours = [
    "green",
    "red",
    "pink",
    "yellow",
    "purple",
    "blue",
    "white",
    "seagreen",
    "lightgray"
  ];
  var addSegments = (angle2, coord) => {
    for (let segNum = 0; segNum < numOfSegments; segNum += 1) {
      const segment = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
      const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
      path.setAttribute("d", `M 50,50 L 50,5 A45,45 1 0,1 ${coord.x},${coord.y} z`);
      text.setAttribute("x", "48");
      text.setAttribute("y", "25");
      text.style.transform = `rotate(${-90}deg)`;
      text.textContent = options[segNum];
      text.setAttribute("id", "segment-text");
      segment.appendChild(path);
      segment.appendChild(text);
      segment.setAttribute("id", "segment");
      segment.setAttribute("viewBox", "0 0 100 100");
      segment.style.transform = `rotate(${90 + angle2 * segNum}deg)`;
      segment.style.fill = colours[segNum];
      spinner.appendChild(segment);
    }
  };
  var angle = calculateAngle(numOfSegments);
  console.log(angle);
  var endCoord = calculateEndCoords(angle);
  addSegments(angle, endCoord);
})();
