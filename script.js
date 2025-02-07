// Higher-order function that returns a conversion function
const createConverter = (fromUnit, toUnit) => {
    const conversionRates = {
        "lb_to_kg": (value) => value * 0.453592,
        "kg_to_lb": (value) => value / 0.453592,
        "miles_to_km": (value) => value * 1.60934,
        "km_to_miles": (value) => value / 1.60934,
        "celsius_to_fahrenheit": (value) => (value * 9/5) + 32,
        "fahrenheit_to_celsius": (value) => (value - 32) * 5/9
    };

    const conversionKey = `${fromUnit}_to_${toUnit}`;
    return (input) => {
        if (Array.isArray(input)) {
            return input.map(value => conversionRates[conversionKey](parseFloat(value)));
        }
        return conversionRates[conversionKey](parseFloat(input));
    };
};

// Function to handle conversions
const handleConversion = (inputId, fromUnit, toUnit, outputId) => {
    const inputValue = document.getElementById(inputId).value.trim();

    if (!inputValue) {
        alert("Please enter a valid value.");
        return;
    }
//Check if a string is parsed
    if (isNaN(inputValue.replace(/,/g, "").trim())) {
        alert("Please enter a number.");
        return;
    }

    // Check if input is an array (comma-separated values)
    const inputArray = inputValue.includes(",") ? inputValue.split(",").map(val => val.trim()) : inputValue;

    const converter = createConverter(fromUnit, toUnit);
    const result = converter(inputArray);

    document.getElementById(outputId).textContent = `Converted Value: ${Array.isArray(result) ? result.join(", ") : result.toFixed(2)}`;
};
document.addEventListener("DOMContentLoaded", () => {
    console.log("JavaScript Loaded and Ready!");
    
    if (document.getElementById("weightInput")) {
        console.log("Weight conversion detected.");
        document.getElementById("toKg").addEventListener("click", () => handleConversion("weightInput", "lb", "kg", "weightOutput"));
        document.getElementById("toLb").addEventListener("click", () => handleConversion("weightInput", "kg", "lb", "weightOutput"));
    }

    if (document.getElementById("distanceInput")) {
        console.log("Distance conversion detected.");
        document.getElementById("toKm").addEventListener("click", () => handleConversion("distanceInput", "miles", "km", "distanceOutput"));
        document.getElementById("toMiles").addEventListener("click", () => handleConversion("distanceInput", "km", "miles", "distanceOutput"));
    }

    if (document.getElementById("temperatureInput")) {
        console.log("Temperature conversion detected.");
        document.getElementById("toFahrenheit").addEventListener("click", () => handleConversion("temperatureInput", "celsius", "fahrenheit", "temperatureOutput"));
        document.getElementById("toCelsius").addEventListener("click", () => handleConversion("temperatureInput", "fahrenheit", "celsius", "temperatureOutput"));
    }
});

