const conversionTypeSelect = document.getElementById("conversionType");
const fromUnitSelect = document.getElementById("fromUnit");
const toUnitSelect = document.getElementById("toUnit");
const inputValue = document.getElementById("inputValue");
const outputValue = document.getElementById("outputValue");
const convertBtn = document.getElementById("convertBtn");
const resultDisplay = document.getElementById("result");

// Units for each conversion type
const units = { //
  length: ["Meter", "Kilometer", "Mile", "Foot", "Inch", "Centimeter"], // Add more units as needed
  weight: ["Kilogram", "Gram", "Pound", "Ounce"], 
  temperature: ["Celsius", "Fahrenheit", "Kelvin"]
};

// Conversion formulas
function convert(value, from, to, type) { // Convert value based on type
  value = parseFloat(value); // Ensure value is a number
  if (type === "length") { // If type is length
    const factors = { // Conversion factors for length
      Meter: 1,  // Base unit
      Kilometer: 0.001, // 1 km = 1000 m
      Mile: 0.000621371, // 1 mile = 1609.34 m
      Foot: 3.28084, // 1 foot = 0.3048 m
      Inch: 39.3701, // 1 inch = 0.0254 m
      Centimeter: 100 // 1 cm = 0.01 m
    };
    return (value / factors[from]) * factors[to]; // Convert value from one unit to another
  }

  if (type === "weight") { // If type is weight
    const factors = {
      Kilogram: 1,
      Gram: 1000,
      Pound: 2.20462,
      Ounce: 35.274
    };
    return (value / factors[from]) * factors[to]; // Convert value from one unit to another
  }

  if (type === "temperature") { // If type is temperature
    // Normalize to Celsius first
    if (from === "Fahrenheit") value = (value - 32) * (5 / 9);
    else if (from === "Kelvin") value = value - 273.15;

    // Convert from Celsius to target
    if (to === "Fahrenheit") return value * (9 / 5) + 32;
    else if (to === "Kelvin") return value + 273.15;
    return value;
  }

  return value;
}

// Populate unit dropdowns
function populateUnits(type) { // Populate unit dropdowns based on selected conversion type
  fromUnitSelect.innerHTML = ""; // Clear previous options
  toUnitSelect.innerHTML = ""; // Clear previous options
  units[type].forEach((unit) => { // For each unit in the selected type
    const option1 = document.createElement("option"); // Create option element
    option1.value = unit; // Set option value
    option1.text = unit; // Set option text
    const option2 = option1.cloneNode(true); // Clone option for the second dropdown
    fromUnitSelect.appendChild(option1); // Append to from unit dropdown
    toUnitSelect.appendChild(option2); // Append to to unit dropdown
  });
}

// Handle conversion
convertBtn.addEventListener("click", () => { // On button click
  const type = conversionTypeSelect.value; // Get selected conversion type
  const from = fromUnitSelect.value; // Get selected from unit
  const to = toUnitSelect.value; // Get selected to unit
  const value = inputValue.value; // Get input value

  if (value === "" || isNaN(value)) { // Check if input is empty or not a number
    resultDisplay.textContent = "⚠️ Please enter a valid number."; // Show error message
    outputValue.value = "";
    return;
  }

  const result = convert(value, from, to, type); // Convert value
  outputValue.value = result.toFixed(3); // Set output value to 3 decimal places
  resultDisplay.textContent = `Converted: ${result.toFixed(3)} ${to}`; // Show result message
});

// Change unit options when conversion type changes
conversionTypeSelect.addEventListener("change", () => {
  populateUnits(conversionTypeSelect.value);
  resultDisplay.textContent = "";
  inputValue.value = "";
  outputValue.value = "";
});

// Initialize on load
window.addEventListener("DOMContentLoaded", () => {
  populateUnits(conversionTypeSelect.value);
});
