function convertTemperature() {

    const input = document.getElementById("temperature").value;
    const type = document.getElementById("conversionType").value;
    const result = document.getElementById("result");

    if (input === "") {
        result.innerHTML = "Please enter a temperature.";
        result.style.color = "red";
        return;
    }

    const temp = Number(input);

    if (type === "CtoF") {

        const fahrenheit = (temp * 9 / 5) + 32;

        result.innerHTML = `${temp}°C = ${fahrenheit.toFixed(2)}°F`;

        result.style.color = "green";

    } else {

        const celsius = (temp - 32) * 5 / 9;

        result.innerHTML = `${temp}°F = ${celsius.toFixed(2)}°C`;

        result.style.color = "blue";

    }

}

function resetForm() {

    document.getElementById("temperature").value = "";

    document.getElementById("conversionType").selectedIndex = 0;

    document.getElementById("result").innerHTML = "";

}