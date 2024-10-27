//Project 4 (Original)
// Create an interactive travel checklist web application that reproduces the provided design using TailwindCSS and DaisyUI,
// while implementing specific functionality using JavaScript.

// Add JavaScript functionality:
// Toggle visibility of the "Travel" and "Hotel" sections when their respective headers are clicked

const clickMeBtnEl = document.querySelector('#click-me');
const clickMeBtnElTwo = document.querySelector('#click-Two');
const travelSectionEl = document.querySelector('#travel-section');
const hotelSectionEl = document.querySelector('#hotel-section');

// Traveler Button
clickMeBtnEl.addEventListener('click', () => {

  travelSectionEl.classList.toggle('hidden');
});

// Hotel Button
clickMeBtnElTwo.addEventListener('click', () => {

  hotelSectionEl.classList.toggle('hidden');
});

// Populate the "Plan Ahead" section using an array of objects

const planAheadSection = [
  {
    featuredImage: 'https://i0.wp.com/guitarandlace.com/wp-content/uploads/2024/04/Google-docs-free-orange-app-icons.jpg?w=400&ssl=1',
    description: "Check visa requirements",
    buttonText: "Check visa",
    iconImage: 'https://cdn1.iconfinder.com/data/icons/heroicons-ui/24/dots-vertical-256.png',
  },
  {
    featuredImage: 'https://matthewcassinelli.com/wp-content/uploads/shortcut-add-a-custom-spreadsheet-icon.webp',
    description: "Check visa requirements",
    buttonText: "Check visa",
    iconImage: 'https://cdn1.iconfinder.com/data/icons/heroicons-ui/24/dots-vertical-256.png',
  },
  {
    featuredImage: 'https://www.giftsnode.com/assets/img/icons/gifts-for-colleague.svg',
    description: "Check visa requirements",
    buttonText: "Check Insurance",
    iconImage: 'https://cdn1.iconfinder.com/data/icons/heroicons-ui/24/dots-vertical-256.png',
  },
  {
    featuredImage: 'https://cdn.prod.website-files.com/629f58fef317062068fa4ccc/62c1fe9d54de259c6347f21e_calculate-payment-hero-p-500.jpeg',
    description: "Check visa requirements",
    buttonText: "Buy tickets",
    iconImage: 'https://cdn1.iconfinder.com/data/icons/heroicons-ui/24/dots-vertical-256.png',
  }

];

const RequirementOne = {
  featuredImage: 'https://i0.wp.com/guitarandlace.com/wp-content/uploads/2024/04/Google-docs-free-orange-app-icons.jpg?w=400&ssl=1',
  description: "Check visa requirements",
  buttonText: "Check visa",
  iconImage: 'https://cdn1.iconfinder.com/data/icons/heroicons-ui/24/dots-vertical-256.png',
};

const RequirementTwo = {
  featuredImage: 'https://matthewcassinelli.com/wp-content/uploads/shortcut-add-a-custom-spreadsheet-icon.webp',
  description: "Check visa requirements",
  buttonText: "Check visa",
  iconImage: 'https://cdn1.iconfinder.com/data/icons/heroicons-ui/24/dots-vertical-256.png',
};

const RequirementThree = {
  featuredImage: 'https://www.giftsnode.com/assets/img/icons/gifts-for-colleague.svg',
  description: "Check visa requirements",
  buttonText: "Check Insurance",
  iconImage: 'https://cdn1.iconfinder.com/data/icons/heroicons-ui/24/dots-vertical-256.png',
};

const RequirementFour = {
  featuredImage: 'https://cdn.prod.website-files.com/629f58fef317062068fa4ccc/62c1fe9d54de259c6347f21e_calculate-payment-hero-p-500.jpeg',
  description: "Check visa requirements",
  buttonText: "Buy tickets",
  iconImage: 'https://cdn1.iconfinder.com/data/icons/heroicons-ui/24/dots-vertical-256.png',
};


console.log(planAheadSection);

for (const section of planAheadSection) {

  console.log("------");
  console.log(`Title: ${section['description']}`);
  console.log(`Title: ${section['buttonText']}`);
  console.log("------");

}


// Project 6 v3
// Add a form to input new travel plans (date, location, plan)

 const formEl = document.querySelector('#make-trip');
formEl.addEventListener('submit', (event) => {
  event.preventDefault();
})

// const submitButton = document.querySelector('#submit-btn');
// const tripDate = document.querySelector('#trip-date');
// // const tripLocation = document.querySelector('#trip-location')
// const tripPlan = document.querySelector('#trip-notes')

const plansEl = document.querySelector('#plans')
const API_URL = 'https://eadbaafjveoawihuijpz.supabase.co/rest/v1'
const API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVhZGJhYWZqdmVvYXdpaHVpanB6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjYxNzk4MTIsImV4cCI6MjA0MTc1NTgxMn0.wV7DUkg9vLbo1wumRMHhIY25ZYSaD6DXP4hZrbpal_g'

fetch(`${API_URL}/travel_plans?select=*&apikey=${API_KEY}`)
.then(response => response.json())
.then(data => {
console.log(data);

data.forEach(item => showTravelPlans(item))

})

function showTravelPlans(item) {

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

