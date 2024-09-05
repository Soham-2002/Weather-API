let map;

function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 0, lng: 0 },
    zoom: 8,
  });
}

document.getElementById('fetchDataBtn').addEventListener('click', () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(success, error);
  } else {
    alert("Geolocation is not supported by this browser.");
  }
});

function success(position) {
  const lat = position.coords.latitude;
  const lon = position.coords.longitude;

  // Update the map with the user's location
  document.getElementById("map").style.display = "block";
  const userLocation = { lat: lat, lng: lon };
  map.setCenter(userLocation);
  new google.maps.Marker({ position: userLocation, map: map });

  // Fetch weather data
  fetchWeatherData(lat, lon);
}

function error() {
  alert('Unable to retrieve your location.');
}

function fetchWeatherData(lat, lon) {
  const apiKey = 'YOUR_OPENWEATHERMAP_API_KEY';
  const url = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      displayWeatherData(data);
    })
    .catch(error => {
      alert('Failed to fetch weather data');
      console.error(error);
    });
}

function displayWeatherData(data) {
  const weatherDetails = document.getElementById('details');
  weatherDetails.innerHTML = `
    <div><strong>Location:</strong> ${data.timezone}</div>
    <div><strong>Temperature:</strong> ${data.current.temp}°C</div>
    <div><strong>Wind Speed:</strong> ${data.current.wind_speed} km/h</div>
    <div><strong>Humidity:</strong> ${data.current.humidity}%</div>
    <div><strong>UV Index:</strong> ${data.current.uvi}</div>
    <div><strong>Pressure:</strong> ${data.current.pressure} hPa</div>
    <div><strong>Wind Direction:</strong> ${data.current.wind_deg}°</div>
  `;

  document.getElementById('weatherData').style.display = "block";
}
