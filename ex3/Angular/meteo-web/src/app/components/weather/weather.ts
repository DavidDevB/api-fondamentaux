import { Component, input } from '@angular/core';
import { WeatherForecastEntry, WeatherModel } from '../../models/WeatherModel';

export interface DailyForecast {
  date: string;
  minTemperature: number;
  maxTemperature: number;
  averageHumidity: number;
  mostFrequentDescription: string;
}

// Regroupe les prévisions par jour (l'API renvoie une entrée toutes les 3h).
function groupByDay(list: WeatherForecastEntry[]): Map<string, WeatherForecastEntry[]> {
  const days = new Map<string, WeatherForecastEntry[]>();
  for (const entry of list) {
    const date = entry.dt_txt.split(' ')[0];
    if (!days.has(date)) days.set(date, []);
    days.get(date)!.push(entry);
  }
  return days;
}

function mostFrequentDescription(entries: WeatherForecastEntry[]): string {
  const descriptions = entries
    .map((item) => item.weather?.[0]?.description)
    .filter((description): description is string => Boolean(description));

  return descriptions.length
    ? ([...descriptions]
        .sort(
          (a, b) =>
            descriptions.filter((value) => value === a).length -
            descriptions.filter((value) => value === b).length,
        )
        .at(-1) ?? 'Temps variable')
    : 'Temps variable';
}

@Component({
  selector: 'app-weather',
  imports: [],
  templateUrl: './weather.html',
  styleUrl: './weather.css',
})
export class Weather {
  weather = input.required<WeatherModel>();

  dailyForecasts = (weather: WeatherModel): DailyForecast[] => {
    const days = [...groupByDay(weather.list)].slice(0, 5);

    return days.map(([date, entries]) => {
      const temperatures = entries.map((item) => item.main.temp - 273.15);

      return {
        date,
        minTemperature: Math.min(...temperatures),
        maxTemperature: Math.max(...temperatures),
        averageHumidity: entries.reduce((sum, item) => sum + item.main.humidity, 0) / entries.length,
        mostFrequentDescription: mostFrequentDescription(entries),
      };
    });
  };
}
