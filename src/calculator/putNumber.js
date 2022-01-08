import { DISPLAY, MAX_NUMBER_LENGTH } from "./utils.js";

// [X] 숫자는 한번에 최대 3자리 수까지 입력 가능하다.
const lengthValid = () => {
  const oper = /[\+|\-|X|\/]/g.exec(DISPLAY.textContent);
  if (!oper) return DISPLAY.textContent.length < MAX_NUMBER_LENGTH;
  const nums = DISPLAY.textContent.split(oper);
  return nums[1].length < MAX_NUMBER_LENGTH;
};

export default function putNumber({ target }) {
  // 현재 0이라면 숫자를 그냥 대입한다.
  if (DISPLAY.textContent === "0")
    return (DISPLAY.textContent = target.textContent);

  if (!lengthValid()) {
    return alert("3자리 수 까지 입력가능해요.");
  }

  if (isNaN(DISPLAY.textContent[0])) {
    return alert("자연수 끼리의 사칙연산만 가능해요.");
  }

  // 두번째 숫자에 대한 0클릭 예외처리
  if (
    target.textContent === "0" &&
    isNaN(DISPLAY.textContent[DISPLAY.textContent.length - 1])
  )
    return;

  return (DISPLAY.textContent += target.textContent);
}
