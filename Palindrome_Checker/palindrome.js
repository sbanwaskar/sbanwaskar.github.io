const textInput = document.getElementById('text-input');
const checkButton = document.getElementById('check-btn');
const result = document.getElementById('result');

// Reset the result animation before updating it
function resetResultAnimation() {
    result.classList.remove('show-result');
    setTimeout(() => {
        result.classList.add('show-result');
    }, 10);
}

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

    // Trigger animation for result display
    result.style.visibility = 'visible'; // Ensure the result is visible
    resetResultAnimation();
});
