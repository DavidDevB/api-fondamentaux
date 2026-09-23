from api.forecast import ForecastAPI


class ForecastService:
    
    def __init__(self):
        self.forecast_api = ForecastAPI()

    def get_forecast(self, lat, lon, api_key):
        return self.forecast_api.forecast(lat, lon, api_key)