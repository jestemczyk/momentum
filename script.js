const userNameInput = document.querySelector(".greeting input");
const bgLeftArrow = document.getElementById("left-arrow");
const bgRightArrow = document.getElementById("right-arrow");
const weatherCityInput = document.querySelector(".weather input");
const weatherInfo = document.querySelector(".weather-info");
let bgCounter = localStorage.momentumBgCounter
  ? JSON.parse(localStorage.momentumBgCounter)
  : 1;
const daysOfWeek = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const monthsNames = [
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

function onloadFunction() {
  greetingTime();
  insertUserName(userNameInput);
  getNewTime();
  getRandomQuote();
  changeBg();
  weatherOnload();
}

function getNewTime() {
  let time = new Date();
  let hours = String(time.getHours());
  let minutes = String(time.getMinutes());
  let seconds = String(time.getSeconds());

  document.querySelector(".time-hours").textContent =
    hours.length > 1 ? hours : "0" + hours;
  document.querySelector(".time-minutes").textContent =
    minutes.length > 1 ? minutes : "0" + minutes;
  document.querySelector(".time-seconds").textContent =
    seconds.length > 1 ? seconds : "0" + seconds;
  document.querySelector(".date-day-of-week").textContent =
    daysOfWeek[time.getDay()] + ",";
  document.querySelector(".date-month").textContent =
    monthsNames[time.getMonth()];
  document.querySelector(".date-day-date").textContent = time.getDate();
}

function greetingTime() {
  const timeWords = [
    "Night",
    "Night",
    "Night",
    "Night",
    "Night",
    "Night",
    "Morning",
    "Morning",
    "Morning",
    "Morning",
    "Morning",
    "Afternoon",
    "Afternoon",
    "Afternoon",
    "Afternoon",
    "Afternoon",
    "Afternoon",
    "Evening",
    "Evening",
    "Evening",
    "Evening",
    "Evening",
    "Evening",
    "Night",
  ];
  let time = new Date();
  document.querySelector(".greeting-frase").innerText = `${
    timeWords[time.getHours()]
  },`;
}

function insertUserName(inpt) {
  inpt.value = localStorage.momentumUserName
    ? JSON.parse(localStorage.momentumUserName)
    : "";
}

async function getRandomQuote() {
  try {
    const response = await fetch("./json/quotes.json");
    if (!response.ok) {
      throw new error("Something went wrong with a quotes.json file");
    }
    const quotes = await response.json();
    insertRandomQuote(quotes);
  } catch (err) {
    console.error(err.message);
  }
}

function insertRandomQuote(quotes) {
  const quotesList = quotes.quotes_list;
  let randomNumber = Math.floor(Math.random() * 59);
  document.querySelector(
    ".quote-text"
  ).innerText = `"${quotesList[randomNumber].quote}"`;
  document.querySelector(".quote-author").innerText =
    quotesList[randomNumber].author;
}

function changeBg() {
  const timeKeyWords = [
    "night",
    "night",
    "night",
    "night",
    "night",
    "night",
    "morning",
    "morning",
    "morning",
    "morning",
    "morning",
    "afternoon",
    "afternoon",
    "afternoon",
    "afternoon",
    "afternoon",
    "afternoon",
    "evening",
    "evening",
    "evening",
    "evening",
    "evening",
    "evening",
    "night",
  ];
  let time = new Date();
  let currKeyWord = timeKeyWords[time.getHours()];
  document.querySelector(
    "body"
  ).style.background = `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url(./css/imgs/background-imgs/${currKeyWord}/${currKeyWord}-picture-${bgCounter}.jpg)`;

  localStorage.momentumBgCounter = JSON.stringify(bgCounter);
}

function bgLeft() {
  bgCounter = bgCounter > 1 ? bgCounter - 1 : 4;
  changeBg();
}

function bgRight() {
  bgCounter = bgCounter < 4 ? bgCounter + 1 : 1;
  changeBg();
}

function insertWeatherForecast(data) {
  const inner = `
			<img src="https://openweathermap.org/img/wn/${
        data.list[0].weather[0].icon
      }.png" alt="weather icon">
            <div>
              <p>${Math.round(data.list[0].main.temp)}&deg;C</p>
              <p>${data.list[0].weather[0].description}</p>
            </div>
            <div>
              <p>Wind speed:</p>
              <p>${Math.round(data.list[0].wind.speed)}</p>
              <p>m/s</p>
            </div>
            <div>
              <p>Humidity:</p>
              <p>${data.list[0].main.humidity}%</p>
            </div>  
    `;

  weatherInfo.innerHTML = inner;
}

async function getForecastByGeolocation(lat, lon) {
  const apiKey = "0e506b1697445197b462d83c8ea6f06e";

  if (navigator.geolocation) {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`
      );
      if (!response.ok) {
        throw new error(
          "Something went wrong with the openWeatherMap API response"
        );
      }
      const data = await response.json();
      insertWeatherForecast(data);
      weatherCityInput.value = data.city.name;
      localStorage.momentumWeatherCity = JSON.stringify(data.city.name);
    } catch (error) {
      console.error(error.message);
    }
  } else {
    weatherCityInput.value = "Minsk";
    getForecastByCityName(weatherCityInput.value);
  }
}

async function getForecastByCityName(cityName) {
  const apiKey = "0e506b1697445197b462d83c8ea6f06e";
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&units=metric&appid=${apiKey}`
    );
    if (!response.ok) {
      throw new error(
        "Something went wrong whith an openWeatherMap API response"
      );
    }
    const data = await response.json();
    insertWeatherForecast(data);
    localStorage.momentumWeatherCity = JSON.stringify(data.city.name);
  } catch (error) {
    console.error(error.message);
    throwWeatherError("Something went wrong! Please, try again");
  }
}

function weatherOnload() {
  if (localStorage.momentumWeatherCity) {
    let cityName = JSON.parse(localStorage.momentumWeatherCity);
    weatherCityInput.value = cityName;
    getForecastByCityName(cityName);
  } else {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (location) => {
          getForecastByGeolocation(
            location.coords.latitude,
            location.coords.longitude
          );
        },
        (error) => {
          console.error(error.message);
          throwWeatherError(
            "Something went wrong while trying to take your location"
          );
        }
      );
    }
  }
}

function throwWeatherError(message) {
  weatherInfo.innerHTML = `
        <p class="weather-error">${message}</p>
    `;
}

onloadFunction();

setInterval(() => {
  greetingTime();
  getNewTime();
}, 1000);

userNameInput.addEventListener("keyup", () => {
  localStorage.momentumUserName = JSON.stringify(userNameInput.value);
});

document.addEventListener("click", (e) => {
  if (e.target === document.querySelector(".sect3-reload")) {
    getRandomQuote();
  }

  if (e.target === bgLeftArrow) {
    bgLeft();
  } else if (e.target === bgRightArrow) {
    bgRight();
  }
});

document.querySelector(".weather form").addEventListener("submit", (e) => {
  e.preventDefault();
  getForecastByCityName(weatherCityInput.value);
});
