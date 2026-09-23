import requests

class PeopleAPI:

    # Cette méthode récupère la liste des personnes actuellement dans l'espace en utilisant l'API Open Notify.
    def people(self):
        url = "http://api.open-notify.org/astros.json"
        response = requests.get(url)
        if response.status_code == 200:
            data = response.json()
            return data