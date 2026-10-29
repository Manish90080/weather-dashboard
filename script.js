const cityInput = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchBtn");
const loading = document.getElementById("loading");
const errorDiv = document.getElementById("error");
const weatherCard = document.getElementById("weatherCard");

const cityName = document.getElementById("cityName");
const temperature = document.getElementById("temperature");
const humidity = document.getElementById("humidity");
const wind = document.getElementById("wind");
const condition = document.getElementById("condition");

// Replace with your OpenWeatherMap API Key
const API_KEY = "YOUR_API_KEY";

async function getWeather(city) {
    try {
        loading.classList.remove("hidden");
        weatherCard.classList.add("hidden");
        errorDiv.textContent = "";

        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
        );

        if (!response.ok) {
            throw new Error("City not found");
        }

        const data = await response.json();

        displayWeather(data);
    } catch (error) {
        errorDiv.textContent = error.message;
    } finally {
        loading.classList.add("hidden");
    }
}

function displayWeather(data) {
    cityName.textContent = `${data.name}, ${data.sys.country}`;
    temperature.textContent = `🌡 Temperature: ${data.main.temp} °C`;
    humidity.textContent = `💧 Humidity: ${data.main.humidity}%`;
    wind.textContent = `🌬 Wind Speed: ${data.wind.speed} m/s`;
    condition.textContent = `☁ Condition: ${data.weather[0].description}`;

    weatherCard.classList.remove("hidden");
}

searchBtn.addEventListener("click", () => {
    const city = cityInput.value.trim();

    if (city !== "") {
        getWeather(city);
    }
});

cityInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        searchBtn.click();
    }
});