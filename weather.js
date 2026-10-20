const searchForm = document.querySelector('.search-form');
const cityInput = document.querySelector('.city-input');
const weatherDisplay = document.querySelector('.weather-display');

// Your OpenWeatherMap API key
const apiKey = "<YOUR_API_KEY>";

searchForm.addEventListener('submit', async function(event) {
    event.preventDefault();
    
    const cityName = cityInput.value.trim();

    if (cityName === "") {
        alert("Please enter a valid city name.");
        return;
    }

    await fetchWeatherData(cityName);
});

// Asynchronous function to talk to OpenWeatherMap
async function fetchWeatherData(city) {
    try {
        // 1. Show loading state
        weatherDisplay.innerHTML = `<p>Loading weather for ${city}...</p>`;

        // 2. Build the API URL using your city name and API key (requesting metric units for Celsius)
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

        const response = await fetch(url);
        const data = await response.json();

        // 3. Check if the city was found (OpenWeather returns a 'cod' property, where 200 means success)
        if (data.cod !== 200) {
            weatherDisplay.innerHTML = `<p style="color: red;">City not found. Please try another name!</p>`;
            return;
        }

        // 4. Display the weather results
        displayWeatherCard(data);

    } catch (error) {
        console.error("Error fetching weather:", error);
        weatherDisplay.innerHTML = `<p style="color: red;">Something went wrong. Check your connection.</p>`;
    }
}

// Function to inject the weather details into your card
function displayWeatherCard(data) {
    const cityName = data.name;
    const country = data.sys.country;
    const temp = Math.round(data.main.temp); // Rounds the temperature to a whole number
    const description = data.weather[0].description;
    const windSpeed = data.wind.speed;

    weatherDisplay.innerHTML = `
        <h2>${cityName}, ${country}</h2>
        <p class="temp" style="font-size: 24px; font-weight: bold;">${temp}°C</p>
        <p class="desc" style="text-transform: capitalize;">Condition: ${description}</p>
        <p class="wind">Wind Speed: ${windSpeed} m/s</p>
    `;
}

// Show loading spinner
weatherDisplay.innerHTML = `
    <p>Loading weather...</p>
    <div class="spinner"></div>
`;




function displayWeatherCard(data) {
    const cityName = data.name;
    const country = data.sys.country;
    const temp = Math.round(data.main.temp);
    const description = data.weather[0].description;
    const windSpeed = data.wind.speed;
    
    // 1. Grab the icon code from the API response (e.g., "10d")
    
    const iconCode = data.weather[0].icon;
    
    // 2. Build the official OpenWeatherMap icon image URL (@2x makes it high resolution)
    
    const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

    // 3. Inject the <img> tag directly into your HTML template string
    
    weatherDisplay.innerHTML = `
        <h2>${cityName}, ${country}</h2>
        <img src="${iconUrl}" alt="Weather Icon" class="weather-icon">
        <p class="temp">${temp}°C</p>
        <p class="desc">${description}</p>
        <p class="wind">Wind Speed: ${windSpeed} m/s</p>
    `;
}


// Function inside your script.js

function saveRecentSearch(cityName) {
    // Get existing searches from localStorage, or start with an empty array
    
    let searches = JSON.parse(localStorage.getItem('recentSearches')) || [];

    // Capitalize nicely and avoid exact duplicates
    
    const formattedCity = cityName.charAt(0).toUpperCase() + cityName.slice(1).toLowerCase();
    
    if (!searches.includes(formattedCity)) {
        searches.unshift(formattedCity); // Add to the front of the array
        if (searches.length > 5) searches.pop(); // Keep only the last 5 searches
        localStorage.setItem('recentSearches', JSON.stringify(searches));
    }

    renderRecentSearches();
}

function renderRecentSearches() {
    const container = document.getElementById('recentSearches');
    const searches = JSON.parse(localStorage.getItem('recentSearches')) || [];

    if (searches.length === 0) {
        container.innerHTML = '';
        return;
    }

    // Generate HTML buttons for each recent search
    
    container.innerHTML = `
        <p style="font-size: 14px; margin-bottom: 5px; opacity: 0.8;">Recent Searches:</p>
        <div style="display: flex; gap: 8px; justify-content: center; flex-wrap: wrap;">
            ${searches.map(city => `<button class="recent-btn" onclick="searchCity('${city}')" style="padding: 6px 12px; font-size: 13px; background: #e2e8f0; color: #1e293b; border: none; border-radius: 6px; cursor: pointer;">${city}</button>`).join('')}
        </div>
    `;
}

// Call renderRecentSearches() when the page loads so old searches show up immediately
window.addEventListener('DOMContentLoaded', renderRecentSearches);






function displayWeatherCard(data) {
    const cityName = data.name;
    const country = data.sys.country;
    const temp = Math.round(data.main.temp);
    const description = data.weather[0].description;
    const windSpeed = data.wind.speed;
    const iconCode = data.weather[0].icon;
    const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

    // 1. Reset class name back to base so old gradients are cleared out
    
    weatherDisplay.className = "weather-display";

    // 2. Grab the weather condition string and convert to lowercase
    
    const condition = data.weather[0].main.toLowerCase();

    // 3. Conditional logic to apply the right theme class
    
    if (condition.includes('rain') || condition.includes('drizzle') || condition.includes('thunderstorm')) {
        weatherDisplay.classList.add('rainy');
    } else if (condition.includes('snow') || temp < 5) {
        weatherDisplay.classList.add('cold');
    } else if (condition.includes('clear')) {
        weatherDisplay.classList.add('sunny');
    } else {
        weatherDisplay.classList.add('cloudy'); // Default fallback for clouds, mist, etc.
    }

    // 4. Inject the HTML content into the card
    
    weatherDisplay.innerHTML = `
        <h2>${cityName}, ${country}</h2>
        <img src="${iconUrl}" alt="Weather Icon" class="weather-icon">
        <p class="temp">${temp}°C</p>
        <p class="desc">${description}</p>
        <p class="wind">Wind Speed: ${windSpeed} m/s</p>
    `;
}


JavaScript

async function fetchWeatherData(city) {
    try {
        weatherDisplay.innerHTML = `<p>Loading weather for ${city}...</p>`;

        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
        const response = await fetch(url);
        const data = await response.json();

        // Check if OpenWeatherMap returned a 404 error (City not found)
        
        if (response.status === 404 || data.cod !== 200) {
            weatherDisplay.innerHTML = `<p style="color: #fee2e2; background: rgba(239, 68, 68, 0.2); padding: 15px; border-radius: 8px;">City not found ("${city}"). Please check your spelling and try again!</p>`;
            return;
        }

        displayWeatherCard(data);

    } catch (error) {
        console.error("Error fetching weather:", error);
        weatherDisplay.innerHTML = `<p style="color: red;">Something went wrong. Check your connection.</p>`;
    }
}

function displayWeatherCard(data) {
    const cityName = data.name;
    const country = data.sys.country;
    const temp = Math.round(data.main.temp);
    const description = data.weather[0].description;
    const windSpeed = data.wind.speed;
    const iconCode = data.weather[0].icon; // e.g., "01d" or "01n"
    const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

    // 1. Reset class name back to base

    weatherDisplay.className = "weather-display";

    const condition = data.weather[0].main.toLowerCase();

    // 2. Check if it's nighttime (icon code ends with 'n')

    if (iconCode.endsWith('n')) {
        weatherDisplay.classList.add('night');
    } 
    // 3. Otherwise, use your regular weather condition checks

    else if (condition.includes('rain') || condition.includes('drizzle') || condition.includes('thunderstorm')) {
        weatherDisplay.classList.add('rainy');
    } else if (condition.includes('snow') || temp < 5) {
        weatherDisplay.classList.add('cold');
    } else if (condition.includes('clear')) {
        weatherDisplay.classList.add('sunny');
    } else {
        weatherDisplay.classList.add('cloudy');
    }

    // 4. Inject the HTML content
    weatherDisplay.innerHTML = `
        <h2>${cityName}, ${country}</h2>
        <img src="${iconUrl}" alt="Weather Icon" class="weather-icon">
        <p class="temp">${temp}°C</p>
        <p class="desc">${description}</p>
        <p class="wind">Wind Speed: ${windSpeed} m/s</p>
    `;
}

const themeToggleBtn = document.getElementById('themeToggle');
