import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Forecast {
  async getForecast(lat: number, lon: number) {
    const response = await fetch(`http://localhost:3000/weather?lat=${lat}&lon=${lon}`);
    return await response.json();
  }
}
