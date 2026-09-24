export default class ForecastService {
  async getForecast(lat: number, lon: number) {
    const response = await fetch(`http://localhost:3000/weather?lat=${lat}&lon=${lon}`);
    return await response.json();
  }
}
