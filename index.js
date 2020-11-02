const api = {
  key: "3fed4e0ae071a5f243ea19084e9bad86",
  base: "https://api.openweathermap.org/data/2.5/"
};

const search = document.querySelector(".search-city");
search.addEventListener("keypress", setQuery);

function setQuery(evt) {
  if (evt.keyCode === 13) {
    getResults(search.value);
  }
}

function getResults(query) {
  fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
    .then((weather) => {
      return weather.json();
    })
    .then(displayResult);
}

function displayResult(weather) {
  console.log(weather);
  let city = document.querySelector(".city");
  city.innerText = `${weather.name}, ${weather.sys.country}`;

  let now = new Date();
  let date = document.querySelector(".date");
  date.innerText = dateBuilder(now);

  let temptr = document.querySelector(".temp");
  temptr.innerHTML = `${Math.round(weather.main.temp)}<sup>o</sup>C`;

  let status = document.querySelector(".status");
  status.innerText = `${weather.weather[0].main}`;
  if (weather.weather[0].main === "Rain") {
    document.body.style.backgroundImage = "url('rainn2.jpg')";
  } else if (weather.weather[0].main === "Clouds") {
    document.body.style.backgroundImage = "url('CloudHd.jpg')";
  } else if (weather.weather[0].main === "Mist") {
    document.body.style.backgroundImage = "url('Mist.jpg')";
  } else if (weather.weather[0].main === "Smoke") {
    document.body.style.backgroundImage = "url('smoke.jpg')";
  } else document.body.style.backgroundImage = "url('clearHD.jpg')";

  let minMax = document.querySelector(".min-max");
  minMax.innerText = `${weather.main.temp_min} / ${weather.main.temp_max}`;
}

function dateBuilder(d) {
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
    "December"
  ];
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];

  let day = days[d.getDay()];
  let date = d.getDate();
  let month = months[d.getMonth()];
  let year = d.getFullYear();

  return `${day} ${date} ${month} ${year}`;
}
