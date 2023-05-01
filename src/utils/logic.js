export default (angle, choices) => {
  const normalised = Math.floor(((angle % 360) / 360) * (choices.length));
  return choices[normalised];
};
