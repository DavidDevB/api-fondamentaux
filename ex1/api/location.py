import requests

class LocationAPI:

    def location(self):
        url = "http://api.open-notify.org/iss-now.json"
        response = requests.get(url)
        if response.status_code == 200:
            data = response.json()
            return data