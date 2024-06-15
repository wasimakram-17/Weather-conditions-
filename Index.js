const apiKey = 'https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={e30e75ee68d840070dbd02a25f3f64b9}';

const searchButton = document.getElementById('searchButton');
const searchInput = document.getElementById('searchInput');
const weatherInfo = document.getElementById('weatherInfo');

searchButton.addEventListener('click', () => {
    const cityName = searchInput.value.trim();
    if (cityName.length === 0) {
        alert('Please enter a city name');
        return;
    }

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            const {
                main,
                name,
                weather
            } = data;
            const weatherDescription = weather[0].description;
            const temperature = main.temp;
            const iconCode = weather[0].icon;
            const iconUrl = `http://openweathermap.org/img/wn/${iconCode}.png`;

            weatherInfo.innerHTML = `
                <h2>${name}</h2>
                <img src="${iconUrl}" alt="Weather Icon">
                <p>${weatherDescription}</p>
                <p>Temperature: ${temperature} °C</p>
            `;
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            alert('Failed to fetch weather data. Please try again.');
        });
});
