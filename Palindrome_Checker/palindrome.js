const textInput = document.getElementById('text-input');
const checkButton = document.getElementById('check-btn');
const result = document.getElementById('result');

checkButton.addEventListener("click", () => {
    const inputValue = textInput.value;
    const cleanedInput = inputValue.replace(/[^A-Za-z0-9]/g, "").toLowerCase();

    if (inputValue === "") {
        alert("Please input a value");
    } else if (inputValue.length === 1) {
        result.innerText = `${inputValue} is a palindrome`;
    } else if (cleanedInput === [...cleanedInput].reverse().join("")) {
        result.innerText = `${inputValue} is a palindrome`;
    } else {
        result.innerText = `${inputValue} is not a palindrome`;
    }
});


const input = document.getElementById("user-input");
const check = document.getElementById("check-btn");
const clear = document.getElementById("clear-btn");
const results = document.getElementById("result-div");

check.addEventListener("click", () => {
  const regex = /^(1\s?)?(\(\d{3}\)|\d{3})([\s-]?)\d{3}([\s-]?)\d{4}$/ 
  if(!input.value){
    alert("Please provide a phone number");
  } else if (regex.test(input.value))
  {
    result.innerText = `Valid US number: ${input.value}`

  } else {
    result.innerText = `Invalid US number: ${input.value}`
  }
});

clear.addEventListener("click", () => 
  results.innerText = "" )

/*
Regex: 
optional one with a space => (1\s?)?
3 digits => (\(\d{3}\)|\d{3})
optional hyphen or space => ([\s-]?)
Three digits => \d{3}
optional hyphen or space => ([\s-]?)
Four digits => \d{4}


 */

 