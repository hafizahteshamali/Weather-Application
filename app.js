const container = document.querySelector(".container");
const search = document.querySelector(".search-box button");
const weatherBox = document.querySelector(".weather-box");
const weatherDetails = document.querySelector(".weather-details");
const error404 = document.querySelector(".not-found");
const cityHide = document.querySelector(".city-hide");
let body = document.querySelector('body');

const APIkey = "28c3c5feae151fb1f8086cfdfd6a0679";

function fetchingAPI() {
  const cityInput = document.querySelector(".search-box input");
  const city = cityInput.value;

  if (city.trim() !== "") {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIkey}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.cod == "404") {
          container.style.height = "400px";
          weatherBox.classList.remove("active");
          weatherDetails.classList.remove("active");
          error404.classList.add("active");
          return;
        }

        const image = document.querySelector(".weather-box img");
        const temperature = document.querySelector(".weather-box .temperature");
        const description = document.querySelector(".weather-box .description");
        const humidity = document.querySelector(".weather-details .humidity span");
        const wind = document.querySelector(".weather-details .wind span");

        if (cityHide.textContent == city) {
          return;
        } else {

          container.style.height = "555px";
          container.classList.add("active");
          weatherBox.classList.add("active");
          weatherDetails.classList.add("active");
          error404.classList.remove("active");

          setTimeout(() => {
            container.classList.remove("active");
          }, 2500);

          switch (data.weather[0].main) {
            case "Clear":
              image.src = "assets/images/clear.png";
              body.className = ' bg clear';
              break;
            case "Rain":
              image.src = "assets/images/rain.png";
              body.className = ' bg rain';
              break;
            case "Snow":
              image.src = "assets/images/snow.png";
              body.className = ' bg snow';
              break;
            case "Clouds":
              image.src = "assets/images/cloud.png";
              body.className = ' bg cloud';
              break;
            case "Mist":
              image.src = "assets/images/mist.png";
              body.className = ' bg mist';
              break;
            case "Haze":
              image.src = "assets/images/haze.png";
              body.className = ' bg haze';
              break;
            default:
              image.src = "assets/images/cloud.png";
              body.className = ' bg cloud';
          }

          showData(data);
        }
      })
      .catch((error) => {
        box.innerHTML = `<p>${error}</p>`;
      });
  } else {
    swal("Empty input Field is not Allowed!");
  }

  cityInput.value = "";
}

search.addEventListener('click', fetchingAPI);

document.querySelector('.search-box input').addEventListener('keyup', (e) => {
  if (e.key === 'Enter') fetchingAPI();
});




function showData(data) {
  const { temp, humidity } = data.main;
  const { description } = data.weather[0];
  const { speed } = data.wind;
  const {name} = data;
  const {country} = data.sys;

  cityHide.innerHTML =`${name} ${country}`;

  document.querySelector(".weather-box .temperature").innerHTML = `${parseInt(temp)}<span>°C</span>`;
  document.querySelector(".weather-box .description").innerHTML = `${description}`;
  document.querySelector(".weather-details .humidity span").innerHTML = `${humidity}%`;
  document.querySelector(".weather-details .wind span").innerHTML = `${parseInt(speed)}km/h`;
}

