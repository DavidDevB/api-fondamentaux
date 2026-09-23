import requests


class ForecastAPI:

    # Cette méthode récupère les prévisions météorologiques pour une latitude et une longitude données en utilisant l'API OpenWeatherMap. 
    def forecast(self, lat, lon, api_key):
        url = f"https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={api_key}"
        response = requests.get(url)
        response.raise_for_status()
        return response.json()