import {getPlans} from "./plans.js";
import {addPlan} from "./plans.js";

// Project 5 v2
// Fetch weather data from the OpenWeatherMap API for a default city (e.g., Boston)

const searchButton = document.querySelector('#search-btn');
const cityInput = document.querySelector('#city-input');
const forecastUl = document.querySelector('#weather-cards');
const apiKey = "a6f4a4af866600cddf344e0c6d164029";

// Add an input field allowing users to change the city and update the forecast
const getCity = () => {
  const cityName = cityInput.value;
  const url = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${apiKey}&exclude=hourly,minutely,alert,current&units=imperial`;

  fetch(url)
    .then(function (response) {
      return response.json()
    })
    .then(function (data) {

      // console.log(data.list)
      // console.log(data.list[0])
      // console.log(data.list[0].dt_txt)
      // console.log(data.list[0].main.temp_min)
      // console.log(data.list[0].main.temp_max)
      // console.log(data.list[0].weather[0].description)

      const myNewData = data.list.filter(function (item) {
        // console.log(item.dt_txt)
        // console.log(item.dt_txt.includes("15:00:00"))

        return item.dt_txt.includes("15:00:00")
      })
      console.log(data.list)
      console.log(myNewData)

      forecastUl.innerHTML = ""

      myNewData.forEach(function (item) {

        // console.log(data.list[0])
        // console.log(data.list[0].dt_txt)
        // console.log(data.list[0].main.temp_min)
        // console.log(data.list[0].main.temp_max)
        // console.log(data.list[0].weather[0].description)
        // console.log(data.list[0].weather[0].icon)

        //Display the weather forecast for the next 4 days, including: Date, Weather icon, Temperature (high and low),Brief description (e.g., "Partly cloudy")

        const li = document.createElement('li')
        li.innerHTML =
          `
            <p class="bg-sky-300 text-white p-4 rounded-t-lg">${item.dt_txt}</p>
            <p class=" bg-sky-300 text-white p-4">High: ${item.main.temp_max}</p>
            <p class=" bg-sky-300 text-white p-4">Low: ${item.main.temp_min}</p>
			<img class=" bg-sky-300 text-white p-10 "  src="https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png" alt="weather-icon">
			<p class="bg-sky-300 text-white p-4 flex gap-10 rounded-b-lg">${item.weather[0].description}</p>
          `
        forecastUl.appendChild(li)

      })
    })
}

searchButton.addEventListener("click", getCity);


// Project 6 v3
// Add a form to input new travel plans (date, location, plan)
// Create a function to insert new plans into the Supabase table
// Fetch and display existing travel plans from Supabase
// Use forEach and/or filter to organize and display the plans
// Add the ability to delete or update existing plans

const plansEl = document.querySelector('#plans');

const API_URL = "https://eadbaafjveoawihuijpz.supabase.co/rest/v1"
const API_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVhZGJhYWZqdmVvYXdpaHVpanB6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjYxNzk4MTIsImV4cCI6MjA0MTc1NTgxMn0.wV7DUkg9vLbo1wumRMHhIY25ZYSaD6DXP4hZrbpal_g"

getPlans()
    .then (data => {
        // console.log(data)
        // data.forEach(item => console.log(item))
        data.forEach(item => showTravelPlans(item))
})

// **Minimum Viable Solution**, MVS (i.e.: the simplest "correct" thing that solves the problem)
// When I click the delete button
// I want it to log "this works, with the ID" in the console of my browser


function showTravelPlans(item = {}) {

  // console.log("works")
  const div = document.createElement('div');
  div.innerHTML = `
        <div class="card bg-base-100 shadow-xl">
          <div class="card-body">
            <h3 class="card-title">(${item['id']})${item['date']}</h3>
            <p class="text-gray-600">Destination: ${item['location']}</p>
            <p>${item['plan']}</p>
            <div class="card-actions justify-end">
              <button class="btn btn-primary">Read More</button>
              <button class="btn btn-error" onclick="handleDelete(${item['id']})">Delete</button>
            </div>
          </div>
        </div>
    `

  plansEl.appendChild(div);
}

function handleDelete(){

}

document.querySelector('#add-plan').addEventListener('submit', async function(event){
    event.preventDefault();
    // console.log("works")

    const form = document.querySelector('#add-plan')
    const submitButton = document.querySelector('#submit-button');

    // Get the values from the form
    const location = document.querySelector('#location').value;
    // console.log(location);
    const plan = document.querySelector('#plan').value;
    // console.log(plan);
    const date = document.querySelector('#trip-date').value;
    // console.log(date);

    const newPlan = {
        location: location,
        plan: plan,
        date: date
    }
    console.log(newPlan);

    // Call your function to add the plan
    const response = await addPlan(newPlan);
    console.log(response); // Log the result (either success or error)

    try {
        submitButton.disabled = true
        await addPlan(newPlan)
        form.reset()
    } catch (error) {
        console.error('Error adding post:', error)
        alert('Error adding post:' + error.message)
    }finally{
        submitButton.disabled = false
    }
})


