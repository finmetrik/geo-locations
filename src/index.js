/**
 * Geo-Locations Data API
 * A comprehensive geo-location dataset covering countries, states, cities, currencies and flags worldwide
 * 
 * Created by Finmetrik IT Solutions LLC
 * Built with <3 in Dubai
 */

const fs = require('fs');
const path = require('path');

class GeoLocations {
  constructor() {
    this.dataPath = path.join(__dirname, 'data');
    this.countriesData = null;
    this.currenciesData = null;
    this.flagsData = null;
    this.locationsCache = {};
  }

  /**
   * Load countries data
   * @returns {Array} Array of country objects
   */
  getCountries() {
    if (!this.countriesData) {
      try {
        const data = fs.readFileSync(path.join(this.dataPath, 'countries.json'), 'utf8');
        this.countriesData = JSON.parse(data);
      } catch (error) {
        throw new Error(`Failed to load countries data: ${error.message}`);
      }
    }
    return this.countriesData;
  }

  /**
   * Get a specific country by code
   * @param {string} code - The country code (e.g., 'US', 'GB')
   * @returns {Object|null} Country object or null if not found
   */
  getCountryByCode(code) {
    const countries = this.getCountries();
    return countries.find(country => country.code === code) || null;
  }

  /**
   * Get a specific country by name
   * @param {string} name - The country name
   * @returns {Object|null} Country object or null if not found
   */
  getCountryByName(name) {
    const countries = this.getCountries();
    return countries.find(country => country.name.toLowerCase() === name.toLowerCase()) || null;
  }

  /**
   * Load currencies data
   * @returns {Array} Array of currency objects
   */
  getCurrencies() {
    if (!this.currenciesData) {
      try {
        const data = fs.readFileSync(path.join(this.dataPath, 'currencies.json'), 'utf8');
        this.currenciesData = JSON.parse(data);
      } catch (error) {
        throw new Error(`Failed to load currencies data: ${error.message}`);
      }
    }
    return this.currenciesData;
  }

  /**
   * Get currency by country code
   * @param {string} countryCode - The country code (e.g., 'US', 'GB')
   * @returns {Object|null} Currency object or null if not found
   */
  getCurrencyByCountryCode(countryCode) {
    const currencies = this.getCurrencies();
    return currencies.find(currency => currency.country_code === countryCode) || null;
  }

  /**
   * Get currency by currency code
   * @param {string} currencyCode - The currency code (e.g., 'USD', 'EUR')
   * @returns {Object|null} First currency object that matches the currency code or null if not found
   */
  getCurrencyByCode(currencyCode) {
    const currencies = this.getCurrencies();
    return currencies.find(currency => currency.currency_code === currencyCode) || null;
  }

  /**
   * Load flags data
   * @returns {Object} Object of flag data keyed by country code
   */
  getFlags() {
    if (!this.flagsData) {
      try {
        const data = fs.readFileSync(path.join(this.dataPath, 'flags.json'), 'utf8');
        this.flagsData = JSON.parse(data);
      } catch (error) {
        throw new Error(`Failed to load flags data: ${error.message}`);
      }
    }
    return this.flagsData;
  }

  /**
   * Get flag by country code
   * @param {string} countryCode - The country code (e.g., 'US', 'GB')
   * @returns {Object|null} Flag object or null if not found
   */
  getFlagByCountryCode(countryCode) {
    const flags = this.getFlags();
    return flags[countryCode] || null;
  }

  /**
   * Load locations (states and cities) for a specific country
   * @param {string} countryCode - The country code (e.g., 'US', 'GB')
   * @returns {Object|null} Location object containing states and cities or null if not found
   */
  getLocationsByCountryCode(countryCode) {
    if (this.locationsCache[countryCode]) {
      return this.locationsCache[countryCode];
    }

    try {
      const filePath = path.join(this.dataPath, 'locations', `${countryCode}.json`);
      if (fs.existsSync(filePath)) {
        const data = fs.readFileSync(filePath, 'utf8');
        const locationData = JSON.parse(data);
        this.locationsCache[countryCode] = locationData;
        return locationData;
      }
      return null;
    } catch (error) {
      throw new Error(`Failed to load locations for ${countryCode}: ${error.message}`);
    }
  }

  /**
   * Get all states for a specific country
   * @param {string} countryCode - The country code (e.g., 'US', 'GB')
   * @returns {Object|null} Object containing states or null if not found
   */
  getStatesByCountryCode(countryCode) {
    const locationData = this.getLocationsByCountryCode(countryCode);
    return locationData?.states || null;
  }

  /**
   * Get cities for a specific state in a country
   * @param {string} countryCode - The country code (e.g., 'US', 'GB')
   * @param {string} stateCode - The state code (e.g., 'CA', 'NY')
   * @returns {Object|null} Object containing cities or null if not found
   */
  getCitiesByState(countryCode, stateCode) {
    const locationData = this.getLocationsByCountryCode(countryCode);
    if (!locationData?.states || !locationData.states[stateCode]) {
      return null;
    }
    return locationData.states[stateCode][2] || null;
  }

  /**
   * Get complete location data for a country including country, currency and flag information
   * @param {string} countryCode - The country code (e.g., 'US', 'GB')
   * @returns {Object|null} Complete data for the country or null if not found
   */
  getCompleteCountryData(countryCode) {
    const country = this.getCountryByCode(countryCode);
    if (!country) return null;

    const currency = this.getCurrencyByCountryCode(countryCode);
    const flag = this.getFlagByCountryCode(countryCode);
    const locations = this.getLocationsByCountryCode(countryCode);

    return {
      country,
      currency,
      flag,
      locations
    };
  }
}

module.exports = new GeoLocations();
