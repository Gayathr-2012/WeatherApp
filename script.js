async function getWeather()
{ 
    const city = document.getElementById('city').value;
    const key ='902aacef2a20144d9ceed60c2207e6c8';
    if (!city) {
         alert('Please enter a city');
        return;
     }
    
    let wurl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&units=metric`
    try{
        let response =await fetch(wurl);
        let weather_data = await response.json();
        displayData(weather_data);
     
    }
    catch(error)
    {
        console.error('Error fetching current weather data:', error);
        alert('Error fetching current weather data. Please try again.');
    }
}


async function getForecastWeather()
{
  
    const city = document.getElementById('city').value;
    const key ='902aacef2a20144d9ceed60c2207e6c8';
       if (!city) {
        alert('Please enter a city');
         return;
     }
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${key}`;
    try{
        let forecast_response =await fetch(forecastUrl);
        let forecast_data = await forecast_response.json();
        displayHourlyForecast(forecast_data.list);

    }
    catch(error)
    {
        console.error('Error fetching current weather data:', error);
        alert('Error fetching current weather data. Please try again.');
    }
}




function displayData(data) {
    console.log(data);
    const weatherIcon = document.getElementById('weather-icon');
    const tempDivInfo = document.getElementById('temp-div');
    const weatherInfoDiv = document.getElementById('weather-info');
    const hourlyForecastDiv = document.getElementById('hourly-forecast');

    // Clear previous content
    weatherInfoDiv.innerHTML = '';
    hourlyForecastDiv.innerHTML = ''; 
    tempDivInfo.innerHTML = '';

    if (data.cod === '404') {
        weatherInfoDiv.innerHTML = `<p>${data.message}</p>`;
    } else {
        const cityName = data.name;
   
        const temperature = data.main.temp ; // Convert to Celsius
        //console.log(temperature);
        const description = data.weather[0].description;
        const iconCode = data.weather[0].icon;
        const wind = data.wind.speed;
        const humidity = data.main.humidity;
        const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@4x.png`;
        const temperatureHTML = `<p>${convertTemp(temperature)}</p>`;
        const weatherHtml = `<p>City:${cityName}</p><p>Desc:${description}</p><p>Wind:${wind}</p>
        <p>Humidity:${humidity}</p>`;

        tempDivInfo.innerHTML = temperatureHTML;
        weatherInfoDiv.innerHTML = weatherHtml;
        weatherIcon.src = iconUrl;
        weatherIcon.alt = description;
        showImage();
    }
}

function displayHourlyForecast(hourlyData) {
    console.log(hourlyData);
    const hourlyForecastDiv = document.getElementById('hourly-forecast');

    const next24Hours = hourlyData.slice(0, 8); // Display the next 24 hours (3-hour intervals)

    next24Hours.forEach(item => {
        const dateTime = new Date(item.dt * 1000); // Convert timestamp to milliseconds
        const hour = dateTime.getHours();
        const temperature = convertCelc(item.main.temp); // Convert to Celsius
        const iconCode = item.weather[0].icon;
        const iconUrl = `https://openweathermap.org/img/wn/${iconCode}.png`;

        const hourlyItemHtml = `
            <div class="hourly-item">
                <span>${hour}:00</span>
                <img src="${iconUrl}" alt="Hourly Weather Icon">
                <span>${temperature}°C</span>
            </div>
        `;

        hourlyForecastDiv.innerHTML += hourlyItemHtml;
    });
}

function showImage() {
    const weatherIcon = document.getElementById('weather-icon');
    weatherIcon.style.display = 'block'; // Make the image visible once it's loaded
}

function convertTemp(tempdata){
  //  celsius = (fahrenheit - 32) * 5/9
    tempdata = parseInt(tempdata);
    let F = (tempdata  * 9/5 )+ 32;
    F = Math.floor(F);
    return F+`&deg;F`;
    }

function convertCelc(tempdata)
{
    tempdata = parseInt(tempdata);
    let c = (tempdata - 32) * 5/9
    c = Math.floor(c);
    return c+`&deg;`;
}