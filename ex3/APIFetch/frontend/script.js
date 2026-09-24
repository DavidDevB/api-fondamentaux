import ForecastService from "./services/forecastService.js";

const forecastService = new ForecastService();

const villeMerignac = { lat: 44.835, lon: -0.575 };
const villeSaintGeours = { lat: 43.583, lon: -0.733 };
const villeToulouse = { lat: 43.604, lon: 1.444 };

const villeMerignacInput = document.getElementById("ville-merignac");
const villeSaintGeoursInput = document.getElementById("ville-saint-geours");
const villeToulouseInput = document.getElementById("ville-toulouse");

document.addEventListener("DOMContentLoaded", async () => {
  const data = await forecastService.getForecast(villeMerignac.lat, villeMerignac.lon);
  updateWeatherDisplay(data);
});

villeMerignacInput.addEventListener("change", async () => {
  console.log("villeMerignacInput checked:", villeMerignacInput.checked);
  if (villeMerignacInput.checked) {
    const data = await forecastService.getForecast(villeMerignac.lat, villeMerignac.lon);
    updateWeatherDisplay(data);
  }
});

villeSaintGeoursInput.addEventListener("change", async () => {
  if (villeSaintGeoursInput.checked) {
    const data = await forecastService.getForecast(villeSaintGeours.lat, villeSaintGeours.lon);
    updateWeatherDisplay(data);
  }
});

villeToulouseInput.addEventListener("change", async () => {
  if (villeToulouseInput.checked) {
    const data = await forecastService.getForecast(villeToulouse.lat, villeToulouse.lon);
    updateWeatherDisplay(data);
  }
});

// Regroupe les prévisions par jour (l'API renvoie une entrée toutes les 3h).
function groupByDay(list) {
  const days = new Map();
  for (const item of list) {
    const date = item.dt_txt.split(" ")[0];
    if (!days.has(date)) days.set(date, []);
    days.get(date).push(item);
  }
  return days;
}

function mostFrequentDescription(entries) {
  const descriptions = entries.map((item) => item.weather?.[0]?.description).filter(Boolean);

  return descriptions.length
    ? descriptions
        .sort(
          (a, b) =>
            descriptions.filter((value) => value === a).length - descriptions.filter((value) => value === b).length,
        )
        .at(-1)
    : "Temps variable";
}

function updateWeatherDisplay(data) {
  const previsionsElement = document.getElementById("previsions");

  if (!data?.list || data.list.length === 0) {
    previsionsElement.innerHTML = "<p>Erreur de chargement</p>";
    return;
  }

  const days = [...groupByDay(data.list)].slice(1, 6);

  previsionsElement.innerHTML = days
    .map(([date, entries]) => {
      const temperatures = entries.map((item) => item.main.temp - 273.15);
      const minTemperature = Math.min(...temperatures);
      const maxTemperature = Math.max(...temperatures);
      const averageHumidity = entries.reduce((sum, item) => sum + item.main.humidity, 0) / entries.length;

      return `
        <div class="jour-card">
          <h3>${date}</h3>
          <p>Min Temp: ${minTemperature.toFixed(2)} °C</p>
          <p>Max Temp: ${maxTemperature.toFixed(2)} °C</p>
          <p>Humidity : ${averageHumidity.toFixed(0)} %</p>
          <p>Conditions : ${mostFrequentDescription(entries)}</p>
        </div>
      `;
    })
    .join("");
}
