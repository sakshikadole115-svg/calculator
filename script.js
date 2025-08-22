const display = document.getElementById("display");
const buttons = document.querySelectorAll(".btn");

let expression = "";

function updateDisplay() {
  display.value = expression || "0";
}

function evaluateExpression() {
  try {
    const result = eval(expression);
    display.value = result;
    expression = result.toString();
  } catch {
    display.value = "Error";
    expression = "";
  }
}

buttons.forEach(button => {
  button.addEventListener("click", () => {
    const key = button.getAttribute("data-key");

    switch (key) {
      case "C":
        expression = "";
        break;
      case "=":
        evaluateExpression();
        return;
      case "←":
        expression = expression.slice(0, -1);
        break;
      default:
        expression += key;
        break;
    }

    updateDisplay();
  });
});

// BONUS: Keyboard Support
document.addEventListener("keydown", (e) => {
  const key = e.key;

  if ("0123456789+-*/.".includes(key)) {
    expression += key;
    updateDisplay();
  } else if (key === "Enter") {
    evaluateExpression();
  } else if (key === "Backspace") {
    expression = expression.slice(0, -1);
    updateDisplay();
  } else if (key === "Escape") {
    expression = "";
    updateDisplay();
  }
});
