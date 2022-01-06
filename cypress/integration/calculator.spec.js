const clickAllOperationsCheck = (checkFn) => {
  return ["+", "-", "X", "/"].map((oper) => {
    cy.get(".operation").contains(oper).click();
    checkFn();
  });
};

const clickAllNumbersCheck = (checkFn) => {
  const numbers = [];
  for (let i = 0; i < 10; i++) {
    numbers.push(i);
  }
  return numbers.map((number) => {
    cy.get(".digit").contains(`${number}`).click();
    checkFn();
  });
};

const clickEqual = () => cy.get(".equal").click();
const clickClear = () => cy.get(".modifier").click();

describe("계산기 앱 테스트", () => {
  beforeEach(() => {
    cy.visit("http://127.0.0.1:5500/index.html");
  });

  it("2개의 숫자에 대해 덧셈이 가능하다.", () => {
    cy.get(".digit").contains("5").click();
    cy.get(".operation").contains("+").click();
    cy.get(".digit").contains("3").click();
    clickEqual();
    //cy.get("#total").invoke("text").should("eq", "8");
    cy.get("#total").should("have.text", "8");
  });

  it("2개의 숫자에 대해 뺄셈이 가능하다.", () => {
    cy.get(".digit").contains("5").click();
    cy.get(".operation").contains("-").click();
    cy.get(".digit").contains("3").click();
    clickEqual();
    //cy.get("#total").invoke("text").should("eq", "8");
    cy.get("#total").should("have.text", "2");
  });

  it("2개의 숫자에 대해 곱셈이 가능하다.", () => {
    cy.get(".digit").contains("5").click();
    cy.get(".operation").contains("X").click();
    cy.get(".digit").contains("3").click();
    clickEqual();
    //cy.get("#total").invoke("text").should("eq", "8");
    cy.get("#total").should("have.text", "15");
  });

  it("2개의 숫자에 대해 나눗셈이 가능하다.", () => {
    cy.get(".digit").contains("6").click();
    cy.get(".operation").contains("/").click();
    cy.get(".digit").contains("3").click();
    clickEqual();
    //cy.get("#total").invoke("text").should("eq", "8");
    cy.get("#total").should("have.text", "2");
  });

  it("AC(All Clear)버튼을 누르면 0으로 초기화 한다.", () => {
    cy.get(".digit").contains("6").click();
    clickClear();
    cy.get("#total").should("have.text", "0");
  });

  it("숫자는 한번에 최대 3자리 수까지 입력 가능하다.", () => {
    cy.get(".digit").contains("1").click();
    cy.get(".digit").contains("1").click();
    cy.get(".digit").contains("1").click();
    cy.get(".digit").contains("1").click();
    cy.get("#total").should("have.text", "111");
  });

  // 두번째 숫자 자릿수 테스트
  it("두번째 숫자도 최대 3자리 수 까지만 입력 가능하다.", () => {
    cy.get(".digit").contains("1").click();
    cy.get(".digit").contains("1").click();
    cy.get(".digit").contains("1").click();
    cy.get(".digit").contains("1").click();
    cy.get("#total").should("have.text", "111");
    // +를 누르고 다시 1111 입력
    cy.get(".operation").contains("+").click();
    cy.get(".digit").contains("1").click();
    cy.get(".digit").contains("1").click();
    cy.get(".digit").contains("1").click();
    cy.get(".digit").contains("1").click();
    cy.get("#total").should("have.text", "111+111");
  });

  it("계산 결과를 표현할 때 소수점 이하는 버림한다.", () => {
    cy.get(".digit").contains("7").click();
    cy.get(".operation").contains("/").click();
    cy.get(".digit").contains("3").click();
    clickEqual();
    //cy.get("#total").invoke("text").should("eq", "8");
    cy.get("#total").should("have.text", "2");
  });

  // 첫번째 값의 첫번째 숫자를 입력할 때 0을 누른다면
  it("0클릭 테스트", () => {
    // 0을 4번 클릭
    for (let i = 0; i < 4; i++) {
      cy.get(".digit").contains("0").click();
    }
    // 값이 그대로 0 인지 확인
    cy.get("#total").should("have.text", "0");
  });

  // 두번째 값의 첫번째 숫자를 입력할 때 0을 누른다면
  it("두번째 값 0클릭 테스트", () => {
    // 숫자와 연산자가 입력된 상태에서
    cy.get(".digit").contains("1").click();
    cy.get(".digit").contains("2").click();
    cy.get(".digit").contains("3").click();
    cy.get(".operation").contains("+").click();
    // 0을 계속 클릭해도, 아무 값도 입력되지 않아야한다.
    for (let i = 0; i < 4; i++) {
      cy.get(".digit").contains("0").click();
    }
    cy.get("#total").should("have.text", "123+");
  });

  // 숫자가 하나만 있을 때 “=”를 누르면 그 값이 유지되어야 합니다.
  it("숫자가 1개 일 때, = 클릭 테스트", () => {
    // 숫자가 하나만 입력되었을 때 =를 누르는 경우, 그 숫자가 그대로여야 합니다.
    cy.get(".digit").contains("1").click();
    clickEqual();
    cy.get("#total").should("have.text", "1");
  });

  // 아무것도 입력되지 않은 초기상태에서, 연산자를 누를 수 없습니다.
  // =를 제외한 연산자들을 "자연수 끼리의 사칙연산만 가능해요." 라는 알림이 뜨고
  // =를 누르면 그대로 0이다.
  it("처음부터 연산자를 누를 수 없습니다.", () => {
    // 일단 처음 값이 0인지 확인
    cy.get("#total").should("have.text", "0");
    // 모든 연산자 눌러보기
    clickAllOperationsCheck(() => cy.get("#total").should("have.text", "0"));
    // "=" 눌러보기
    clickEqual();
    cy.get("#total").should("have.text", "0");
  });

  // 식이 완성되었다면, 2개의 숫자만 연산이 가능합니다. "="를 제외한 연산자를 누를 수 없습니다.
  it("완성된 식에 =를 제외한 연산자를 또 누를 수 없습니다.", () => {
    // 식 입력하기 (123X123)
    cy.get(".digit").contains("1").click();
    cy.get(".digit").contains("2").click();
    cy.get(".digit").contains("3").click();
    cy.get(".operation").contains("X").click();
    cy.get(".digit").contains("1").click();
    cy.get(".digit").contains("2").click();
    cy.get(".digit").contains("3").click();
    // =를 제외한 연산자 모두 클릭
    clickAllOperationsCheck(() =>
      cy.get("#total").should("have.text", "123X123")
    );
    // = 를 누르면 정답 출력
    clickEqual();
    cy.get("#total").should("have.text", "15129");
  });

  // 식이 완성되지 않았다면, 올바른 식을 입력해야합니다. 따라서 완성되지 않은 식에는 = 를 누를 수 없습니다.
  it("완성되지 않은 식에는 =를 클릭할 수 없습니다.", () => {
    // 연산자를 누르고 =를 클릭하는 경우, 올바른 식이 아니므로 변화가 없어야 합니다.
    cy.get(".digit").contains("1").click();
    cy.get(".digit").contains("2").click();
    cy.get(".operation").contains("+").click();
    clickEqual();
    cy.get("#total").should("have.text", "12+");
  });

  // 완성되지 않은 식은 마지막 문자가 +, -, /, X 라는 뜻이므로, =를 제외한 연산자를 누르면 연산자가 교체되어야 합니다.
  it("연산자 교체 테스트", () => {
    cy.get(".digit").contains("1").click();
    cy.get(".digit").contains("2").click();
    cy.get(".operation").contains("+").click();
    cy.get("#total").should("have.text", "12+");
    cy.get(".operation").contains("-").click();
    cy.get("#total").should("have.text", "12-");
    cy.get(".operation").contains("X").click();
    cy.get("#total").should("have.text", "12X");
    cy.get(".operation").contains("/").click();
    cy.get("#total").should("have.text", "12/");
  });

  // 의도적으로 음수값을 만든 경우, 2가지 버튼만 클릭이 가능합니다.
  // AC버튼 -> 0으로 초기화한다.
  // "=" 버튼 -> 그 값을 그대로 보여준다.
  // 위 두 버튼을 제외한 숫자, 연산자 버튼을 클릭하면 "자연수 끼리의 사칙연산만 가능해요."라는 알림이 뜹니다.
  it("의도적으로 생성한 음수 값에 대한 예외처리", () => {
    // 음수값 생성 후 확인
    cy.get(".digit").contains("3").click();
    cy.get(".operation").contains("-").click();
    cy.get(".digit").contains("9").click();
    clickEqual();
    cy.get("#total").should("have.text", "-6");
    // 1. "=" 버튼 눌러보기
    clickEqual();
    cy.get("#total").should("have.text", "-6");
    // 2. 모든 숫자 눌러보기
    clickAllNumbersCheck(() => cy.get("#total").should("have.text", "-6"));
    // 3. 연산자 눌러보기
    clickAllOperationsCheck(() => cy.get("#total").should("have.text", "-6"));
    // 4. AC버튼 클릭
    clickClear();
    cy.get("#total").should("have.text", "0");
  });

  // 의도적으로 3자리 수 이상의 숫자를 만든 후, 연산을 진행할 수 없습니다.
  // (앱은 "3자리 수 까지 입력가능해요." 라는 알림을 출력함)
  it("3자리 수 이상의 숫자에 연산을 진행할 수 없습니다.", () => {
    // 123X123 연산으로 15129 라는 숫자를 만든 뒤
    cy.get(".digit").contains("1").click();
    cy.get(".digit").contains("2").click();
    cy.get(".digit").contains("3").click();
    cy.get(".operation").contains("X").click();
    cy.get(".digit").contains("1").click();
    cy.get(".digit").contains("2").click();
    cy.get(".digit").contains("3").click();
    clickEqual();
    cy.get("#total").should("have.text", "15129");
    // 1. "=" 버튼은 입력 가능합니다.
    clickEqual();
    cy.get("#total").should("have.text", "15129");
    // 2. 모든 숫자 눌러보기
    clickAllNumbersCheck(() => cy.get("#total").should("have.text", "15129"));
    // 3. 연산자 눌러보기
    clickAllOperationsCheck(() =>
      cy.get("#total").should("have.text", "15129")
    );
    // 4. AC버튼 눌러보기
    clickClear();
    cy.get("#total").should("have.text", "0");
  });
});
