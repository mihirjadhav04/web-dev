document.addEventListener('DOMContentLoaded', () => {

  const cityInput = document.getElementById('city-input');
  const getWeatherBtn = document.getElementById('get-weather-btn');
  const weatherInfo = document.getElementById("weather-info");
  const cityNameDisplay = document.getElementById("city-name");
  const temperatureDisplay = document.getElementById("temperature");
  const descriptionDisplay = document.getElementById("description");
  const errorMessage = document.getElementById("error-messag");

  const API_KEY = "54876d54044bd693623e8cbe49766533"

  getWeatherBtn.addEventListener('click', async () => {
    const city = cityInput.value.trim();
    console.log(city);
    
    if(!city) return;

    try {
      const weatherData = await fetchWeatherData(city)
      displayWeatherData(weatherData);
    } catch (error) {
      showError(error)
    }


  })


  async function fetchWeatherData(city){
    //to fetch the weather data based on city.
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;

    console.log('URL : ', url);

    const response = await fetch(url);
    console.log('TYPE OF RESPONSE : ', typeof response);
    console.log('RESPONSE : ', response);

    if(!response.ok){
      throw new Error('City not found!');
    }
    
    const data = await response.json();
    return data;
    
    
  }

  function displayWeatherData(data){
    //to display the weather data which is fetched.
    console.log(data);
    const {name, main, weather} = data;
    cityNameDisplay.textContent = name;
    temperatureDisplay.textContent = `Temperature : ${main.temp}`;
    descriptionDisplay.textContent = `Weather : ${weather[0].description}`;

    // remove display hidden.
    weatherInfo.classList.remove('hidden');
    errorMessage.classList.add('hidden');
  }

  function showError(){
    weatherInfo.classList.remove('hidden');
    errorMessage.classList.add('hidden');
  }


})