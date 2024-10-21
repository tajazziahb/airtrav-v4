import {getPlans} from "./plans.js";
import {addPlan} from "./plans.js";

const plansEl = document.querySelector('#posts');

const API_URL = "https://eadbaafjveoawihuijpz.supabase.co/rest/v1"
const API_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVhZGJhYWZqdmVvYXdpaHVpanB6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjYxNzk4MTIsImV4cCI6MjA0MTc1NTgxMn0.wV7DUkg9vLbo1wumRMHhIY25ZYSaD6DXP4hZrbpal_g"

getPlans()
    .then (data => {
        // console.log(data)
        // data.forEach(item => console.log(item))
        data.forEach(item => showTravelPlans(item))
})


function showTravelPlans(item = {}) {

  // console.log("works")
  const div = document.createElement('div');
  div.innerHTML = `
        <div class="card bg-base-100 shadow-xl">
          <div class="card-body">
            <h3 class="card-title">${item['date']}</h3>
            <p class="text-gray-600">Destination: ${item['location']}</p>
            <p>${item['plan']}</p>
            <div class="card-actions justify-end">
              <button class="btn btn-primary">View More</button>
            </div>
          </div>
        </div>
    `

  plansEl.appendChild(div);
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

