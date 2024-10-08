"use strict";

document.addEventListener("DOMContentLoaded", function() {
  const input = document.getElementById('input'); // input/output area
  const numberButtons = document.querySelectorAll('.numbers div'); // number buttons
  const operatorButtons = document.querySelectorAll('.operators div'); // operator buttons
  const resultButton = document.getElementById('result'); // equal button
  const clearButton = document.getElementById('clear'); // clear button
  let resultDisplayed = false; // flag to track if result is displayed

  // Function to handle number button clicks
  numberButtons.forEach(button => {
    button.addEventListener("click", function(e) {
      const currentString = input.innerHTML;
      const lastChar = currentString.slice(-1);

      if (!resultDisplayed) {
        input.innerHTML += e.target.innerHTML;
      } else if (["+", "-", "×", "÷"].includes(lastChar)) {
        resultDisplayed = false;
        input.innerHTML += e.target.innerHTML;
      } else {
        resultDisplayed = false;
        input.innerHTML = e.target.innerHTML;
      }
    });
  });

  // Function to handle operator button clicks
  operatorButtons.forEach(button => {
    button.addEventListener("click", function(e) {
      const currentString = input.innerHTML;
      const lastChar = currentString.slice(-1);

      if (["+", "-", "×", "÷"].includes(lastChar)) {
        input.innerHTML = currentString.slice(0, -1) + e.target.innerHTML;
      } else if (currentString.length === 0) {
        console.log("Enter a number first");
      } else {
        input.innerHTML += e.target.innerHTML;
      }
    });
  });

  // Function to handle result button click
  resultButton.addEventListener("click", function() {
    let inputString = input.innerHTML;

    // Arrays for numbers and operators
    const numbers = inputString.split(/[\+\-×÷]/g).map(Number);
    const operators = inputString.replace(/[0-9]|\./g, "").split("");

    // Evaluate the expression
    const evaluate = (numbers, operators) => {
      // Process division and multiplication first
      ["÷", "×"].forEach(op => {
        while (operators.includes(op)) {
          const index = operators.indexOf(op);
          const result = op === "÷"
            ? numbers[index] / numbers[index + 1]
            : numbers[index] * numbers[index + 1];
          numbers.splice(index, 2, result);
          operators.splice(index, 1);
        }
      });

      // Process addition and subtraction
      ["-", "+"].forEach(op => {
        while (operators.includes(op)) {
          const index = operators.indexOf(op);
          const result = op === "-"
            ? numbers[index] - numbers[index + 1]
            : numbers[index] + numbers[index + 1];
          numbers.splice(index, 2, result);
          operators.splice(index, 1);
        }
      });

      return numbers[0];
    };

    // Display the result
    input.innerHTML = evaluate(numbers, operators);
    resultDisplayed = true; // Set flag that result is displayed
  });

  // Function to handle clear button click
  clearButton.addEventListener("click", function() {
    input.innerHTML = "";
  });
});
