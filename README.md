# Geo-Locations

A comprehensive geo-location JSON dataset covering countries, states, cities, currencies, and flags worldwide.

[![Built with <3 in Dubai](https://img.shields.io/badge/Built_with_❤️_in-Dubai-red)](https://finmetrik.com)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Website](https://img.shields.io/badge/Website-geo--locations.com-blue)](https://geo-locations.com)
[![CDN Access](https://img.shields.io/badge/CDN-Available-brightgreen)](https://cdn.geo-locations.com)

## Overview

Geo-Locations is a powerful and easy-to-use library that provides access to worldwide geographical data. This project saves thousands of lines of code and eliminates the need for complex database tables by providing direct access to well-structured JSON files containing comprehensive location data.

## Features

- 🌎 **Countries** - Complete list of countries with codes, names, phone codes, currencies and timezones
- 🏙️ **States & Cities** - Detailed state and city information for each country
- 💰 **Currencies** - Comprehensive currency data including codes, symbols, decimal digits
- 🏁 **Flags** - Flag information including emoji, SVG/PNG URLs, colors, and CSS classes
- 🌐 **CDN Access** - Direct access to all data via CDN without downloading

## Installation

### NPM Package

```bash
npm install geo-locations
```

### Clone Repository

```bash
git clone https://github.com/finmetrik/geo-locations.git
cd geo-locations
npm install
```

### Direct CDN Access

All data is also available directly from our CDN without installation:

```
https://cdn.geo-locations.com/countries
https://cdn.geo-locations.com/currencies
https://cdn.geo-locations.com/flags
```

Or visit [geo-locations.com](https://geo-locations.com) for full API documentation.

## Usage

### Multiple Language Support

Geo-Locations supports various programming languages and frameworks. See our examples directory for detailed implementations:

- [JavaScript/Node.js](examples/basic-usage.js)
- [Browser JavaScript](examples/browser-usage.html)
- [Laravel/PHP](examples/laravel-example.php)
- [Python](examples/python-example.py)

### Basic Import for Node.js

```javascript
const geoLocations = require('geo-locations');
```

### Getting Country Information

```javascript
// Get all countries
const allCountries = geoLocations.getCountries();

// Get country by code
const usa = geoLocations.getCountryByCode('US');

// Get country by name
const uae = geoLocations.getCountryByName('United Arab Emirates');
```

### Working with Currencies

```javascript
// Get all currencies
const allCurrencies = geoLocations.getCurrencies();

// Get currency by country code
const franceEuro = geoLocations.getCurrencyByCountryCode('FR');

// Get currency by currency code
const usd = geoLocations.getCurrencyByCode('USD');
```

### Accessing Flags

```javascript
// Get all flags
const allFlags = geoLocations.getFlags();

// Get flag by country code
const japanFlag = geoLocations.getFlagByCountryCode('JP');
console.log(japanFlag.emoji); // 🇯🇵
console.log(japanFlag.svg_url); // https://flagcdn.com/JP.svg
```

### Working with Locations (States & Cities)

```javascript
// Get all states for a country
const usStates = geoLocations.getStatesByCountryCode('US');

// Get cities for a specific state
const citiesInCalifornia = geoLocations.getCitiesByState('US', 'CA');
```

### Complete Country Information

```javascript
// Get all information for a country (country, currency, flag, and locations)
const indiaInfo = geoLocations.getCompleteCountryData('IN');
```

## API Documentation

### Countries

- `getCountries()` - Returns array of all countries
- `getCountryByCode(code)` - Returns country object for given code
- `getCountryByName(name)` - Returns country object for given name

### Currencies

- `getCurrencies()` - Returns array of all currencies
- `getCurrencyByCountryCode(countryCode)` - Returns currency object for given country code
- `getCurrencyByCode(currencyCode)` - Returns currency object for given currency code

### Flags

- `getFlags()` - Returns object of all flags
- `getFlagByCountryCode(countryCode)` - Returns flag object for given country code

### Locations

- `getLocationsByCountryCode(countryCode)` - Returns location object for given country code
- `getStatesByCountryCode(countryCode)` - Returns states object for given country code
- `getCitiesByState(countryCode, stateCode)` - Returns cities object for given country and state code

### Complete Data

- `getCompleteCountryData(countryCode)` - Returns complete data object for given country code

## Data Structure

### Country Object Structure

```json
{
  "id": 2,
  "code": "AE", 
  "name": "United Arab Emirates",
  "phone_code": "+971",
  "currency": "AED",
  "timezone": "Asia/Dubai"
}
```

### Currency Object Structure

```json
{
  "id": 2,
  "country": "United Arab Emirates",
  "country_code": "AE",
  "currency_code": "AED",
  "currency_name": "United Arab Emirates Dirham",
  "symbol": "AED",
  "native_symbol": "د.إ.‏",
  "decimal_digits": 2,
  "rounding": 0,
  "name_plural": "UAE dirhams"
}
```

### Flag Object Structure

```json
{
  "id": 2,
  "name": "United Arab Emirates",
  "code": "AE",
  "code3": "ARE",
  "numeric": "784",
  "emoji": "🇦🇪",
  "unicode": "U+1F1E6 U+1F1EA",
  "svg_url": "https://flagcdn.com/AE.svg",
  "png_url": "https://flagcdn.com/w320/AE.png",
  "cdn_urls": {
    // Various CDN URLs...
  },
  "css_class": "flag-AE",
  "colors": {
    "primary": "#00732F",
    "secondary": "#FFFFFF",
    "tertiary": "#FF0000",
    "quaternary": "#000000"
  },
  "aspect_ratio": "3:2",
  "emoji_qualified": true
}
```

### Location Object Structure

```json
{
  "country": {
    "id": 1,
    "code": "US",
    "name": "United States",
    "phone_code": "+1"
  },
  "states": {
    "CA": [5, "California", {
      "41": "Los Angeles",
      "42": "San Diego",
      "43": "San Jose",
      // More cities...
    }],
    // More states...
  }
}
```

## Benefits

- **Simplified Integration** - No need for complex database setup or API calls
- **Performance** - Fast, local data access without external dependencies
- **Comprehensive** - Complete worldwide geographical data in one package
- **Lightweight** - Efficient JSON format keeps the footprint small
- **Well-structured** - Consistent and intuitive data organization
- **CDN Delivery** - Direct access to data through CDN without downloading the package
- **Multiple Languages** - Support for JavaScript, PHP/Laravel, Python, and more

## Use Cases

- E-commerce shipping and address forms
- User registration with location selection
- Travel and booking applications
- Financial applications with currency conversion
- CRM systems with international client data

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## CDN Access

All geo-locations data is available via our CDN. You can access it directly using these endpoints:

```
# All countries list
https://cdn.geo-locations.com/countries

# Specific country by code
https://cdn.geo-locations.com/countries/US

# All currencies
https://cdn.geo-locations.com/currencies

# Currency by country code
https://cdn.geo-locations.com/currencies/country/US

# Currency by currency code
https://cdn.geo-locations.com/currencies/USD

# All flags
https://cdn.geo-locations.com/flags

# Flag by country code
https://cdn.geo-locations.com/flags/JP

# States by country code
https://cdn.geo-locations.com/locations/US/states

# Cities by state
https://cdn.geo-locations.com/locations/US/states/CA/cities

# Complete country data
https://cdn.geo-locations.com/complete/IN
```

The same endpoints are available on our API server at `https://geo-locations.com/api/`.

## About

Created by [Finmetrik IT Solutions LLC](https://finmetrik.com)

Built with ❤️ in Dubai
