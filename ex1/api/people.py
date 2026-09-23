import requests

class PeopleAPI:

    def people(self):
        url = "http://api.open-notify.org/astros.json"
        response = requests.get(url)
        if response.status_code == 200:
            data = response.json()
            return data