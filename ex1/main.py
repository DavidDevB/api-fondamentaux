from services.location_service import LocationService
from services.people_service import PeopleService
from datetime import datetime

def main():

    location_service = LocationService()
    people_service = PeopleService()
    location_data = location_service.get_location()
    people_data = people_service.get_people()

    if location_data and location_data.get('iss_position'):
        print(f"Current location: Date et Heure({datetime.fromtimestamp(location_data['timestamp'])}) Latitude({location_data['iss_position']['latitude']}), Longitude({location_data['iss_position']['longitude']})")
    else:
        print("Current location: unavailable")

    if people_data and people_data.get('people'):
        print(f"Current people on the ISS: {len(people_data['people'])}")
        for person in people_data['people']:
            print(f" - {person['name']}")

if __name__ == "__main__":
    main()
