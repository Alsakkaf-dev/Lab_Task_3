// DOM Element Selections
const searchBtn = document.querySelector('#search-btn');
const cityInput = document.querySelector('#city-input');
const errorBanner = document.querySelector('#error-banner');

// API Endpoints as constants
const GEO_API_URL = 'https://geocoding-api.open-meteo.com/v1/search';
const WEATHER_API_URL = 'https://api.open-meteo.com/v1/forecast';

// Weather code mapping based on WMO (World Meteorological Organization)
const weatherCodeMap = {
    0: { desc: "Clear Sky", icon: "☀️" },
    1: { desc: "Mainly Clear", icon: "🌤️" },
    2: { desc: "Partly Cloudy", icon: "⛅" },
    3: { desc: "Overcast", icon: "☁️" },
    45: { desc: "Fog", icon: "🌫️" },
    48: { desc: "Depositing Rime Fog", icon: "🌫️" },
    51: { desc: "Light Drizzle", icon: "🌧️" },
    61: { desc: "Slight Rain", icon: "💧" },
    71: { desc: "Slight Snow", icon: "❄️" },
    95: { desc: "Thunderstorm", icon: "⛈️" }
    // Add more codes as needed or a default fallback
};

function getWeatherInfo(code) {
    return weatherCodeMap[code] || { desc: "Unknown Condition", icon: "🌡️" };
}

function toggleLoading(isLoading) {
    const skeletonElements = document.querySelectorAll('.skeleton-text, .forecast-card');
    
    skeletonElements.forEach(el => {
        if (isLoading) {
            el.classList.add('skeleton');
        } else {
            el.classList.remove('skeleton');
        }
    });
}

function showError(message) {
    errorBanner.textContent = message;
    errorBanner.classList.remove('hidden');
    // Helper to clear error when starting a new search
    setTimeout(() => errorBanner.classList.add('hidden'), 5000);
}