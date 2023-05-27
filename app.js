const inputs = document.querySelectorAll("input");
const labels = document.querySelectorAll("label");
const errorMessages = document.querySelectorAll(".error-message");
const dayInput = document.querySelector("#day");
const monthInput = document.querySelector("#month");
const yearInput = document.querySelector("#year");
const btnEl = document.querySelector(".btn");
const dayText = document.querySelector(".day");
const monthText = document.querySelector(".month");
const yearText = document.querySelector(".year");
// let evenMonths = [4, 6, 9, 11];
const errorState = function () {
  inputs.forEach((input) => (input.style.borderColor = "hsl(0, 100%, 67%)"));
  labels.forEach((label) => (label.style.color = "hsl(0, 100%, 67%)"));
};
const defaultState = function () {
  inputs.forEach((input) => (input.style.borderColor = "hsl(0, 0%, 86%)"));
  labels.forEach((label) => (label.style.color = "hsl(0, 1%, 44%)"));
};

const validationErrorState = function (value, message) {
  errorState();
  errorMessages.forEach((p, index) => {
    if (index === value) {
      p.innerText = message;
      p.classList.remove("d-none");
    }
  });
};
function getAgeTimeStamp() {
  const currentDate = Date.now();
  let currentYear = new Date(currentDate).getFullYear();
  let birthDay;
  if (
    monthInput.value === "" ||
    dayInput.value === "" ||
    yearInput.value === ""
  ) {
    errorState();
    errorMessages.forEach((p) => p.classList.remove("d-none"));
    return;
  } else if (+dayInput.value > 31 || +dayInput.value < 1) {
    validationErrorState(0, "Must be a valid date");
    return;
  } else if (+monthInput.value === 2 && +dayInput.value > 29) {
    validationErrorState(0, "Must be a valid date");
    return;
  } else if (
    (+monthInput.value === 4 ||
      +monthInput.value === 6 ||
      +monthInput.value === 9 ||
      +monthInput.value === 11) &&
    +dayInput.value > 30
  ) {
    validationErrorState(0, "Must be a valid date");

    return;
  } else if (+monthInput.value > 12 || +monthInput.value < 1) {
    validationErrorState(1, "Must be a valid month");
    return;
  } else if (+yearInput.value > currentYear || +yearInput.value < 1) {
    validationErrorState(2, "Must be in the past");
  } else {
    birthDay = new Date(
      `${monthInput.value}-${dayInput.value}-${yearInput.value}`
    ).valueOf();
    defaultState();
    errorMessages.forEach((p) => p.classList.add("d-none"));
    return currentDate - birthDay;
  }
}

function displayDate() {
  let age = getAgeTimeStamp();
  if (age === undefined) {
    return;
  } else {
    let seconds = Math.floor(age / 1000);
    let year = Math.floor(seconds / (3600 * 24 * 365));
    let month = Math.floor(
      (seconds % (3600 * 24 * 365)) / ((3600 * 24 * 365) / 12)
    );
    let day = Math.floor(((seconds % 31536000) % 2628000) / 86400);
    animateValue(year, yearText);
    animateValue(month, monthText);
    animateValue(day, dayText);
  }
}

function onInput() {
  yearText.innerText = "- -";
  monthText.innerText = "- -";
  dayText.innerText = "- -";
}

function animateValue(value, element) {
  let counts = setInterval(updated, 100);
  let upto = 0;
  function updated() {
    if (upto === value) {
      clearInterval(counts);
      if (value === 0) {
        element.innerText = 0;
      }
    } else {
      element.innerText = ++upto;
    }
  }
}

btnEl.addEventListener("click", displayDate);
inputs.forEach((input) => input.addEventListener("click", onInput));
