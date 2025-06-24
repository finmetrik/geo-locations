#!/usr/bin/env python3
"""
Python Example for Geo-Locations API

This example demonstrates how to access the geo-locations data using Python
with requests library to fetch data from the CDN or API endpoint.
"""

import requests
import json

# Base URL for geo-locations API
BASE_URL = "https://geo-locations.com/api"
# Alternative CDN URL
CDN_URL = "https://cdn.geo-locations.com"

class GeoLocations:
    def __init__(self, use_cdn=False):
        """Initialize the GeoLocations client"""
        self.base_url = CDN_URL if use_cdn else BASE_URL
    
    def get_countries(self):
        """Get all countries"""
        response = requests.get(f"{self.base_url}/countries")
        return response.json()
    
    def get_country_by_code(self, code):
        """Get country by code"""
        response = requests.get(f"{self.base_url}/countries/{code}")
        return response.json()
    
    def get_country_by_name(self, name):
        """Get country by name"""
        all_countries = self.get_countries()
        for country in all_countries:
            if country["name"].lower() == name.lower():
                return country
        return None
    
    def get_currencies(self):
        """Get all currencies"""
        response = requests.get(f"{self.base_url}/currencies")
        return response.json()
    
    def get_currency_by_country_code(self, country_code):
        """Get currency by country code"""
        response = requests.get(f"{self.base_url}/currencies/country/{country_code}")
        return response.json()
    
    def get_currency_by_code(self, currency_code):
        """Get currency by currency code"""
        response = requests.get(f"{self.base_url}/currencies/{currency_code}")
        return response.json()
    
    def get_flags(self):
        """Get all flags"""
        response = requests.get(f"{self.base_url}/flags")
        return response.json()
    
    def get_flag_by_country_code(self, country_code):
        """Get flag by country code"""
        response = requests.get(f"{self.base_url}/flags/{country_code}")
        return response.json()
    
    def get_states_by_country_code(self, country_code):
        """Get states by country code"""
        response = requests.get(f"{self.base_url}/locations/{country_code}/states")
        return response.json()
    
    def get_cities_by_state(self, country_code, state_code):
        """Get cities by state"""
        response = requests.get(f"{self.base_url}/locations/{country_code}/states/{state_code}/cities")
        return response.json()
    
    def get_complete_country_data(self, country_code):
        """Get complete country data"""
        response = requests.get(f"{self.base_url}/complete/{country_code}")
        return response.json()


# Usage examples
if __name__ == "__main__":
    print("*** Geo-Locations Python Client Demo ***")
    print("A comprehensive geographical data solution by Finmetrik IT Solutions LLC\n")
    
    # Initialize client (use_cdn=True to use CDN instead of API)
    geo = GeoLocations(use_cdn=False)
    
    # Get all countries
    countries = geo.get_countries()
    print(f">>> Total countries in the database: {len(countries)}")
    
    # Get country by code
    us = geo.get_country_by_code("US")
    print("\n>>> Country information for US:")
    print(json.dumps(us, indent=2))
    
    # Get country by name
    uae = geo.get_country_by_name("United Arab Emirates")
    print("\n>>> Country information for UAE:")
    print(json.dumps(uae, indent=2))
    
    # Get currency by country code
    euro_currency = geo.get_currency_by_country_code("FR")
    print("\n>>> Currency for France:")
    print(json.dumps(euro_currency, indent=2))
    
    # Get currency by currency code
    usd_currency = geo.get_currency_by_code("USD")
    print("\n>>> USD Currency information:")
    print(json.dumps(usd_currency, indent=2))
    
    # Get flag by country code
    japan_flag = geo.get_flag_by_country_code("JP")
    print("\n>>> Flag information for Japan:")
    print(f"Name: {japan_flag['name']}")
    print(f"Code: {japan_flag['code']}")
    print(f"Emoji: {japan_flag['emoji']}")
    print(f"SVG URL: {japan_flag['svg_url']}")
    
    # Get states for a country
    us_states = geo.get_states_by_country_code("US")
    print(f"\n>>> Number of states in US: {len(us_states)}")
    print("First few states:")
    for i, state in enumerate(list(us_states.items())[:3]):
        state_code, state_info = state
        print(f"{state_code}: {state_info[1]}")
    
    # Get cities for a state
    cities_in_california = geo.get_cities_by_state("US", "CA")
    print("\n>>> Cities in California:")
    for i, city in enumerate(list(cities_in_california.items())[:5]):
        city_id, city_name = city
        print(f"{city_id}: {city_name}")
    
    # Get complete data for a country
    india_data = geo.get_complete_country_data("IN")
    print("\n>>> Complete information for India:")
    print(f"Country: {india_data['country']['name']}")
    print(f"Currency: {india_data['currency']['currency_name']}")
    print(f"Flag: {india_data['flag']['emoji']}")
    print(f"Number of states: {len(india_data['locations']['states'])}")
    
    print("\n*** Demo Complete ***")
