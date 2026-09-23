from api.people import PeopleAPI


class PeopleService:

    def __init__(self):
        self.people_api = PeopleAPI()

    def get_people(self):
        return self.people_api.people()