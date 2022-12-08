const getRandomId = (min = 0, max = 1000) => Math.floor(Math.random() * (max - min) + min);

const getCustomErrorMessage = (errorMessage) => {
  console.log(errorMessage);
  const arr = errorMessage.split(":");
  return arr[arr.length - 1];
};

module.exports = {
  getRandomId,
  getCustomErrorMessage,
};
