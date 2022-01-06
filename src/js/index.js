import clearDisplay from "./calculator/clearDisplay.js";
import putNumber from "./calculator/putNumber.js";
import putOperation from "./calculator/putOperation.js";

const digits = document.querySelector(".digits");
const operations = document.querySelector(".operations");
const modifiers = document.querySelector(".modifiers");

function Calculator() {
  modifiers.addEventListener("click", clearDisplay);
  digits.addEventListener("click", putNumber);
  operations.addEventListener("click", putOperation);
}

new Calculator();
