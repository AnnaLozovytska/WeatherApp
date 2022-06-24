function searchCity(event) {
  event.preventDefault();
  let inputCityName = document.querySelector("#input-city").value;
  let cityName = document.querySelector("#city-name");
  let apiUrlCurrentCity = `https://api.openweathermap.org/data/2.5/weather?q=${inputCityName}&appid=${apiKey}&&units=metric`;
  if (inputCityName) {
    axios.get(apiUrlCurrentCity).then(currentWeather);
    cityName.innerHTML = inputCityName;
  } else {
    cityName.innerHTML = null;
    alert("Please type a city");
  }
}

function getGorecast(coordinates) {
  console.log(coordinates);

  let apiKey = "5761993d693e3553594e3f4afeabb8b6";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function formatDateForecast(timestamp) {
  let date = new Date(timestamp);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  day = days[day];
  let months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  let month = months[date.getMonth()];
  let dateNumber = date.getUTCDate();
  let dateStringForecast = `${day} <br /> ${dateNumber} ${month}`;
  return dateStringForecast;
}

function displayForecast(response) {
  console.log(formatDateForecast(response.data.daily[0].dt * 1000));
  console.log(formatDateForecast(response.data.daily[1].dt * 1000));
  console.log(response.data);
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = "";
  forecastHTML = `<div class="row">`;

  for (let i = 1; i < 6; i++) {
    forecastHTML =
      forecastHTML +
      `
              <div class="col col-day">
                <p class="title-day">
                  ${formatDateForecast(
                    response.data.daily[i].dt * 1000
                  )}                  
                </p>
                <img src="http://openweathermap.org/img/wn/${
                  response.data.daily[i].weather[0].icon
                }@2x.png" alt="Cloudy" id="icon-forecast"> 
                <h5 class="temp-day">
                  <span>${Math.round(
                    response.data.daily[i].temp.max
                  )}&#176</span>
                  <span class="min-temp">${Math.round(
                    response.data.daily[i].temp.min
                  )}&#176</span>                               
                </h5>
              </div>              
  `;
  }
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function currentWeather(response) {
  let currentTemp = Math.round(response.data.main.temp);
  let tempNow = document.querySelector("#temper-now");
  let cityName = document.querySelector("#city-name");
  let precipitation = document.querySelector("#precipitation");
  let wind = document.querySelector("#wind");
  let sunrise = document.querySelector("#sunrise");
  let sunset = document.querySelector("#sunset");
  let iconMain = document.querySelector("#icon-main");
  let description = document.querySelector("#description");
  console.log(currentTemp);
  console.log(response.data.name);
  console.log(response.data.dt);
  cityName.innerHTML = response.data.name;
  tempNow.innerHTML = `${currentTemp}`;
  precipitation.innerHTML = response.data.main.humidity;
  wind.innerHTML = response.data.wind.speed;
  description.innerHTML = response.data.weather[0].description;
  sunrise.innerHTML = timeSunRiseSet(response.data.sys.sunrise * 1000);
  sunset.innerHTML = timeSunRiseSet(response.data.sys.sunset * 1000);
  iconMain.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  getGorecast(response.data.coord);

  return currentTemp;
}

function formatDate(newData) {
  let now = newData;
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[now.getDay()];
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let month = months[now.getMonth()];
  let date = now.getUTCDate();
  let hour = now.getHours();
  let minute = now.getMinutes();
  if (minute < 10) {
    minute = "0" + minute;
  }
  if (hour < 10) {
    hour = "0" + hour;
  }
  let currentDate = `${day} ${hour}:${minute} - ${date} ${month}`;
  return currentDate;
}

function curPosition(position) {
  let inputCityName = document.querySelector("#input-city");
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "5761993d693e3553594e3f4afeabb8b6";
  let apiUrlCurrentPosition = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&&units=metric`;
  axios.get(apiUrlCurrentPosition).then(currentWeather);
  inputCityName = document.getElementById("#search").reset();
  console.log(position.coords.latitude);
  console.log(position.coords.longitude);
}
function naviCurrent(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(curPosition);
}

function timeSunRiseSet(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${hours}:${minutes}`;
}

function celsiusToFahrenheit(celsius) {
  let temperNow = document.querySelector("#temper-now");
  let fahrenheit = (celsius * 9) / 5 + 32;
  temperNow.innerHTML = Math.round(fahrenheit);
  console.log(fahrenheit);
  return fahrenheit;
}
function changeUnitsCtoF(event) {
  event.preventDefault();
  let temperCurrent = document.querySelector("#temper-now").innerHTML;
  console.log(temperCurrent);
  let temperNowInF = celsiusToFahrenheit(temperCurrent);
  console.log(temperNowInF);
  return temperCurrent;
}
function changeUnitsFtoC(event) {
  event.preventDefault();
  let inputCityName = document.querySelector("#city-name").innerHTML;
  console.log(inputCityName);
  let apiKey = "5761993d693e3553594e3f4afeabb8b6";
  let apiUrlCurrentCity = `https://api.openweathermap.org/data/2.5/weather?q=${inputCityName}&appid=${apiKey}&&units=metric`;
  axios.get(apiUrlCurrentCity).then(currentTemp);
  return temperNow;
}
function currentTemp(response) {
  let temperCurrent = document.querySelector("#temper-now");
  let currentTemp = Math.round(response.data.main.temp);
  temperCurrent.innerHTML = `${currentTemp}`;
}

let form = document.querySelector("form");
let butSubmit = document.querySelector("#but-submit");
butSubmit.addEventListener("click", searchCity);

let currentTime = new Date();
let pNowTime = document.querySelector("#now-date");
pNowTime.innerHTML = formatDate(currentTime);

let buttonCurrent = document.querySelector("#but-current");
buttonCurrent.addEventListener("click", naviCurrent);

let CityNameDefault = `Kyiv`;
let apiKey = "5761993d693e3553594e3f4afeabb8b6";
let apiUrlCurrentCityDefault = `https://api.openweathermap.org/data/2.5/weather?q=${CityNameDefault}&appid=${apiKey}&&units=metric`;
axios.get(apiUrlCurrentCityDefault).then(currentWeather);

let temperNow = document.querySelector("#temper-now").innerText;
let temperCel = document.querySelector("#temper-now").innerText;
let unitCel = document.querySelector("#celsius");
let unitFahr = document.querySelector("#fahrenheit");
unitFahr.addEventListener("click", changeUnitsCtoF);
unitCel.addEventListener("click", changeUnitsFtoC);
