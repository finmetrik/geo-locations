/**
 * Basic Usage Example for Geo-Locations
 * 
 * This example demonstrates the basic functionality of the geo-locations library
 * including accessing country data, currencies, flags, states and cities.
 */

const geoLocations = require('../src/index');

console.log('*** Geo-Locations Library Demo ***');
console.log('A comprehensive geographical data solution by Finmetrik IT Solutions LLC\n');

// Get all countries
console.log('>>> Total countries in the database:', geoLocations.getCountries().length);

// Get country by code
const us = geoLocations.getCountryByCode('US');
console.log('\n>>> Country information for US:');
console.log(us);

// Get country by name
const uae = geoLocations.getCountryByName('United Arab Emirates');
console.log('\n>>> Country information for UAE:');
console.log(uae);

// Get currency by country code
const euroCurrency = geoLocations.getCurrencyByCountryCode('FR');
console.log('\n>>> Currency for France:');
console.log(euroCurrency);

// Get currency by currency code
const usdCurrency = geoLocations.getCurrencyByCode('USD');
console.log('\n>>> USD Currency information:');
console.log(usdCurrency);

// Get flag by country code
const japanFlag = geoLocations.getFlagByCountryCode('JP');
console.log('\n>>> Flag information for Japan:');
console.log({
  name: japanFlag.name,
  code: japanFlag.code,
  emoji: japanFlag.emoji,
  svg_url: japanFlag.svg_url
});

// Get states for a country
const usStates = geoLocations.getStatesByCountryCode('US');
console.log('\n>>> Number of states in US:', Object.keys(usStates).length);
console.log('First few states:');
let stateCount = 0;
for (const [stateCode, stateInfo] of Object.entries(usStates)) {
  if (stateCount < 3) {
    console.log(`${stateCode}: ${stateInfo[1]}`);
    stateCount++;
  } else {
    break;
  }
}

// Get cities for a state
const citiesInCalifornia = geoLocations.getCitiesByState('US', 'CA');
console.log('\n>>> Cities in California:');
let cityCount = 0;
for (const [cityId, cityName] of Object.entries(citiesInCalifornia)) {
  if (cityCount < 5) {
    console.log(`${cityId}: ${cityName}`);
    cityCount++;
  } else {
    break;
  }
}

// Get complete data for a country
const indiaData = geoLocations.getCompleteCountryData('IN');
console.log('\n>>> Complete information for India:');
console.log('Country:', indiaData.country.name);
console.log('Currency:', indiaData.currency.currency_name);
console.log('Flag:', indiaData.flag.emoji);
console.log('Number of states:', Object.keys(indiaData.locations.states).length);

console.log('\n*** Demo Complete ***');
