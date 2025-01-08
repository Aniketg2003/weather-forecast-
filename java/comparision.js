

const search = document.querySelector('.search-Box button');
const container = document.querySelector('.weatherContainer');
const error404 = document.querySelector(".not-found");
const searchCity = document.querySelector(".search-city");
const flagIcon = document.querySelector(".my-image");
const cityHide = document.querySelector(".para");
const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

search.addEventListener('click', (e) => {
    e.preventDefault();
    const city = document.querySelector('.search-Box input').value;

    if (city === '') {
        return;
    }

    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=77938629b900511aabf907040c63820e`)
        .then(response => response.json())
        .then(data => {
            if (data.cod === '404') {
                handleError(city);
                return;
            }

            updateWeather(data);
        })
        .catch(err => {
            alert("Something went wrong: " + err.message);
        });
});

function handleError(city) {
    cityName.classList.remove('hide'); // Show city name when updated
    cityHide.textContent = city;
    container.style.height = '500px';
    searchCity.classList.add('active');
    searchCity.style.display = 'none';
    error404.classList.add('active');
    flagIcon.classList.add('hide');
    container.classList.remove('active');
}


function updateWeather(data) {
    const countryCode = data.city.country;
    const cityNameElement = document.getElementById('cityName');

    cityNameElement.textContent = data.city.name; // Set city name here
    cityNameElement.classList.remove('hide'); // Show the city name

    flagIcon.src = `https://flagsapi.com/${countryCode}/shiny/32.png`; // Set the flag source
    flagIcon.classList.remove('hide');


    cityNameElement.classList.remove('hide'); // Show city name when updated

    container.style.height = '600px';
    searchCity.classList.add('active');
    searchCity.style.display = 'none';
    error404.classList.remove('active');
    container.classList.add('active');

    const today = new Date();
    
    for (let i = 0; i < 5; i++) {
        const dayIndex = (i + today.getDay()) % 7;
        const dayElement = document.getElementById("day" + (i + 1));
        dayElement.innerHTML = weekday[dayIndex];
        dayElement.classList.add('weekday');

        document.getElementById("day" + (i + 1) + "clouds").innerText = "Clouds: " + data.list[i].clouds.all + "%";
        document.getElementById("day" + (i + 1) + "pressure").innerText = "Pressure: " + data.list[i].main.pressure + " hPa";
        document.getElementById("day" + (i + 1) + "humidity").innerText = "Humidity: " + data.list[i].main.humidity + "%";
        document.getElementById("day" + (i + 1) + "Min").innerHTML = "Min: " + (data.list[i].main.temp_min - 273.15).toFixed(1) + "°C";
        document.getElementById("day" + (i + 1) + "Max").innerHTML = "Max: " + (data.list[i].main.temp_max - 273.15).toFixed(1) + "°C";
        document.getElementById("img" + (i + 1)).src = "https://openweathermap.org/img/wn/" + data.list[i].weather[0].icon + "@2x.png";
    }
}










const search2 = document.querySelector('.searchBox button');
const container2 = document.querySelector('.weatherContainer2');
const error4042 = document.querySelector(".notfound");
const searchCity2 = document.querySelector(".searchcity");
const flagIcon2 = document.querySelector(".myimage2");
const cityHide2 = document.querySelector(".para2");
const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

search2.addEventListener('click', (e) => {
    e.preventDefault();
    const city = document.querySelector('.searchBox input').value;

    if (city === '') {
        return;
    }

    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=77938629b900511aabf907040c63820e`)
        .then(response => response.json())
        .then(data => {
            if (data.cod === '404') {
                handleError1(city);
                return;
            }

            updateWeather1(data);
        })
        .catch(err => {
            alert("Something went wrong: " + err.message);
        });
});

function handleError1(city) {
    cityName2.classList.remove('hide'); // Show city name when updated
    cityHide2.textContent = city;
    container2.style.height = '500px';
    searchCity2.classList.add('active');
    searchCity2.style.display = 'none';
    error4042.classList.add('active');
    flagIcon2.classList.add('hide');
    container2.classList.remove('active');
}


function updateWeather1(data) {
    const countryCode = data.city.country;
    const cityNameElement = document.getElementById('cityName2');

    cityNameElement.textContent = data.city.name; 
    cityNameElement.classList.remove('hide'); 

    flagIcon2.src = `https://flagsapi.com/${countryCode}/shiny/32.png`; 
    flagIcon2.classList.remove('hide');


    cityNameElement.classList.remove('hide');

    container2.style.height = '600px';
    searchCity2.classList.add('active');
    searchCity2.style.display = 'none';
    error4042.classList.remove('active');
    container2.classList.add('active');

    const today = new Date();
    
    for (let i = 0; i < 5; i++) {
        const dayIndex = (i + today.getDay()) % 7;
        const dayElement = document.getElementById("day" + (i + 1));
        dayElement.innerHTML = weekday[dayIndex];
        dayElement.classList.add('weekdays');

        document.getElementById("day" + (i + 1) + "clouds2").innerText = "Clouds: " + data.list[i].clouds.all + "%";
        document.getElementById("day" + (i + 1) + "pressure2").innerText = "Pressure: " + data.list[i].main.pressure + " hPa";
        document.getElementById("day" + (i + 1) + "humidity2").innerText = "Humidity: " + data.list[i].main.humidity + "%";
        document.getElementById("day" + (i + 1) + "Min2").innerHTML = "Min: " + (data.list[i].main.temp_min - 273.15).toFixed(1) + "°C";
        document.getElementById("day" + (i + 1) + "Max2").innerHTML = "Max: " + (data.list[i].main.temp_max - 273.15).toFixed(1) + "°C";
        document.getElementById("imga" + (i + 1)).src = "https://openweathermap.org/img/wn/" + data.list[i].weather[0].icon + "@2x.png";
    }
}
