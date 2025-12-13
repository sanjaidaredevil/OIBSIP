function convertTemp() {
    let value = parseFloat(document.getElementById("tempInput").value);
    let unit = document.getElementById("unit").value;
    let resultBox = document.getElementById("resultBox");

    if (isNaN(value)) {
        resultBox.innerHTML = "Please enter a valid number";
        return;
    }

    let result = "";

    if (unit === "C") {
        result = `${(value * 9/5 + 32).toFixed(2)} °F<br>${(value + 273.15).toFixed(2)} K`;
    }
    else if (unit === "F") {
        result = `${((value - 32) * 5/9).toFixed(2)} °C<br>${(((value - 32) * 5/9) + 273.15).toFixed(2)} K`;
    }
    else if (unit === "K") {
        result = `${(value - 273.15).toFixed(2)} °C<br${(value * 9/5 - 459.67).toFixed(2)} °F`;
    }

    resultBox.innerHTML = result;
}
