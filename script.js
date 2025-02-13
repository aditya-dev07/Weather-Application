const inputBox = document.querySelector(".input-box");
const searchBtn = document.getElementById("searchBtn");
const weather_img = document.querySelector(".weather-img");
const temperature = document.querySelector(".temperature");
const description = document.querySelector(".description");
const humidity = document.getElementById("humidity");
const wind_speed = document.getElementById("wind-speed");

const location_not_found = document.querySelector(".location-not-found");
const weather_body = document.querySelector(".weather-body");
const toggle = document.getElementById("toggle-celsius-fahrenheit");

let tempInCelsius;

async function checkWeather(city) {
  const api_key = "YOUR_API_KEY";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`;

  const weather_data = await fetch(`${url}`).then((response) =>
    response.json()
  );

  if (weather_data.cod === `404`) {
    location_not_found.style.display = "flex";
    weather_body.style.display = "none";
    document.body.className = "default";
    return;
  }

  location_not_found.style.display = "none";
  weather_body.style.display = "flex";
  tempInCelsius = weather_data.main.temp - 273.15;
  updateTemperature();

  description.innerHTML = `${weather_data.weather[0].description}`;
  humidity.innerHTML = `${weather_data.main.humidity}%`;
  wind_speed.innerHTML = `${weather_data.wind.speed} Km/H`;

  updateWeatherBackground(weather_data.weather[0].main);

  if (weather_data.weather[0].main === "Clouds") {
    weather_img.src = "/images/cloud.png";
  } else if (weather_data.weather[0].main === "Clear") {
    weather_img.src = "/images/clear.png";
  } else if (weather_data.weather[0].main === "Rain") {
    weather_img.src = "/images/rain.png";
  } else if (weather_data.weather[0].main === "Mist") {
    weather_img.src = "/images/mist.png";
  } else if (weather_data.weather[0].main === "Snow") {
    weather_img.src = "/images/snow.png";
  }

  console.log(weather_data);
}

function updateWeatherBackground(weatherCondition) {
  if (weatherCondition === "Clear") {
    document.body.className = "sunny";
  } else if (weatherCondition === "Clouds") {
    document.body.className = "cloudy";
  } else if (weatherCondition === "Rain") {
    document.body.className = "rainy";
  } else if (weatherCondition === "Mist") {
    document.body.className = "mist";
  } else if (weatherCondition === "Snow") {
    document.body.className = "snow";
  } else {
    document.body.className = "default";
  }
}

function updateTemperature() {
  if (toggle.checked) {
    // Convert to Fahrenheit
    temperature.innerHTML = `${Math.round((tempInCelsius * 9) / 5 + 32)}°F`;
  } else {
    // Display in Celsius
    temperature.innerHTML = `${Math.round(tempInCelsius)}°C`;
  }
}

toggle.addEventListener("change", updateTemperature);
searchBtn.addEventListener("click", () => {
  checkWeather(inputBox.value);
});
