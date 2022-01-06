import { DISPLAY, MAX_NUMBER_LENGTH } from "./utils.js";

// 계산함수
function operateNumber(a, b, oper) {
  const operate = {
    ["+"]: (a, b) => a + b,
    ["-"]: (a, b) => a - b,
    ["X"]: (a, b) => a * b,
    ["/"]: (a, b) => Math.floor(a / b),
  };
  return operate[oper](a, b);
}

export default function putOperation({ target }) {
  const value = target.innerText;
  if (value !== "=" && isNaN(DISPLAY.innerText[0])) {
    return alert("자연수 끼리의 사칙연산만 가능해요.");
  }

  if (DISPLAY.innerText === "0") {
    return alert("자연수 끼리의 사칙연산만 가능해요.");
  }

  const equalValid = /\d+[\+|\-|X|\/]\d+/g.test(DISPLAY.innerText);
  // 식이 완성되었는데 또 연산자를 누르는 경우
  if (equalValid) {
    if (value === "+" || value === "-" || value === "X" || value === "/") {
      return alert("두 개의 숫자만 연산이 가능합니다!");
    }
  }
  // 식이 완성되지 않았는데 =를 누르는 경우
  if (value === "=") {
    if (
      DISPLAY.innerText[DISPLAY.innerText.length - 1] === "+" ||
      DISPLAY.innerText[DISPLAY.innerText.length - 1] === "-" ||
      DISPLAY.innerText[DISPLAY.innerText.length - 1] === "X" ||
      DISPLAY.innerText[DISPLAY.innerText.length - 1] === "/"
    ) {
      return alert("올바른 식을 입력해주세요.");
    }
    const oper = /[\+|\-|X|\/]/g.exec(DISPLAY.innerText);
    // 한자리숫자라면 아무것도 하지 않음
    if (!oper) {
      return;
    }
    const [a, b] = DISPLAY.innerText.split(oper);
    const result = operateNumber(Number(a), Number(b), oper);
    DISPLAY.innerText = result;
    return;
  }

  // 의도적으로 3자리수가 넘어가는 숫자를 만들고 연산을 하려는 경우
  if (value !== "=" && DISPLAY.innerText.length > MAX_NUMBER_LENGTH) {
    return alert("3자리 수 까지 입력가능해요.");
  }

  // 연산자를 눌렀는데 연산자를 또 누르는 경우, 연산자 체인지
  if (
    DISPLAY.innerText[DISPLAY.innerText.length - 1] === "+" ||
    DISPLAY.innerText[DISPLAY.innerText.length - 1] === "-" ||
    DISPLAY.innerText[DISPLAY.innerText.length - 1] === "X" ||
    DISPLAY.innerText[DISPLAY.innerText.length - 1] === "/"
  ) {
    DISPLAY.innerText = DISPLAY.innerText.slice(
      0,
      DISPLAY.innerText.length - 1
    );
  }

  DISPLAY.innerText += value;
}
