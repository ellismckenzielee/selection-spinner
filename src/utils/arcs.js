const calculateAngle = (numberOfSegments) => Math.floor((360 / numberOfSegments) * 100) / 100;

const calculateEndCoords = () => ({ x: 0, y: 0 });
module.exports = {
  calculateAngle,
  calculateEndCoords,
};
