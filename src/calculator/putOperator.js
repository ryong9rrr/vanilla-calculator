import { DISPLAY, MAX_NUMBER_LENGTH } from "./utils.js";

export default function putOperater({ target }) {
  if (target.innerText === "=") return;

  if (isNaN(DISPLAY.innerText[0]) || DISPLAY.innerText === "0") {
    return alert("자연수 끼리의 사칙연산만 가능해요.");
  }

  const equalValid = /\d+[\+|\-|X|\/]\d+/g.test(DISPLAY.innerText);
  // 식이 완성되었는데 또 연산자를 누르는 경우
  if (equalValid) return alert("두 개의 숫자만 연산이 가능합니다!");

  // 의도적으로 3자리수가 넘어가는 숫자를 만들고 연산을 하려는 경우
  if (DISPLAY.innerText.length > MAX_NUMBER_LENGTH)
    return alert("3자리 수 까지 입력가능해요.");

  // 연산자를 눌렀는데 연산자를 또 누르는 경우, 연산자 체인지
  if (isNaN(DISPLAY.innerText[DISPLAY.innerText.length - 1])) {
    DISPLAY.innerText = DISPLAY.innerText.slice(
      0,
      DISPLAY.innerText.length - 1
    );
  }

  return (DISPLAY.innerText += target.innerText);
}
