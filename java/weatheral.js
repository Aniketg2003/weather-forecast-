

const apiKey = 'b31c3a752c064450a52170800240611'; // Replace with your actual Weather API key
const weatherApiUrl = 'https://api.weatherapi.com/v1/alerts.json'; // API endpoint for alerts

// List of cities in India (you can expand this list)
const citiesInIndia = [
    'Mumbai', 'Delhi', 'Chennai', 'Kolkata', 'Bangalore', 'Hyderabad', 'Ahmedabad', 
    'Pune', 'Jaipur', 'Lucknow', 'Kochi', 'Indore', 'Bhopal', 'Patna', 'Surat', 'Nagpur','Andhra Pradesh','Arunachal Pradesh','Assam','Bihar','Chhattisgarh','Goa','Gujarat','Haryana','Himachal Pradesh','Jharkhand',
    'Karnataka','Kerala','Madhya Pradesh','Maharashtra','Manipur','Meghalaya','Mizoram','Nagaland','Odisha','Punjab',
    'Rajasthan','Sikkim','Tamil Nadu','Telangana','Tripura','Uttarakhand','Uttar Pradesh','West Bengal','Ahmedabad', 'Bangalore', 'Chennai', 'Delhi', 'Hyderabad', 'Kolkata', 'Mumbai', 'Pune', 'Jaipur', 'Surat',
    'Lucknow', 'Kanpur', 'Nagpur', 'Indore', 'Patna', 'Vadodara', 'Bhopal', 'Agra', 'Nashik', 'Visakhapatnam',
    'Vadodara', 'Faridabad', 'Ludhiana', 'Rajkot', 'Meerut', 'Kochi', 'Vijayawada', 'Aurangabad', 'Dhanbad',
    'Madurai', 'Jabalpur', 'Howrah', 'Bhubaneswar', 'Amritsar', 'Chandigarh', 'Mysuru', 'Jammu', 'Gurgaon',
    'Coimbatore', 'Tiruchirappalli', 'Bikaner', 'Ranchi', 'Noida', 'Kota', 'Srinagar', 'Udaipur', 'Chandrapur',
    'Dehradun', 'Mangalore', 'Jammu', 'Dibrugarh', 'Kochi', 'Shimla', 'Allahabad', 'Gwalior', 'Cuttack',
    'Solapur', 'Aligarh', 'Muzzafarnagar', 'Guwahati', 'Panaji', 'Raipur', 'Pondicherry', 'Haldwani', 'Bhilai',
    'Bareilly', 'Moradabad', 'Gaya', 'Kollam', 'Rourkela', 'Thiruvananthapuram', 'Agartala', 'Bardhaman',
    'Siliguri', 'Jammu', 'Mysore', 'Navi Mumbai', 'Rajahmundry', 'Tirunelveli', 'Bhubaneshwar', 'Haridwar',
    'Bhilwara', 'Gurugram', 'Vijayawada', 'Thane', 'Jodhpur', 'Vellore', 'Patiala', 'Rishikesh', 'Tirupati',
    'Kochi', 'Puducherry', 'Kolkata', 'Kochi', 'Nanded', 'Bilaspur', 'Satna', 'Anantapur', 'Ajmer', 'Shimla',
    'Jorhat', 'Ranchi', 'Solan', 'Kurnool', 'Agra', 'Bhubaneshwar', 'Guntur', 'Nagapattinam', 'Vasai', 'Mathura',
    'Kozhikode', 'Udupi', 'Hoshiarpur', 'Ambala', 'Bhopal', 'Raigad', 'Durgapur', 'Aizawl', 'Nagapattinam',
    'Dibrugarh', 'Navi Mumbai', 'Ambala', 'Haldwani', 'Bhilai', 'Kurukshetra', 'Rohtak', 'Patiala', 'Gwalior',
    'Mysore', 'Tezpur', 'Nanded', 'Kannur', 'Muzaffarpur', 'Gurgaon', 'Nellore', 'Aurangabad', 'Siliguri',
    'Faridabad', 'Ambikapur', 'Malkangiri', 'Korba', 'Gulbarga', 'Vijayanagara', 'Rishikesh', 'Puducherry',
    'Ranchi', 'Pondicherry', 'Bhubaneswar', 'Dibrugarh', 'Panipat', 'Tirupur', 'Dharamsala', 'Mysore', 'Ongole','kerala'
];

// Fetch weather alerts for multiple cities in India
async function fetchWeatherAlerts() {
    try {
        const alertContainer = document.getElementById('alert-container');
        alertContainer.innerHTML = '<p>Loading alerts...</p>'; // Show loading message

        // Loop through cities and fetch alerts for each
        const cityAlertsPromises = citiesInIndia.map(city => fetchWeatherAlertForCity(city));
        const allCityAlerts = await Promise.all(cityAlertsPromises);

        // Flatten the array of alerts
        const allAlerts = allCityAlerts.flat();

        // If alerts exist, display them, otherwise show a no alerts message
        if (allAlerts.length > 0) {
            displayAlerts(allAlerts);
        } else {
            alertContainer.innerHTML = '<p>No alerts at the moment.</p>';
        }
    } catch (error) {
        document.getElementById('alert-container').innerHTML = '<p>Error fetching weather alerts.</p>';
    }
}

// Fetch weather alert for a specific city
async function fetchWeatherAlertForCity(city) {
    try {
        const response = await fetch(`${weatherApiUrl}?key=${apiKey}&q=${city}`);
        const data = await response.json();
        
        if (data.alerts && data.alerts.alert) {
            return data.alerts.alert.map(alert => ({
                city,
                ...alert
            }));
        }

        return []; // Return an empty array if no alerts for this city
    } catch (error) {
        console.error(`Error fetching alerts for city: ${city}`, error);
        return []; // Return an empty array in case of error
    }
}

// Display weather alerts on the page
function displayAlerts(alerts) {
    const alertContainer = document.getElementById('alert-container');
    alertContainer.innerHTML = ''; // Clear loading text

    alerts.forEach(alert => {
        const alertCard = document.createElement('div');
        alertCard.classList.add('alert-card');

        let alertClass = '';
        if (alert.severity === 'Moderate') alertClass = 'moderate';
        else if (alert.severity === 'Severe') alertClass = 'urgent';
        else alertClass = 'normal';

        alertCard.classList.add(alertClass);

        const headline = document.createElement('h2');
        headline.textContent = `${alert.city}: ${alert.headline}`;

        const info = document.createElement('div');
        info.classList.add('info');
        info.innerHTML = `
            <p><strong>Severity:</strong> ${alert.severity}</p>
            <p><strong>Urgency:</strong> ${alert.urgency}</p>
            <p><strong>Areas Affected:</strong> ${alert.areas}</p>
            <p><strong>Event:</strong> ${alert.event}</p>
            <p><strong>Effective:</strong> ${new Date(alert.effective).toLocaleString()}</p>
            <p><strong>Expires:</strong> ${new Date(alert.expires).toLocaleString()}</p>
        `;

        const description = document.createElement('p');
        description.textContent = alert.desc;

        const instruction = document.createElement('p');
        instruction.innerHTML = `<strong>Instructions:</strong> ${alert.instruction}`;

        alertCard.appendChild(headline);
        alertCard.appendChild(info);
        alertCard.appendChild(description);
        alertCard.appendChild(instruction);

        alertContainer.appendChild(alertCard);
    });
}

// Call the function to fetch and display alerts on page load
fetchWeatherAlerts();

























/*

const apiKey = 'b31c3a752c064450a52170800240611'; // Replace with your actual Weather API key
const weatherApiUrl = 'https://api.weatherapi.com/v1/alerts.json'; // API endpoint for alerts

// Fetch weather alerts from API
async function fetchWeatherAlerts() {
    try {
        const response = await fetch(`${weatherApiUrl}?key=${apiKey}&q=Tamil Nadu`);
        const data = await response.json();
        const alerts = data.alerts.alert;

        if (alerts && alerts.length > 0) {
            displayAlerts(alerts);
        } else {
            document.getElementById('alert-container').innerHTML = '<p>No alerts at the moment.</p>';
        }
    } catch (error) {
        document.getElementById('alert-container').innerHTML = '<p>Error fetching weather alerts.</p>';
    }
}

// Display weather alerts on the page
function displayAlerts(alerts) {
    const alertContainer = document.getElementById('alert-container');
    alertContainer.innerHTML = ''; // Clear loading text

    alerts.forEach(alert => {
        const alertCard = document.createElement('div');
        alertCard.classList.add('alert-card');

        let alertClass = '';
        if (alert.severity === 'Moderate') alertClass = 'moderate';
        else if (alert.severity === 'Severe') alertClass = 'urgent';
        else alertClass = 'normal';

        alertCard.classList.add(alertClass);

        const headline = document.createElement('h2');
        headline.textContent = alert.headline;

        const info = document.createElement('div');
        info.classList.add('info');
        info.innerHTML = `
            <p><strong>Severity:</strong> ${alert.severity}</p>
            <p><strong>Urgency:</strong> ${alert.urgency}</p>
            <p><strong>Areas Affected:</strong> ${alert.areas}</p>
            <p><strong>Event:</strong> ${alert.event}</p>
            <p><strong>Effective:</strong> ${new Date(alert.effective).toLocaleString()}</p>
            <p><strong>Expires:</strong> ${new Date(alert.expires).toLocaleString()}</p>
        `;

        const description = document.createElement('p');
        description.textContent = alert.desc;

        const instruction = document.createElement('p');
        instruction.innerHTML = `<strong>Instructions:</strong> ${alert.instruction}`;

        alertCard.appendChild(headline);
        alertCard.appendChild(info);
        alertCard.appendChild(description);
        alertCard.appendChild(instruction);

        alertContainer.appendChild(alertCard);
    });
}

// Call the function to fetch and display alerts on page load
fetchWeatherAlerts();








*/



















/*const weatherAlertContainer = document.getElementById('weather-alerts');

// Your WeatherAPI Key
const apiKey = 'b31c3a752c064450a52170800240611';

// Array of states to check for alerts
const states = [ 'Andhra Pradesh','Arunachal Pradesh','Assam','Bihar','Chhattisgarh','Goa','Gujarat','Haryana','Himachal Pradesh','Jharkhand',
    'Karnataka','Kerala','Madhya Pradesh','Maharashtra','Manipur','Meghalaya','Mizoram','Nagaland','Odisha','Punjab',
    'Rajasthan','Sikkim','Tamil Nadu','Telangana','Tripura','Uttarakhand','Uttar Pradesh','West Bengal''Ahmedabad', 'Bangalore', 'Chennai', 'Delhi', 'Hyderabad', 'Kolkata', 'Mumbai', 'Pune', 'Jaipur', 'Surat',
    'Lucknow', 'Kanpur', 'Nagpur', 'Indore', 'Patna', 'Vadodara', 'Bhopal', 'Agra', 'Nashik', 'Visakhapatnam',
    'Vadodara', 'Faridabad', 'Ludhiana', 'Rajkot', 'Meerut', 'Kochi', 'Vijayawada', 'Aurangabad', 'Dhanbad',
    'Madurai', 'Jabalpur', 'Howrah', 'Bhubaneswar', 'Amritsar', 'Chandigarh', 'Mysuru', 'Jammu', 'Gurgaon',
    'Coimbatore', 'Tiruchirappalli', 'Bikaner', 'Ranchi', 'Noida', 'Kota', 'Srinagar', 'Udaipur', 'Chandrapur',
    'Dehradun', 'Mangalore', 'Jammu', 'Dibrugarh', 'Kochi', 'Shimla', 'Allahabad', 'Gwalior', 'Cuttack',
    'Solapur', 'Aligarh', 'Muzzafarnagar', 'Guwahati', 'Panaji', 'Raipur', 'Pondicherry', 'Haldwani', 'Bhilai',
    'Bareilly', 'Moradabad', 'Gaya', 'Kollam', 'Rourkela', 'Thiruvananthapuram', 'Agartala', 'Bardhaman',
    'Siliguri', 'Jammu', 'Mysore', 'Navi Mumbai', 'Rajahmundry', 'Tirunelveli', 'Bhubaneshwar', 'Haridwar',
    'Bhilwara', 'Gurugram', 'Vijayawada', 'Thane', 'Jodhpur', 'Vellore', 'Patiala', 'Rishikesh', 'Tirupati',
    'Kochi', 'Puducherry', 'Kolkata', 'Kochi', 'Nanded', 'Bilaspur', 'Satna', 'Anantapur', 'Ajmer', 'Shimla',
    'Jorhat', 'Ranchi', 'Solan', 'Kurnool', 'Agra', 'Bhubaneshwar', 'Guntur', 'Nagapattinam', 'Vasai', 'Mathura',
    'Kozhikode', 'Udupi', 'Hoshiarpur', 'Ambala', 'Bhopal', 'Raigad', 'Durgapur', 'Aizawl', 'Nagapattinam',
    'Dibrugarh', 'Navi Mumbai', 'Ambala', 'Haldwani', 'Bhilai', 'Kurukshetra', 'Rohtak', 'Patiala', 'Gwalior',
    'Mysore', 'Tezpur', 'Nanded', 'Kannur', 'Muzaffarpur', 'Gurgaon', 'Nellore', 'Aurangabad', 'Siliguri',
    'Faridabad', 'Ambikapur', 'Malkangiri', 'Korba', 'Gulbarga', 'Vijayanagara', 'Rishikesh', 'Puducherry',
    'Ranchi', 'Pondicherry', 'Bhubaneswar', 'Dibrugarh', 'Panipat', 'Tirupur', 'Dharamsala', 'Mysore', 'Ongole','kerala'];

// Function to fetch weather alerts for each city
function fetchWeatherAlerts() {
  weatherAlertContainer.innerHTML = ''; // Clear the previous alerts

  states.forEach(city => {
    // Fetch weather alerts for each city
    fetch(`https://api.weatherapi.com/v1/alerts.json?key=${apiKey}&q=${city}`)
    .then(response => response.json())
    .then(data => {
      if (data.alerts && data.alerts.length > 0) {
        displayAlert(city, data.alerts);
      }
    })
    .catch(error => {
      console.error('Error fetching weather alerts for city:', city, error);
    });
});
}
function displayAlert(city, alerts) {
    alerts.forEach(alert => {
      const alertDiv = document.createElement('div');
      alertDiv.classList.add('alert-item');
      
      // Add severity class (customize based on your preference)
      if (alert.severity === 'Moderate') {
        alertDiv.classList.add('warning');
      } else if (alert.severity === 'Severe') {
        alertDiv.classList.add('danger');
      }
  
      // Create the HTML structure for each alert
      alertDiv.innerHTML = `
        <h5>${city} - ${alert.headline}</h5>
        <p>${alert.info}</p>
        <p class="alert-date"><strong>Issued on:</strong> ${new Date(alert.date).toLocaleString()}</p>
      `;
      
      weatherAlertContainer.appendChild(alertDiv);
    });
  }
  
  // Call the function to fetch alerts when the page loads
  window.onload = fetchWeatherAlerts;*/


  // Test with a single city

