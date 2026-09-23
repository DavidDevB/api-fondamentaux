import requests

class LocationAPI:

    # Cette méthode récupère la position actuelle de la Station Spatiale Internationale (ISS) en utilisant l'API Open Notify.
    def location(self):
        url = "http://api.open-notify.org/iss-now.json"
        response = requests.get(url)
        if response.status_code == 200:
            data = response.json()
            return data