export const calculateAngle = (numberOfSegments) => Math.floor((360 / numberOfSegments) * 100) / 100;

export const calculateEndCoords = (angle) => {
  const radius = 45;
  const x = Math.round(radius * Math.sin(Math.PI * (angle / 180)));
  const y = Math.round(radius * Math.cos(Math.PI * (angle / 180)));
  return { x: 50 + x, y: 50 - y };
};
