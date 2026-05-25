const temperature = 24;   
const windSpeed = 12;    


function calculateWindChill(temp, wind) {
  return (
    13.12 +
    0.6215 * temp -
    11.37 * Math.pow(wind, 0.16) +
    0.3965 * temp * Math.pow(wind, 0.16)
  ).toFixed(1);
}

const windchillSpan = document.getElementById("windchill");

if (temperature <= 10 && windSpeed > 4.8) {
  windchillSpan.textContent = calculateWindChill(temperature, windSpeed);
} else {
  windchillSpan.textContent = "N/A";
}

document.getElementById("currentYear").textContent = new Date().getFullYear();
document.getElementById("lastModified").textContent = document.lastModified;
