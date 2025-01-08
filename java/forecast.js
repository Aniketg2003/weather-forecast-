
    const getWeatherBtn = document.getElementById('getWeatherBtn');
    const forecastContainer = document.getElementById('forecastContainer');

    // Replace with your own WeatherAPI key
    const WEATHER_API_KEY = 'b31c3a752c064450a52170800240611'; 

    // Event listener for the button click to fetch weather data
    getWeatherBtn.addEventListener('click', () => {
        const location = document.getElementById('location').value;

        if (!location) {
            alert('Please enter a city.');
            return;
        }

        // Fetch weather data from WeatherAPI
        fetch(`https://api.weatherapi.com/v1/forecast.json?key=${WEATHER_API_KEY}&q=${location}&days=16&aqi=no&alerts=no`)
            .then(response => response.json())
            .then(data => {
                if (data.error) {
                    alert('Error: ' + data.error.message);
                    return;
                }

                // Display the weather forecast
                displayForecast(data.forecast.forecastday);
            })
            .catch(err => {
                alert('Something went wrong: ' + err.message);
            });
    });

    // Function to display forecast data
    function displayForecast(forecastData) {
        forecastContainer.innerHTML = '';  // Clear previous forecast

        forecastData.forEach(day => {
            const dayElement = document.createElement('div');
            dayElement.classList.add('forecast-day');

            // Format the date
            const date = new Date(day.date);
            const dateString = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;

            // Add the forecast details
            dayElement.innerHTML = `
                <div class="date">${dateString}</div>
                <div class="temperature">${day.day.avgtemp_c}°C</div>
                <div class="condition">${day.day.condition.text}</div>
                <img src="${day.day.condition.icon}" alt="${day.day.condition.text}" class="icon" />
            `;

            forecastContainer.appendChild(dayElement);
        });
    }
