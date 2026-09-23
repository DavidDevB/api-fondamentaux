import os

from dotenv import load_dotenv

from services.forecast_service import ForecastService

load_dotenv()

API_KEY = os.getenv("API_KEY")
if not API_KEY:
    raise RuntimeError("La variable API_KEY est absente. Vérifie ton fichier .env.")

merignac = (48.8566, 2.3522)
saint_geours = (43.4833, -0.6167)
toulouse = (43.6047, 1.4442)


def main():
    forecast_service = ForecastService()
    forecast_date_merignac = forecast_service.get_forecast(*merignac, API_KEY)
    forecast_date_saint_geours = forecast_service.get_forecast(*saint_geours, API_KEY)
    forecast_date_toulouse = forecast_service.get_forecast(*toulouse, API_KEY)

    merignac_temp = forecast_date_merignac["list"]
    saint_geours_temp = forecast_date_saint_geours["list"]
    toulouse_temp = forecast_date_toulouse["list"]

    average_min_merignac = sum([merignac_temp[i]['main']['temp_min'] for i in range(1, 9)]) / 8
    average_max_merignac = sum([merignac_temp[i]['main']['temp_max'] for i in range(1, 9)]) / 8
    average_min_saint_geours = sum([saint_geours_temp[i]['main']['temp_min'] for i in range(1, 9)]) / 8
    average_max_saint_geours = sum([saint_geours_temp[i]['main']['temp_max'] for i in range(1, 9)]) / 8
    average_min_toulouse = sum([toulouse_temp[i]['main']['temp_min'] for i in range(1, 9)]) / 8
    average_max_toulouse = sum([toulouse_temp[i]['main']['temp_max'] for i in range(1, 9)]) / 8

    print(f"Mérignac: Min({average_min_merignac - 273.15:.2f}°C) / Max({average_max_merignac - 273.15:.2f}°C")
    print(f"Saint-Géours: Min({average_min_saint_geours - 273.15:.2f}°C) / Max({average_max_saint_geours - 273.15:.2f}°C")
    print(f"Toulouse: Min({average_min_toulouse - 273.15:.2f}°C) / Max({average_max_toulouse - 273.15:.2f}°C")


if __name__ == "__main__":
    main()