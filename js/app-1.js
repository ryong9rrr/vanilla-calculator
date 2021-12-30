/*
<Version 1.0>

기능은 모두 구현, 최대한 에러가 없도록 방지함
*/

const total = document.querySelector("#total");
const digits = document.querySelectorAll(".digit");
const operations = document.querySelectorAll(".operation");
const modifiers = document.querySelector(".modifiers");
let store = {
  total: 0,
  first: "",
  second: "",
  currentOper: "",
};

function operateNumber() {
  const a = Number(store.first);
  const op = store.currentOper;
  const b = Number(store.second);
  store.currentOper = "=";
  let result;
  if (op === "+") {
    result = a + b;
  } else if (op === "-") {
    result = a - b;
  } else if (op === "X") {
    result = a * b;
  } else if (op === "/") {
    result = Math.floor(a / b);
  }
  store.total = result;
  total.innerHTML = store.total;
}

function App() {
  // AC를 누르면 store를 초기화하고 화면에 반영한다.
  modifiers.addEventListener("click", (e) => {
    store = {
      total: 0,
      first: "",
      second: "",
      currentOper: "",
    };
    total.innerHTML = store.total;
  });

  digits.forEach((digit) =>
    digit.addEventListener("click", (e) => {
      const value = e.target.innerText;
      // 연산이 모두 완료된 상태일 때는 숫자버튼을 눌러도 변화가 없어야한다.
      if (store.currentOper === "=") {
        return;
      }
      // 0을 눌렀을 때, 현재 숫자가 아무것도 없는 상태라면 변화가 없어야 한다. 0이 000 으로 출력되는 현상이 있었음.
      if (value === "0" && (!store.first || !store.second)) {
        return;
      }
      // 첫번째 숫자를 눌렀을 때 로직
      if (!store.second && !store.currentOper && store.first.length < 3) {
        store.first += value;
        // 두번째 숫자를 눌렀을 때 로직
      } else if (store.first && store.currentOper && store.second.length < 3) {
        store.second += value;
      }
      total.innerHTML = `${store.first}${store.currentOper}${store.second}`;
    })
  );

  operations.forEach((operation) =>
    operation.addEventListener("click", (e) => {
      const value = e.target.innerText;
      // "="를 눌렀을 때, 숫자, 연산자가 모두 있다면 계산을 진행하고 그렇지 않다면 아무것도 하지 않는다.
      if (value === "=") {
        if (store.first && store.currentOper && store.second) {
          operateNumber();
        }
        return;
      }

      // 첫번째 숫자가 있고, 두번째 숫자가 없을때에만 연산자가 눌리도록 한다.
      if (store.first && !store.second) {
        store.currentOper = value;
        total.innerHTML = `${store.first}${store.currentOper}`;
      }
    })
  );
}

App();
