export default (angle, choices) => {
  const normalised = Math.round((angle / 360) * (choices.length - 1));
  return choices[normalised];
};
