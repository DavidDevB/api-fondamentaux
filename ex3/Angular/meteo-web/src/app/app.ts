import { Component, signal } from '@angular/core';
import { CityChoice } from './components/city-choice/city-choice';
import { Weather } from './components/weather/weather';
import { WeatherModel } from './models/WeatherModel';

@Component({
  selector: 'app-root',
  imports: [CityChoice, Weather],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  readonly weather = signal<WeatherModel | undefined>(undefined);

  onWeather = (weather: WeatherModel) => {
    this.weather.set(weather);
  };
}
