const apiKey = "";
const container = document.querySelector(".container");
const search = document.querySelector(".search-box button");
const weatherBox = document.querySelector(".weather-box");
const weatherDetails = document.querySelector(".weather-details");
const error404 = document.querySelector(".not-found");

search.addEventListener("click", handleClickSearch);

function handleClickSearch() {
  const city = document.querySelector(".search-box input").value;

  if (!city) return;

  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
  )
    .then((response) => response.json())
    .then((json) => {
      if (json.cod === "404") {
        container.style.height = "400px";
        weatherBox.style.display = "none";
        weatherDetails.style.display = "none";
        error404.style.display = "block";
        error404.classList.add("fade-in");
        return;
      }

      error404.style.display = "none";
      error404.classList.remove("fade-in");

      const image = document.querySelector(".weather-box img");
      const temperature = document.querySelector(".temperature");
      const description = document.querySelector(".description");
      const humidity = document.querySelector(".humidity span");
      const wind = document.querySelector(".wind span");

      switch (json.weather[0].main) {
        case "Clear": {
          image.src = "./images/clear.png";
          break;
        }
        case "Rain": {
          image.src = "./images/rain.png";
          break;
        }
        case "Snow": {
          image.src = "./images/snow.png";
          break;
        }
        case "Clouds": {
          image.src = "./images/clouds.png";
          break;
        }
        case "Mist": {
          image.src = "./images/mist.png";
          break;
        }

        default: {
          image.src = "";
        }
      }

      temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
      description.textContent = `${json.weather[0].description}`;
      humidity.textContent = `${json.main.humidity}%`;
      wind.textContent = `${parseInt(json.wind.speed)}Km/h`;

      weatherBox.style.display = "";
      weatherDetails.style.display = "";
      weatherBox.classList.add("fade-in");
      weatherDetails.classList.add("fade-in");
      container.style.height = "590px";
    });
}
