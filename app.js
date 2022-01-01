// [X] AC(All Clear)버튼을 누르면 0으로 초기화 한다.
// [] 2개의 숫자에 대해 덧셈이 가능하다.
// [] 2개의 숫자에 대해 뺄셈이 가능하다.
// [] 2개의 숫자에 대해 곱셈이 가능하다.
// [] 2개의 숫자에 대해 나눗셈이 가능하다.
// [X] 숫자는 한번에 최대 3자리 수까지 입력 가능하다.
// [] 계산 결과를 표현할 때 소수점 이하는 버림한다.

const digits = document.querySelector(".digits");
const operations = document.querySelector(".operations");
const modifiers = document.querySelector(".modifiers");
const DISPLAY = document.querySelector("#total");
const MAX_NUMBER_LENGTH = 3;

// [X] AC(All Clear)버튼을 누르면 0으로 초기화 한다.
function clearNumber({ target: { value } }) {
  DISPLAY.innerText = "0";
}

function putNumber({ target }) {
  // 현재 0이라면 숫자를 그냥 대입한다.
  if (DISPLAY.innerText === "0") {
    DISPLAY.innerText = target.innerText;
    return;
  }
  // [X] 숫자는 한번에 최대 3자리 수까지 입력 가능하다.
  const nums = document
    .querySelector("#total")
    .innerText.split("+" || "-" || "X" || "/");
  if (
    nums[0].length >= MAX_NUMBER_LENGTH ||
    (nums[1] && nums[1].length >= MAX_NUMBER_LENGTH)
  ) {
    alert("3자리 수 까지 입력가능해요.");
    return;
  }
  DISPLAY.innerText += target.innerText;
}

function putOperation({ target }) {
  console.log(target);
}

function App() {
  modifiers.addEventListener("click", clearNumber);
  digits.addEventListener("click", putNumber);
  operations.addEventListener("click", putOperation);
}

App();
