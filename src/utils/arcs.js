export const calculateAngle = (numberOfSegments) => Math.floor((360 / numberOfSegments) * 100) / 100;

export const calculateEndCoords = (angle) => {
  const radius = 45;
  const x = 50 + (radius * Math.sin(Math.PI * (angle / 180)));
  const y = 50 - (radius * Math.cos(Math.PI * (angle / 180)));
  return {
    x: Math.round(x * 100) / 100,
    y: Math.round(y * 100) / 100,
  };
};
