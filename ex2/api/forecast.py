import requests


class ForecastAPI:

    def forecast(self, lat, lon, api_key):
        url = f"https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={api_key}"
        response = requests.get(url)
        response.raise_for_status()
        return response.json()