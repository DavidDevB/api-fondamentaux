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

function updateWeatherDisplay(data) {
  const temperatureElement = document.getElementById("temperature");
  const humidityElement = document.getElementById("humidite");
  const conditionsElement = document.getElementById("conditions");

  if (!data?.list || data.list.length === 0) {
    temperatureElement.textContent = "--";
    humidityElement.textContent = "--";
    conditionsElement.textContent = "Erreur de chargement";
    return;
  }

  temperatureElement.textContent = (data.list[0].main.temp - 273.15).toFixed(2);
  humidityElement.textContent = data.list[0].main.humidity;
  conditionsElement.textContent = data.list[0].weather[0].description;
}
