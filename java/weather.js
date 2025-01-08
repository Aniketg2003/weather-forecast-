

const mapButton = document.querySelector('.map');
const mapContainer = document.getElementById('map');
const apiKey = "AIzaSyBLXZ4YmGBoMU9wlw0kGuobCy96SAtBADI";
let map; 
let lat, lon;
const googleMapDiv = document.getElementById('google-map'); 
const closeMapButton = document.getElementById('close-map'); 
const container3=document.querySelector('.hourly');
const container2=document.querySelector('.container2');
const container = document.querySelector('.container');
const search = document.querySelector('.search');
const weatherBox = document.querySelector('.weatherBox');
const weatherDetail = document.querySelector('.weather-detail');
const error404 = document.querySelector(".not-found");
const cityHide = document.querySelector(".para");
const flagIcon = document.querySelector(".my-image");
const searchci =document.querySelector(".search-city");
const suninfo=document.querySelector(".sun-info");
const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];




mapButton.addEventListener('click', () => {
    if (lat && lon) {
        mapContainer.style.display = 'block';  // Show the map modal
        initMap(lat,lon);  // Initialize the map with the city coordinates
    } else {
        alert("Please search for a city first.");
    }
});

// Close the map modal
closeMapButton.addEventListener('click', () => {
    mapContainer.style.display = 'none';  // Hide the map modal
});





search.addEventListener('click', (e) => {
    e.preventDefault();
    const api = '77938629b900511aabf907040c63820e';
    const city = document.querySelector('.search-Box input').value;

    if (city === '') {
        return;
    }

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${api}`)
        .then(response => response.json())
        .then(json => {
            if (json.cod === '404') {
                document.body.style.backgroundImage="url('background.jpg')";
                removeEffect();
                container2.classList.add('active');
                container3.classList.add('active');
                cityHide.textContent = city;
                container.style.height = '700px';
                weatherBox.classList.remove('active');
                weatherDetail.classList.remove('active');
                searchci.classList.add('active');
                searchci.style.display = 'none'; 
                error404.classList.add('active');
                suninfo.classList.remove('active');
                flagIcon.classList.add('hide'); 
                error404.classList.add('errorEffect');
                setTimeout(() => {
                  error.classList.remove('errorEffect');
              }, 1000);
                return;
            
            }
            
            lat = json.coord.lat;  // Store latitude
            lon = json.coord.lon; 
            console.log(lat,lon);

            
mapButton.addEventListener('click', () => {
    if (lat && lon) {
        mapContainer.style.display = 'block';  // Show the map modal
        initMap(lat,lon);  // Initialize the map with the city coordinates
    } else {
        alert("Please search for a city first.");
    }
});
            cityHide.textContent = city;
            flagIcon.src = `https://flagsapi.com/${json.sys.country}/shiny/32.png`; // Set the flag source
            flagIcon.classList.remove('hide'); 
            container3.classList.remove('active');
            container3.classList.remove('hide');
            container.style.height = '800px';
            weatherBox.classList.add('active');
            searchci.classList.add('active');
            weatherBox.style.display='flex';
            searchci.style.display = 'none'; 
            weatherDetail.classList.add('active');
            error404.classList.remove('active');
            cityHide.classList.remove('hide');
            container2.classList.remove('active');
            container2.classList.remove('hide');
            suninfo.classList.add('active');
            

            

        fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=77938629b900511aabf907040c63820e`)
        .then(response => response.json())
        .then(data => {
            if (data.cod === '404') {
                alert("Something went wrong: " + err.message)
            };

            updateWeather(data);
            updateHourlyForecast(data.list);
        })
        .catch(err => {
            alert("Something went wrong: " + err.message);
        });


      

            

            const image = document.querySelector('.weatherBox img');
            const humd = document.querySelector('.weather-detail .humidity span');
            const wind = document.querySelector('.weather-detail .wind span');
            const temperature = document.querySelector('.weatherBox .temp');
            const  pres = document.querySelector('.weather-detail .pres span');
            const feel = document.querySelector('.weather-detail  .feel span');
            const visibility = document.querySelector('.weather-detail  .visi span');
            const description = document.querySelector('.weatherBox  .description');
            const sunrise=document.querySelector('.sunrise .info-sun span');
            const sunset =document.querySelector('.sunset .info-moon span');

            switch (json.weather[0].main) {
                case 'Clear':
                    image.src = '/image/clear.jpg';
                    document.body.style.backgroundImage = "url('/image/clear back.jpg')";
                    removeRain();
                    removeClouds();
                    removeSnowflakes();
                    removeSmoke();
                    break;
                case 'Rain':
                    image.src = '/image/rain.jpg';
                    document.body.style.backgroundImage = "url('/image/rainy back.jpg')";
                    createRain();
                    removeClouds();
                    removeSmoke();
                    removeSnowflakes();
                    break;
                case 'Snow':
                    image.src = '/image/snow.jpg';
                    document.body.style.backgroundImage = "url('/image/snow back.jpg')";
                    createSnowflakes();
                    removeRain();
                    removeClouds();
                    removeSmoke();
                    break;
                case 'Clouds':
                    image.src = '/image/cloud.jpg';
                    document.body.style.backgroundImage = "url('/image/cloud back.jpg')";
                    createClouds();
                    removeSmoke();
                    removeSnowflakes();
                    removeRain();
                    break;
                case 'Mist':
                case 'Haze':
                    image.src = '/image/mist.jpg';
                    document.body.style.backgroundImage = "url('/image/mist photo.jpg')";
                  createSmoke();
                  removeClouds();
                  removeRain();
                  removeSnowflakes();
                    break;
                default:
                    image.src = '/image/cloud.jpg';
                    createClouds();
                    removeSmoke();
                    removeSnowflakes();
                    removeRain();
                    break;
            }

            temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
            description.innerHTML = `${json.weather[0].description}`;
            humd.innerHTML = `${json.main.humidity}%`;
            wind.innerHTML = `${parseInt(json.wind.speed)}Km/h`;
            pres.innerHTML=`${json.main.pressure} hPa`;
            feel.innerHTML=`${json.main.feels_like}<span>°C</span>`;
            visibility.innerHTML=`${json.visibility/1000}Km`;
            sunrise.innerHTML = new Date(json.sys.sunrise * 1000).toLocaleTimeString();
            sunset.innerHTML = new Date(json.sys.sunset * 1000).toLocaleTimeString();


        });

    });
container.classList.add('active');



function updateWeather(data) {
    const today = new Date();
    
    for (let i = 0; i < 5; i++) {
        const dayIndex = (i + today.getDay()) % 7;
        const dayElement = document.getElementById("day" + (i + 1));
        dayElement.innerHTML = weekday[dayIndex];
        dayElement.classList.add('weekday');

        document.getElementById("day" + (i + 1) + "clouds").innerText = "Clouds: " + data.list[i].clouds.all + "%";
        document.getElementById("day" + (i + 1) + "pressure").innerText = "Pressure: " + data.list[i].main.pressure + " hPa";
        document.getElementById("day" + (i + 1) + "Min").innerHTML = "Min: " + (data.list[i].main.temp_min - 273.15).toFixed(2) + "°C";
        document.getElementById("day" + (i + 1) + "Max").innerHTML = "Max: " + (data.list[i].main.temp_max - 273.15).toFixed(2) + "°C";
        document.getElementById("img" + (i + 1)).src = "https://openweathermap.org/img/wn/" + data.list[i].weather[0].icon + "@2x.png";
    }
}

function updateHourlyForecast(hourlyData) {
    const hourlyContainer = document.querySelector('.hourly .slider-container'); // Select the correct container
    hourlyContainer.innerHTML = ''; // Clear previous content, but keep the container

    // Show the next 8 hours
    for (let i = 0; i < 8; i++) {
        const hour = new Date(hourlyData[i].dt * 1000); // Convert Unix timestamp to Date
        const hourElement = document.createElement('div');
        hourElement.classList.add('slider-list');

        hourElement.innerHTML = `
            <div class="slider-card">
                <p class="body-1">${hour.getHours()}:00</p>
                <img src="https://openweathermap.org/img/wn/${hourlyData[i].weather[0].icon}.png" width="48" height="48" class="weathericon">
                <p class="body-1">${Math.round(hourlyData[i].main.temp - 273.15)}°C</p>
                <p class="body-1">${Math.round(hourlyData[i].wind.speed)} km/h</p>
            </div>
        `;
        
        hourlyContainer.appendChild(hourElement);
    }
}



// Initialize the map with the given coordinates
function initMap(lat,lon) {
    const cityLocation = { lat: lat, lng: lon };  // Set map center to city coordinates

    map = new google.maps.Map(googleMapDiv, {
        zoom: 10,
        center: cityLocation
    });

    // Add a marker at the city location
    new google.maps.Marker({
        position: cityLocation,
        map: map,
        title: 'City Location'
    });
}





//rain effect

const rainContainer = document.createElement('div');
rainContainer.classList.add('rain');
document.body.appendChild(rainContainer);

function createRain() {
    const numberOfDrops = 100; // Adjust number of raindrops
    rainContainer.innerHTML = ''; // Clear previous raindrops

    for (let i = 0; i < numberOfDrops; i++) {
        const drop = document.createElement('div');
        drop.classList.add('drop');

        // Randomize drop position
        drop.style.left = Math.random() * 100 + 'vw';
        drop.style.animationDuration = Math.random() * 0.5 + 0.5 + 's'; // Random duration

        rainContainer.appendChild(drop);
    }
}

function removeRain() {
    rainContainer.innerHTML = ''; // Clear raindrops
}

//cloud effect
const cloudContainer = document.createElement('div');
cloudContainer.classList.add('clouds');
document.body.appendChild(cloudContainer);

function createClouds() {
    const numberOfClouds = 10; // Adjust the number of clouds
    cloudContainer.innerHTML = ''; // Clear previous clouds

    for (let i = 0; i < numberOfClouds; i++) {
        const cloud = document.createElement('div');
        cloud.classList.add('cloud');

        // Randomize cloud size and position
        const size = Math.random() * 100 + 50; // Random size between 50 and 150
        cloud.style.width = size + 'px';
        cloud.style.height = size * 0.5 + 'px'; // Keep it elliptical
        cloud.style.left = Math.random() * 100 + 'vw';
        cloud.style.top = Math.random() * 30 + 'vh'; // Random vertical position

        // Randomize animation duration for clouds
        const duration = Math.random() * 20 + 20; // Random duration between 20s and 40s
        cloud.style.animationDuration = duration + 's';

        cloudContainer.appendChild(cloud);
    }
}

function removeClouds() {
    cloudContainer.innerHTML = ''; // Clear clouds
}

//mist//
const smokeContainer = document.createElement('div');
smokeContainer.classList.add('smoke');
document.body.appendChild(smokeContainer);

function createSmoke() {
    const numberOfPuffs = 50; // Adjust the number of smoke puffs
    smokeContainer.innerHTML = ''; // Clear previous smoke puffs

    for (let i = 0; i < numberOfPuffs; i++) {
        const puff = document.createElement('div');
        puff.classList.add('puff');

        // Randomize puff position and size
        puff.style.left = Math.random() * 100 + 'vw';
        puff.style.width = Math.random() * 30 + 10 + 'px'; // Random width
        puff.style.height = puff.style.width; // Keep it circular
        puff.style.animationDuration = Math.random() * 3 + 2 + 's'; // Random duration

        smokeContainer.appendChild(puff);
    }
}

function removeSmoke() {
    smokeContainer.innerHTML = ''; // Clear smoke puffs
}




/*smoke*/
const snowContainer = document.createElement('div');
snowContainer.classList.add('snowflakes');
document.body.appendChild(snowContainer);

function createSnowflakes() {
    const numberOfSnowflakes = 50; // Adjust the number of snowflakes
    snowContainer.innerHTML = ''; // Clear previous snowflakes

    for (let i = 0; i < numberOfSnowflakes; i++) {
        const snowflake = document.createElement('div');
        snowflake.classList.add('snowflake');

        // Randomize snowflake size
        const size = Math.random() * 5 + 5; // Random size between 5px and 10px
        snowflake.style.width = size + 'px';
        snowflake.style.height = size + 'px';

        // Randomize horizontal position
        snowflake.style.left = Math.random() * 100 + 'vw';

        // Randomize animation duration for snowflakes
        const duration = Math.random() * 3 + 2; // Random duration between 2s and 5s
        snowflake.style.animationDuration = duration + 's';

        // Randomize animation delay for staggered effect
        const delay = Math.random() * 5; // Random delay up to 5s
        snowflake.style.animationDelay = delay + 's';

        snowContainer.appendChild(snowflake);
    }
}

function removeSnowflakes() {
    snowContainer.innerHTML = ''; // Clear snowflakes
}

function removeEffect(){
  removeClouds();
  removeRain();
  removeSnowflakes();
  removeSmoke();
}














