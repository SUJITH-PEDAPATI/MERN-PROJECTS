document.addEventListener('DOMContentLoaded', () => {
    const cityInput = document.getElementById("city-input");
    const getWeatherbtn = document.getElementById("get-weather-btn");
    const weatherInfo = document.getElementById("weather-info");
    const cityNameDisplay = document.getElementById("city-name");
    const temperatureDisplay = document.getElementById("temperature");
    const descriptionDisplay = document.getElementById("description");
    const errorMessage = document.getElementById("error-message");

    const API_KEY = "d352efdb28100d790f77bddc1fa78c63";

    getWeatherbtn.addEventListener('click', async () => {
        const city = cityInput.value.trim();
        if ( !city) return;

        // It may throw an Error
        // Server Database is always in another continent
        try{
            const weatherData = await fetchWeatherData(city);
            displayWeatherData(weatherData);
        }catch(error){
            showError();
        }
    })
    // Function for fetching the data from the URL using an API Key;
    async function fetchWeatherData(city){
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;
        const response = await fetch(url);
        console.log(typeof response);
        console.log(response);
        if (!response.ok) {
            throw new Error('City Not Found');
        }
        const data = await response.json();
        return data;
    }

    // Function for Displaying the Information
    function displayWeatherData(data){
        const {name,main,weather} = data;
        cityNameDisplay.textContent = name;
        temperatureDisplay.textContent = `Temperature : ${main.temp}`;
        descriptionDisplay.textContent = `Weather : ${weather[0].description}`
        //Unlocking the Display
        weatherInfo.classList.remove('hidden')
        errorMessage.classList.add("hidden");

    }

    // Function for Error 
    function showError(){
        weatherInfo.classList.remove('hidden');
        errorMessage.classList.add('hidden');
    }

})