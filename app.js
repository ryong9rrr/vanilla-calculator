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
      if (store.currentOper === "=") {
        return;
      }

      if (value === "0" && (!store.first || !store.second)) {
        return;
      }

      if (!store.second && !store.currentOper && store.first.length < 3) {
        store.first += value;
      } else if (store.first && store.currentOper && store.second.length < 3) {
        store.second += value;
      }
      total.innerHTML = `${store.first}${store.currentOper}${store.second}`;
    })
  );

  operations.forEach((operation) =>
    operation.addEventListener("click", (e) => {
      const value = e.target.innerText;
      if (value === "=") {
        if (store.first && store.currentOper && store.second) {
          operateNumber();
        }
        return;
      }

      if (store.first && !store.second) {
        store.currentOper = value;
        total.innerHTML = `${store.first}${store.currentOper}`;
      }
    })
  );
}

App();
