import os
from itertools import groupby

from dotenv import load_dotenv

from services.forecast_service import ForecastService

load_dotenv()

API_KEY = os.getenv("API_KEY")
if not API_KEY:
    raise RuntimeError("La variable API_KEY est absente. Vérifie ton fichier .env.")

villes = {
    "Mérignac": (48.8566, 2.3522),
    "Saint-Géours": (43.4833, -0.6167),
    "Toulouse": (43.6047, 1.4442),
}


# Regroupe les prévisions par jour (l'API renvoie une entrée toutes les 3h).
def group_by_day(forecast_list):
    return {date: list(entries) for date, entries in groupby(forecast_list, key=lambda entry: entry["dt_txt"].split(" ")[0])}


def print_forecast(ville, forecast_list):
    print(f"\n{ville}:")
    days = group_by_day(forecast_list)
    for date, entries in list(days.items())[:5]:
        temperatures = [entry["main"]["temp"] for entry in entries]
        print(f"  {date}: Min({min(temperatures) - 273.15:.2f}°C) / Max({max(temperatures) - 273.15:.2f}°C)")


def main():
    forecast_service = ForecastService()

    for ville, (lat, lon) in villes.items():
        forecast = forecast_service.get_forecast(lat, lon, API_KEY)
        print_forecast(ville, forecast["list"])


if __name__ == "__main__":
    main()
