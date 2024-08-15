document.getElementById('convert-btn').addEventListener('click', function() {
    var numberInput = document.getElementById('number').value;
    var outputDiv = document.getElementById('output');

if (!numberInput.trim()) {
outputDiv.textContent = "Please enter a valid number";
} else { var number = parseFloat(numberInput);
if (isNaN(number)) {
outputDiv.textContent = "Please enter a valid number";
} else if (number < 1) {
outputDiv.textContent = "Please enter a number greater than or equal to 1";
} else if (number >= 4000) {
outputDiv.textContent = "Please enter a number less than or equal to 3999";
} else {
outputDiv.textContent = convertToRoman(number);
}
}
});
function convertToRoman(num) {
    var romanNumerals = [
        ["M", 1000],
        ["CM", 900],
        ["D", 500],
        ["CD", 400],
        ["C", 100],
        ["XC", 90],
        ["L", 50],
        ["XL", 40],
        ["X", 10],
        ["IX", 9],
        ["V", 5],
        ["IV", 4],
        ["I", 1]
    ];
    var result = "";

for (var i = 0; i < romanNumerals.length; i++) {
while (num >= romanNumerals[i][1]) {
result += romanNumerals[i][0];
num -= romanNumerals[i][1];
        }
    }

    return result;
}