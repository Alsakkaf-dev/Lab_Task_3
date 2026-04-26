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

async function getCoordinates(city) {
    try {
        const response = await fetch(`${GEO_API_URL}?name=${city}&count=1&language=en&format=json`);
        
        // Task 4.16 - Handling HTTP errors explicitly
        if (!response.ok) {
            throw new Error(`HTTP Error: ${response.status}`);
        }

        const data = await response.json();

        // Task 2.6 - If no city is found, return null instead of throwing
        if (!data.results || data.results.length === 0) {
            return null;
        }

        return data.results[0]; // Return first match: {latitude, longitude, name, timezone}
    } catch (error) {
        console.error("Geocoding Error:", error);
        throw error;
    }
}

async function getWeatherData(lat, lon) {
    const params = new URLSearchParams({
        latitude: lat,
        longitude: lon,
        current_weather: true,
        hourly: 'temperature_2m,relativehumidity_2m',
        daily: 'temperature_2m_max,temperature_2m_min,weathercode',
        timezone: 'auto',
        windspeed_unit: 'kmh'
    });

    const response = await fetch(`${WEATHER_API_URL}?${params.toString()}`);
    
    if (!response.ok) {
        throw new Error(`Weather API Error: ${response.status}`);
    }

    return await response.json();
}