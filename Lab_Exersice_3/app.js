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

function updateUI(weatherData, cityName) {
    const current = weatherData.current_weather;
    const weatherInfo = getWeatherInfo(current.weathercode);

    // Update Current Weather Card
    document.querySelector('#city-name').textContent = cityName;
    document.querySelector('#current-temp').textContent = Math.round(current.temperature);
    document.querySelector('#weather-desc').textContent = weatherInfo.desc + " " + weatherInfo.icon;
    
    // Wind and Humidity (Assuming index 0 for current time)
    document.querySelector('#humidity').textContent = weatherData.hourly.relativehumidity_2m[0];
    document.querySelector('#wind-speed').textContent = current.windspeed;

    // Update 7-Day Forecast (Task 1.3 logic)
    const forecastContainer = document.querySelector('#forecast-container');
    forecastContainer.innerHTML = ''; // Clear skeleton cards

    for (let i = 0; i < 7; i++) {
        const date = new Date(weatherData.daily.time[i]);
        const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
        const maxTemp = Math.round(weatherData.daily.temperature_2m_max[i]);
        const minTemp = Math.round(weatherData.daily.temperature_2m_min[i]);
        const dayInfo = getWeatherInfo(weatherData.daily.weathercode[i]);

        const card = document.createElement('div');
        card.className = 'forecast-card';
        card.innerHTML = `
            <div>${dayName}</div>
            <div style="font-size: 2rem; margin: 10px 0;">${dayInfo.icon}</div>
            <div style="font-weight: 600;">${maxTemp}° / <span style="font-weight: 300;">${minTemp}°</span></div>
            <div style="font-size: 0.8rem; color: #666;">${dayInfo.desc}</div>
        `;
        forecastContainer.appendChild(card);
    }
}

// Task 4.18 - Debounce logic
function debounce(func, delay) {
    let timeout;
    return (...args) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), delay);
    };
}

// Task 4.17 - Validation check
function isValidSearch(city) {
    if (!city || city.trim().length < 2) {
        showError("Please enter at least 2 characters.");
        return false;
    }
    return true;
}

async function fetchWithTimeout(url, options = {}) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000);
    
    try {
        const response = await fetch(url, { 
            ...options, 
            signal: controller.signal 
        });
        clearTimeout(timeoutId);
        return response;
    } catch (error) {
        if (error.name === 'AbortError') {
            throw new Error("Request timed out. Please try again.");
        }
        throw error;
    }
}

// Task 3 - jQuery AJAX integration
function fetchLocalTime(timezone) {
    const timeUrl = `https://worldtimeapi.org/api/timezone/${timezone}`;

    // Task 3.11 & 3.14 - Using $.getJSON() with method chaining
    $.getJSON(timeUrl)
        .done(function(data) {
            // Task 3.12 - Map and display local time
            if (data && data.datetime) {
                const timeStr = new Date(data.datetime).toLocaleTimeString([], { 
                    hour: '2-digit', 
                    minute: '2-digit' 
                });
                document.querySelector('#local-time').textContent = timeStr;
            }
        })

        .fail(function() {
            // Task 3.13 - Fallback to browser's local time
            console.warn("Timezone API failed, using system time as fallback.");
            const fallbackTime = new Date().toLocaleTimeString([], { 
                hour: '2-digit', 
                minute: '2-digit' 
            });
            document.querySelector('#local-time').textContent = fallbackTime;
        })
        .always(function() {
            // Task 3.15 - Log timestamp of completion
            const timestamp = new Date().toLocaleTimeString();
            console.log(`[Time Sync Request Completed at ${timestamp}]`);
        });
}


async function handleSearch() {
    const city = cityInput.value.trim();
    
    if (!isValidSearch(city)) return;

    try {
        errorBanner.classList.add('hidden');
        toggleLoading(true);

        // 1. Resolve coordinates
        const locationData = await getCoordinates(city);
        if (!locationData) {
            toggleLoading(false);
            showError("City not found. Try another location.");
            return;
        }

        // 2. Fetch weather using resolved coordinates
        const weatherData = await getWeatherData(locationData.latitude, locationData.longitude);

        // 3. Update the display
        updateUI(weatherData, locationData.name);
        // NEW: Integration of Task 3
        if (locationData.timezone) {
            fetchLocalTime(locationData.timezone);
        } else {
            // Instant fallback if geocoder didn't return a timezone
            document.querySelector('#local-time').textContent = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        }
        
        
        // Task 3: Local time integration goes here (we will do this next)
        
    } catch (err) {
        showError(err.message || "An unexpected error occurred.");
    } finally {
        toggleLoading(false);
    }
}

// Attach the search to button click
searchBtn.addEventListener('click', handleSearch);

let currentUnit = 'C';
let lastTempData = null; // To store current temp without re-fetching

// Conversion logic
function toggleUnits() {
    const tempElement = document.querySelector('#current-temp');
    const toggleBtn = document.querySelector('#temp-toggle');
    let currentVal = parseFloat(tempElement.textContent);

    if (isNaN(currentVal)) return;

    if (currentUnit === 'C') {
        const fahrenheit = (currentVal * 9/5) + 32;
        tempElement.textContent = Math.round(fahrenheit);
        toggleBtn.textContent = "To °C";
        currentUnit = 'F';
    } else {
        const celsius = (currentVal - 32) * 5/9;
        tempElement.textContent = Math.round(celsius);
        toggleBtn.textContent = "To °F";
        currentUnit = 'C';
    }
}

document.querySelector('#temp-toggle').addEventListener('click', toggleUnits);

const debouncedSearch = debounce(() => {
    // We only trigger automatically if there are 3+ chars
    if (cityInput.value.length >= 3) {
        handleSearch();
    }
}, 500);

cityInput.addEventListener('input', debouncedSearch);


/**
 * RECENT SEARCHES PERSISTENCE
 */
const MAX_HISTORY = 5;

// Save name to localStorage
function saveSearch(cityName) {
    let history = JSON.parse(localStorage.getItem('weatherHistory')) || [];
    
    // Remove duplicate if it exists to bring it to the front
    history = history.filter(item => item.toLowerCase() !== cityName.toLowerCase());
    
    // Add to beginning of array
    history.unshift(cityName);
    
    // Limit to 5 items
    if (history.length > MAX_HISTORY) {
        history.pop();
    }
    
    localStorage.setItem('weatherHistory', JSON.stringify(history));
    renderHistory();
}

// Draw the chips in the UI
function renderHistory() {
    const container = document.querySelector('#recent-searches');
    const history = JSON.parse(localStorage.getItem('weatherHistory')) || [];
    
    if (history.length === 0) {
        container.innerHTML = '';
        return;
    }

    container.innerHTML = history
        .map(city => `<span class="history-chip" onclick="searchHistoryCity('${city}')">${city}</span>`)
        .join('');
}

// Handler for when a history chip is clicked
window.searchHistoryCity = function(city) {
    cityInput.value = city;
    handleSearch();
};

// Ensure chips load when page opens
document.addEventListener('DOMContentLoaded', renderHistory);