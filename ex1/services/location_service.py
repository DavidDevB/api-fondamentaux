from api.location import LocationAPI


class LocationService:
    def __init__(self):
        self.location_api = LocationAPI()

    def get_location(self):
        return self.location_api.location()
