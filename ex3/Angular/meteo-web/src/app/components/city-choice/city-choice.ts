import { Component, inject, signal, output, OnInit } from '@angular/core';
import { Forecast } from '../../services/forecast';
import { WeatherModel } from '../../models/WeatherModel';

@Component({
  selector: 'app-city-choice',
  imports: [],
  templateUrl: './city-choice.html',
  styleUrl: './city-choice.css',
})
export class CityChoice implements OnInit {
  // Data
  readonly cities = {
    merignac: { lat: 44.835, lon: -0.575 },
    saintGeours: { lat: 43.583, lon: -0.733 },
    toulouse: { lat: 43.604, lon: 1.444 },
  };

  // Signals
  readonly lat = signal(0);
  readonly lon = signal(0);
  readonly weather = signal<WeatherModel | undefined>(undefined);

  //Services
  private forecast = inject(Forecast);

  // Outputs
  castWeather = output<WeatherModel>();

  async ngOnInit(): Promise<void> {
    await this.toggleCity('merignac');
  }

  toggleCity = async (city: keyof typeof this.cities): Promise<void> => {
    const selectedCity = this.cities[city];
    this.lat.set(selectedCity.lat);
    this.lon.set(selectedCity.lon);

    const weather = await this.fetchWeather();
    this.weather.set(weather);
    this.castWeather.emit(weather);
  };

  fetchWeather = (): Promise<WeatherModel> => {
    return this.forecast.getForecast(this.lat(), this.lon());
  };
}
