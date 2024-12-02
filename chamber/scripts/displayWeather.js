document.addEventListener('DOMContentLoaded', function () {
    const currentYear = new Date().getFullYear();
    const lastModifiedDate = new Date(document.lastModified).toLocaleDateString();

    document.getElementById('currentyear').textContent = currentYear;
    document.getElementById('lastModified').textContent = `Last Modified: ${lastModifiedDate}`;

    // Hamburger menu toggle
    const menu = document.querySelector('nav .menu');
    const hamburgerButton = document.querySelector('.hamburger');

    hamburgerButton.addEventListener('click', () => {
        menu.classList.toggle('open');
        hamburgerButton.textContent = menu.classList.contains('open') ? '✖' : '☰';
    });
      // Wayfinding effect for active navigation link
      const path = window.location.pathname;
      const currentPage = path.substring(path.lastIndexOf('/') + 1);
      const navLinks = document.querySelectorAll('.menu a');
      
      navLinks.forEach(link => {
          const href = link.getAttribute('href');
          if (currentPage === href) {
              link.classList.add('active');
          }
  });
});
async function fetchMembers() {
    try {
        const response = await fetch('data/members.json'); // Fetch JSON data from the directory
        if (!response.ok) throw new Error('Failed to fetch members.json');
        return await response.json();
    } catch (error) {
        console.error('Error fetching members:', error);
        return [];
    }
}

function getSpotlights(members) {
    // Filter members with membership level 2 (Silver) or 3 (Gold)
    const eligibleMembers = members.filter(member => member.membershipLevel === 2 || member.membershipLevel === 3);
    
    // Shuffle the array to randomize
    eligibleMembers.sort(() => Math.random() - 0.5);
    
    // Ensure we return exactly 3 members
    return eligibleMembers.slice(0, 3);
}

function displaySpotlights(spotlights) {
    const spotlightContainer = document.getElementById('spotlight-container');

    // Clear container
    spotlightContainer.innerHTML = '';

    // Create spotlight cards
    spotlights.forEach(member => {
        const card = document.createElement('div');
        card.classList.add('spotlight-card');
        card.innerHTML = `
            <h3>${member.name}</h3>
             <img src="images/${member.image}" alt="${member.name}">
            <p>${member.address}</p>
            <p>${member.phone}</p>
            <a href="${member.website}" target="_blank">Visit Website</a>
            <p>Membership Level: ${member.membershipLevel === 2 ? 'Silver' : 'Gold'}</p>
        `;
        spotlightContainer.appendChild(card);
    });
}

async function init() {
    const members = await fetchMembers();
    const spotlights = getSpotlights(members);
    displaySpotlights(spotlights);
    forecastApiFetch();
}

// Initialize the spotlight feature
init();

const myDescription = document.querySelector('#description');
const weatherIcon = document.querySelector('#weather-icon');
const figcaption = document.querySelector('figcaption');
const myTemperature = document.querySelector('#temprature');
const myTown = document.querySelector('#town');
const tempMax = document.querySelector('#temp-max');
const tempMin = document.querySelector('#temp-min');
const humidity = document.querySelector('#humidity');
const sunrise = document.querySelector('#sunrise');
const sunset = document.querySelector('#sunset');

const forecastToday = document.querySelector('#forecast-today');
 const forecastTomorrow = document.querySelector('#forecast-tomorrow');
const forecastNextday = document.querySelector('#forecast-next');



const myKey = ""
const url = 'https://api.openweathermap.org/data/2.5/weather?lat=4.0615&lon=9.7861&units=metric&APPID=9d8f9f51264b784b07894be4b5efffe9';
const forecastUrl = 'https://api.openweathermap.org/data/2.5/forecast?lat=4.0615&lon=9.7861&units=metric&APPID=9d8f9f51264b784b07894be4b5efffe9';


async function apiFetch() {
    try {
        const response = await fetch(url);
        if (response.ok) {
            const weatherdata = await response.json();
            console.log(weatherdata);
            displayData(weatherdata);
        }
    } catch (error){
        console.log(error);
    }
}
async function forecastApiFetch() {
    try {
        const response = await fetch(forecastUrl);
        if (response.ok) {
            const forecastData = await response.json();
            displayForecast(forecastData);
        } else {
            throw new Error(`API response error: ${response.status}`);
        }
    } catch (error) {
        console.error('Error fetching forecast data:', error);
    }
}
    

    function convertUnixToHHMM(unixTime) {
        let date = new Date(unixTime * 1000);
        let hours = date.getHours();
        let minutes = date.getMinutes();
        let mornOrAft = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12 || 12; // Convert 0 hour to 12 for AM/PM format
        minutes = minutes < 10 ? '0' + minutes : minutes;
        return `${hours}:${minutes} ${mornOrAft}`;
    }
      
function displayData(data) {
    myDescription.innerHTML = data.weather[0].description
    myTemperature.innerHTML = `${data.main.temp}&deg;C`
    tempMax.innerHTML =  `${data.main.temp_max}&deg;C`
    tempMin.innerHTML =  `${data.main.temp_min}&deg;C`
    humidity.innerHTML =  `${data.main.humidity}%`
    

    sunrise.innerHTML = convertUnixToHHMM(data.sys.sunrise);
    sunset.innerHTML = convertUnixToHHMM(data.sys.sunset);
        let desc = data.weather[0].description;
        const iconsrc = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`;
        weatherIcon.setAttribute('src', iconsrc);
        weatherIcon.setAttribute('alt', data.weather[0].description);
        
}
function displayForecast(data) {
    // Get today's, tomorrow's, and the day after tomorrow's forecast from the API response
    const todayForecast = data.list[0]; // Closest to current time
    const tomorrowForecast = data.list[8]; // ~24 hours from now (3-hour intervals, 8*3 = 24)
    const nextDayForecast = data.list[16]; // ~48 hours from now (8*3*2 = 48)

    forecastToday.innerHTML = `${todayForecast.main.temp_max}&deg;C`;
    forecastTomorrow.innerHTML = `${tomorrowForecast.main.temp_max}&deg;C`;
    forecastNextday.innerHTML = `${nextDayForecast.main.temp_max}&deg;C`;
}


apiFetch();
