import { $ } from "./calculator/utils.js";
import clearDisplay from "./calculator/clearDispaly.js";
import putNumber from "./calculator/putNumber.js";
import putOperater from "./calculator/putOperator.js";
import putResult from "./calculator/putResult.js";

function Calculator() {
  $(".modifiers").addEventListener("click", clearDisplay);
  $(".digits").addEventListener("click", putNumber);
  $(".operations").addEventListener("click", putOperater);
  $(".equal").addEventListener("click", putResult);
}

Calculator();
