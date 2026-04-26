// DOM Element Selections
const searchBtn = document.querySelector('#search-btn');
const cityInput = document.querySelector('#city-input');
const errorBanner = document.querySelector('#error-banner');

// API Endpoints as constants
const GEO_API_URL = 'https://geocoding-api.open-meteo.com/v1/search';
const WEATHER_API_URL = 'https://api.open-meteo.com/v1/forecast';