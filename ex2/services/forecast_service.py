from api.forecast import ForecastAPI


class ForecastService:
    
    def __init__(self):
        self.forecast_api = ForecastAPI()

    # Cette méthode récupère les prévisions météorologiques pour une latitude et une longitude données en utilisant l'API ForecastAPI.
    def get_forecast(self, lat, lon, api_key):
        return self.forecast_api.forecast(lat, lon, api_key)