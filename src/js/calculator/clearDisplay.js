import { DISPLAY } from "./utils.js";

// [X] AC(All Clear)버튼을 누르면 0으로 초기화 한다.
export default function clearDisplay({ target: { value } }) {
  DISPLAY.innerText = "0";
}
