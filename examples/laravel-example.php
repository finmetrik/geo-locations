<?php
/**
 * Laravel Example for Geo-Locations API
 * 
 * This example demonstrates how to integrate the geo-locations data
 * in a Laravel application using Guzzle HTTP client.
 */

namespace App\Services;

use GuzzleHttp\Client;
use Illuminate\Support\Facades\Cache;

class GeoLocationsService
{
    protected $client;
    protected $baseUrl;
    protected $cacheTtl = 86400; // 24 hours cache

    /**
     * Create a new GeoLocations service instance.
     *
     * @param bool $useCdn Whether to use the CDN instead of API
     * @return void
     */
    public function __construct($useCdn = false)
    {
        $this->baseUrl = $useCdn ? 'https://cdn.geo-locations.com' : 'https://geo-locations.com/api';
        $this->client = new Client([
            'base_uri' => $this->baseUrl,
            'timeout'  => 5.0,
        ]);
    }

    /**
     * Make an API request with caching.
     *
     * @param string $endpoint
     * @return array
     */
    protected function request($endpoint)
    {
        return Cache::remember('geo_locations_' . md5($endpoint), $this->cacheTtl, function () use ($endpoint) {
            $response = $this->client->get($endpoint);
            return json_decode($response->getBody(), true);
        });
    }

    /**
     * Get all countries.
     *
     * @return array
     */
    public function getCountries()
    {
        return $this->request('/countries');
    }

    /**
     * Get country by code.
     *
     * @param string $code
     * @return array
     */
    public function getCountryByCode($code)
    {
        return $this->request('/countries/' . $code);
    }

    /**
     * Get country by name.
     *
     * @param string $name
     * @return array|null
     */
    public function getCountryByName($name)
    {
        $countries = $this->getCountries();
        foreach ($countries as $country) {
            if (strcasecmp($country['name'], $name) === 0) {
                return $country;
            }
        }
        
        return null;
    }

    /**
     * Get all currencies.
     *
     * @return array
     */
    public function getCurrencies()
    {
        return $this->request('/currencies');
    }

    /**
     * Get currency by country code.
     *
     * @param string $countryCode
     * @return array
     */
    public function getCurrencyByCountryCode($countryCode)
    {
        return $this->request('/currencies/country/' . $countryCode);
    }

    /**
     * Get currency by currency code.
     *
     * @param string $currencyCode
     * @return array
     */
    public function getCurrencyByCode($currencyCode)
    {
        return $this->request('/currencies/' . $currencyCode);
    }

    /**
     * Get all flags.
     *
     * @return array
     */
    public function getFlags()
    {
        return $this->request('/flags');
    }

    /**
     * Get flag by country code.
     *
     * @param string $countryCode
     * @return array
     */
    public function getFlagByCountryCode($countryCode)
    {
        return $this->request('/flags/' . $countryCode);
    }

    /**
     * Get states by country code.
     *
     * @param string $countryCode
     * @return array
     */
    public function getStatesByCountryCode($countryCode)
    {
        return $this->request('/locations/' . $countryCode . '/states');
    }

    /**
     * Get cities by state.
     *
     * @param string $countryCode
     * @param string $stateCode
     * @return array
     */
    public function getCitiesByState($countryCode, $stateCode)
    {
        return $this->request('/locations/' . $countryCode . '/states/' . $stateCode . '/cities');
    }

    /**
     * Get complete country data.
     *
     * @param string $countryCode
     * @return array
     */
    public function getCompleteCountryData($countryCode)
    {
        return $this->request('/complete/' . $countryCode);
    }
}

/**
 * Example usage in a Laravel Controller:
 * 
 * namespace App\Http\Controllers;
 * 
 * use App\Http\Controllers\Controller;
 * use App\Services\GeoLocationsService;
 * 
 * class LocationController extends Controller
 * {
 *     protected $geoLocations;
 * 
 *     public function __construct(GeoLocationsService $geoLocations)
 *     {
 *         $this->geoLocations = $geoLocations;
 *     }
 * 
 *     public function countries()
 *     {
 *         return response()->json($this->geoLocations->getCountries());
 *     }
 * 
 *     public function country($code)
 *     {
 *         return response()->json($this->geoLocations->getCountryByCode($code));
 *     }
 * 
 *     public function states($countryCode)
 *     {
 *         return response()->json($this->geoLocations->getStatesByCountryCode($countryCode));
 *     }
 * 
 *     public function cities($countryCode, $stateCode)
 *     {
 *         return response()->json($this->geoLocations->getCitiesByState($countryCode, $stateCode));
 *     }
 * }
 */
