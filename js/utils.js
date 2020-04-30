function generateArray(length, min, max) {
  var array = [];

  for (var i = 0; i < length; i++) {
    array.push(randomIntFromInterval(min, max));
  }

  return array;
}

// From https://stackoverflow.com/questions/4959975/generate-random-number-between-two-numbers-in-javascript
function randomIntFromInterval(min, max) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
