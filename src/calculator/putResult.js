import { DISPLAY } from "./utils.js";

function operateNumber(a, b, oper) {
  const operate = {
    ["+"]: (a, b) => a + b,
    ["-"]: (a, b) => a - b,
    ["X"]: (a, b) => a * b,
    ["/"]: (a, b) => Math.floor(a / b),
  };
  return operate[oper](a, b);
}

export default function putResult() {
  // 식이 완성되지 않았는데 =를 누르는 경우
  if (isNaN(DISPLAY.innerText[DISPLAY.innerText.length - 1])) {
    return alert("올바른 식을 입력해주세요.");
  }
  // 정규표현식으로 연산자 매칭
  const oper = /[\+|\-|X|\/]/g.exec(DISPLAY.innerText);
  // 한자리숫자라면 아무것도 하지 않음
  if (!oper) return;
  const [a, b] = DISPLAY.innerText.split(oper);
  return (DISPLAY.innerText = operateNumber(Number(a), Number(b), oper));
}
