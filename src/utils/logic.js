export default (angle, choices) => {
  const normalised = Math.floor(((angle % 360) / 360) * (choices.length));
  console.log(angle, choices, normalised);
  return choices[normalised];
};
