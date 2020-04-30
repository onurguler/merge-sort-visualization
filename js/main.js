let NUMBER_OF_ARRAY_BARS = 30;
const MINIMUM_ARRAY_VALUE = 5;
const MAXIMUM_ARRAY_VALUE = 300;

// Change this value for the speed of the animations.
let ANIMATION_SPEED_MS = 50;

// This is the main color of the array bars.
const PRIMARY_COLOR = "#0694a2";

// This is the color of array bars that are being compared throughout the animations.
const SECONDARY_COLOR = "#e02424";

let array = generateArray(NUMBER_OF_ARRAY_BARS, MINIMUM_ARRAY_VALUE, MAXIMUM_ARRAY_VALUE);
let unsorted_array = array.slice();

let running = false;
let stopped = false;

const startButton = document.getElementById("start-button");
const resumeButton = document.getElementById("resume-button");
const pauseButton = document.getElementById("pause-button");
const stopButton = document.getElementById("stop-button");

const arrayLengthContainer = document.getElementById("array-length-container");
const arrayLengthInput = document.getElementById("array-length-input");
arrayLengthInput.value = NUMBER_OF_ARRAY_BARS;

const animationSpeedInput = document.getElementById("animation-speed-input");
ANIMATION_SPEED_MS = animationSpeedInput.value;

startButton.addEventListener("click", function () {
  running = true;
  stopped = false;
  startButton.classList.add("hidden");
  arrayLengthContainer.classList.add("hidden");
  pauseButton.classList.remove("hidden");
  stopButton.classList.remove("hidden");
  array = unsorted_array.slice();
  initArrayBars();
  mergeSort();
});

pauseButton.addEventListener("click", function () {
  running = false;
  pauseButton.classList.add("hidden");
  resumeButton.classList.remove("hidden");
});

resumeButton.addEventListener("click", function () {
  running = true;
  resumeButton.classList.add("hidden");
  pauseButton.classList.remove("hidden");
});

stopButton.addEventListener("click", function () {
  stopped = true;
  array = unsorted_array.slice();

  if (!pauseButton.classList.contains("hidden")) {
    pauseButton.classList.add("hidden");
  }

  if (!resumeButton.classList.contains("hidden")) {
    resumeButton.classList.add("hidden");
  }

  startButton.classList.remove("hidden");
  stopButton.classList.add("hidden");

  arrayLengthContainer.classList.remove("hidden");

  initArrayBars();
});

arrayLengthInput.addEventListener("change", function (e) {
  let value = e.target.value;
  console.log(value)
  NUMBER_OF_ARRAY_BARS = value;
  array = generateArray(NUMBER_OF_ARRAY_BARS, MINIMUM_ARRAY_VALUE, MAXIMUM_ARRAY_VALUE);
  unsorted_array = array.slice();
  initArrayBars();
});

animationSpeedInput.addEventListener("change", function (e) {
  ANIMATION_SPEED_MS = 100 - e.target.value;
});

function initArrayBars() {
  let arrayContainer = document.getElementsByClassName("array-container")[0];
  arrayContainer.innerHTML = "";

  for (let i = 0; i < array.length; i++) {
    let arrayBar = document.createElement("div");

    arrayBar.className = "array-bar mx-px inline-block bg-indigo-500";
    arrayBar.id = `array-bar-${array[i]}`;
    arrayBar.style.height = `${array[i]}px`;
    arrayBar.style.width = (768 / array.length).toString() + "px";
    arrayContainer.appendChild(arrayBar);
  }
}

async function mergeSort() {
  const animations = getMergeSortAnimations(array);

  let i = 0;

  while (i < animations.length) {
    if (stopped) {
      break;
    }

    if (!running) {
      await sleep(ANIMATION_SPEED_MS);
      continue;
    }

    const arrayBars = document.getElementsByClassName("array-bar");
    const isColorChange = i % 3 !== 2;

    if (isColorChange) {
      const [barOneIdx, barTwoIdx] = animations[i];

      const barOneStyle = arrayBars[barOneIdx].style;
      const barTwoStyle = arrayBars[barTwoIdx].style;

      const color = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;

      barOneStyle.backgroundColor = color;
      barTwoStyle.backgroundColor = color;

      await sleep(ANIMATION_SPEED_MS);
    } else {
      const [barOneIdx, newHeight] = animations[i];
      const barOneStyle = arrayBars[barOneIdx].style;
      barOneStyle.height = `${newHeight}px`;

      await sleep(ANIMATION_SPEED_MS);
    }

    i++;
  }

  startButton.classList.remove("hidden");

  if (!pauseButton.classList.contains("hidden")) {
    pauseButton.classList.add("hidden");
  }

  if (!resumeButton.classList.contains("hidden")) {
    pauseButton.classList.add("hidden");
  }

  if (!stopButton.classList.contains("hidden")) {
    stopButton.classList.add("hidden");
  }

  arrayLengthContainer.classList.remove("hidden");
}

initArrayBars();
