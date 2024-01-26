function updateWeather(response) {
  let weatherTempreture = document.querySelector("#weather-temperature");
  let temperature = response.data.temperature.current;
  let cityNameElement = document.querySelector("#city-name");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let timeElement = document.querySelector("#time");
  let date = new Date(response.data.time * 1000);
  let iconElement = document.querySelector("#icon");

  iconElement.innerHTML = `<img src="${response.data.condition.icon_url}" "class="weather-icon"/>`;
  cityNameElement.innerHTML = response.data.city;
  weatherTempreture.innerHTML = Math.round(temperature);
  timeElement.innerHTML = formatDate(date);
  descriptionElement.innerHTML = response.data.condition.description;
  humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
  windElement.innerHTML = `${response.data.wind.speed}km/h`;
}

function formatDate(date) {
  let hours = date.getHours();
  let minutes = date.getMinutes();

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${day} ${hours}:${minutes}`;
}

function searchForCity(city) {
  let apiKey = "003ed39ao8f2b2339d6b100400t60f78";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(updateWeather);
}

function searchElement(event) {
  event.preventDefault();
  let searchInputElement = document.querySelector("#search-input");

  searchForCity(searchInputElement.value);
}

let formElement = document.querySelector("#form-info");
formElement.addEventListener("submit", searchElement);

searchForCity("Cape Town");
