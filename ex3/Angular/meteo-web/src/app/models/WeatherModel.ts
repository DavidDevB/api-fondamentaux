export interface WeatherModel {
  cod: string;
  message: number;
  cnt: number;
  list: WeatherForecastEntry[];
  city: WeatherCity;
}

export interface WeatherForecastEntry {
  dt: number;
  main: WeatherMain;
  weather: WeatherCondition[];
  clouds: WeatherClouds;
  wind: WeatherWind;
  visibility: number;
  pop: number;
  rain?: WeatherPrecipitation;
  snow?: WeatherPrecipitation;
  sys: WeatherPartOfDay;
  dt_txt: string;
}

export interface WeatherMain {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  sea_level: number;
  grnd_level: number;
  humidity: number;
  temp_kf: number;
}

export interface WeatherCondition {
  id: number;
  main: string;
  description: string;
  icon: string;
}

export interface WeatherClouds {
  all: number;
}

export interface WeatherWind {
  speed: number;
  deg: number;
  gust?: number;
}

export interface WeatherPrecipitation {
  '3h': number;
}

export interface WeatherPartOfDay {
  pod: 'n' | 'd';
}

export interface WeatherCity {
  id: number;
  name: string;
  coord: WeatherCoord;
  country: string;
  population: number;
  timezone: number;
  sunrise: number;
  sunset: number;
}

export interface WeatherCoord {
  lat: number;
  lon: number;
}
