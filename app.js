// [X] AC(All Clear)버튼을 누르면 0으로 초기화 한다.
// [X] 2개의 숫자에 대해 덧셈이 가능하다.
// [X] 2개의 숫자에 대해 뺄셈이 가능하다.
// [X] 2개의 숫자에 대해 곱셈이 가능하다.
// [X] 2개의 숫자에 대해 나눗셈이 가능하다.
// [X] 숫자는 한번에 최대 3자리 수까지 입력 가능하다.
// [X] 계산 결과를 표현할 때 소수점 이하는 버림한다.

const digits = document.querySelector(".digits");
const operations = document.querySelector(".operations");
const modifiers = document.querySelector(".modifiers");
const DISPLAY = document.querySelector("#total");
const MAX_NUMBER_LENGTH = 3;

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

// [X] AC(All Clear)버튼을 누르면 0으로 초기화 한다.
function clearNumber({ target: { value } }) {
  DISPLAY.innerText = "0";
}

function putNumber({ target }) {
  if (isNaN(DISPLAY.innerText[0])) {
    return alert("자연수 끼리의 사칙연산만 가능해요.");
  }

  // 현재 0이라면 숫자를 그냥 대입한다.
  if (DISPLAY.innerText === "0") {
    DISPLAY.innerText = target.innerText;
    return;
  }

  // 두번째 숫자에 대한 0클릭 예외처리
  if (
    target.innerText === "0" &&
    isNaN(DISPLAY.innerText[DISPLAY.innerText.length - 1])
  ) {
    return;
  }

  // [X] 숫자는 한번에 최대 3자리 수까지 입력 가능하다.
  const lengthValid = () => {
    const oper = /[\+|\-|X|\/]/g.exec(DISPLAY.innerText);
    if (!oper) {
      return DISPLAY.innerText.length < MAX_NUMBER_LENGTH;
    }
    const nums = DISPLAY.innerText.split(oper);
    return nums[1].length < MAX_NUMBER_LENGTH;
  };

  if (!lengthValid()) {
    alert("3자리 수 까지 입력가능해요.");
    return;
  }
  DISPLAY.innerText += target.innerText;
}

function putOperation({ target }) {
  if (isNaN(DISPLAY.innerText[0])) {
    return alert("자연수 끼리의 사칙연산만 가능해요.");
  }

  if (DISPLAY.innerText === "0") {
    return alert("자연수 끼리의 사칙연산만 가능해요.");
  }

  const equalValid = /\d+[\+|\-|X|\/]\d+/g.test(DISPLAY.innerText);
  // 식이 완성되었는데 또 연산자를 누르는 경우
  if (equalValid) {
    if (
      target.innerText === "+" ||
      target.innerText === "-" ||
      target.innerText === "X" ||
      target.innerText === "/"
    ) {
      return alert("두 개의 숫자만 연산이 가능합니다!");
    }
  }
  // 식이 완성되지 않았는데 =를 누르는 경우
  if (target.innerText === "=") {
    if (
      DISPLAY.innerText[DISPLAY.innerText.length - 1] === "+" ||
      DISPLAY.innerText[DISPLAY.innerText.length - 1] === "-" ||
      DISPLAY.innerText[DISPLAY.innerText.length - 1] === "X" ||
      DISPLAY.innerText[DISPLAY.innerText.length - 1] === "/"
    ) {
      return alert("올바른 식을 입력해주세요.");
    }
    // 계산 진행
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
  if (
    target.innerText !== "=" &&
    DISPLAY.innerText.length > MAX_NUMBER_LENGTH + 1
  ) {
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

  DISPLAY.innerText += target.innerText;
}

function App() {
  modifiers.addEventListener("click", clearNumber);
  digits.addEventListener("click", putNumber);
  operations.addEventListener("click", putOperation);
}

App();
