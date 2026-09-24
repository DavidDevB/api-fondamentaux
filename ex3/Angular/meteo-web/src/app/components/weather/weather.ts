import { Component, input } from '@angular/core';
import { WeatherForecastEntry, WeatherModel } from '../../models/WeatherModel';

@Component({
  selector: 'app-weather',
  imports: [],
  templateUrl: './weather.html',
  styleUrl: './weather.css',
})
export class Weather {
  weather = input.required<WeatherModel>();

  fiveDaysPredictions = (weather: WeatherModel) => {
    const nextFiveDaysForecast = weather.list.slice(0, 5 * 8);
    const forecastToAverage = nextFiveDaysForecast.length > 0 ? nextFiveDaysForecast : weather.list;

    const averageTemperature =
      forecastToAverage.reduce(
        (sum: number, item: WeatherForecastEntry) => sum + (item.main.temp - 273.15),
        0,
      ) / forecastToAverage.length;

    const averageHumidity =
      forecastToAverage.reduce(
        (sum: number, item: WeatherForecastEntry) => sum + item.main.humidity,
        0,
      ) / forecastToAverage.length;

    const descriptions = forecastToAverage
      .map((item: WeatherForecastEntry) => item.weather?.[0]?.description)
      .filter((description): description is string => Boolean(description));

    const mostFrequentDescription = descriptions.length
      ? ([...descriptions]
          .sort(
            (a: string, b: string) =>
              descriptions.filter((value: string) => value === a).length -
              descriptions.filter((value: string) => value === b).length,
          )
          .at(-1) ?? 'Temps variable')
      : 'Temps variable';

    return { averageTemperature, averageHumidity, mostFrequentDescription };
  };
}
