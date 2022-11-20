const getRandomId = (min = 0, max = 1000) => Math.floor(Math.random() * (max - min) + min);

module.exports = {
  getRandomId,
};
