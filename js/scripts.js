const searchContainer = document.querySelector('.search-container');
const gallery = document.querySelector('#gallery');
let index;

// Add search element to the DOM
let html = `
 <form action="#" method="get">
  <input type="search" id="search-input" class="search-input" placeholder="Search..." incremental>
 </form>
`;
searchContainer.insertAdjacentHTML('beforeend', html);

// Add an error message to the DOM for when a user's search yields no results
html = `<p id="no-match">Your search does not match any employees.</p>`;
document.querySelector('body').insertAdjacentHTML('beforeend', html);

// Select search field and error message now that they're in the DOM
const search = searchContainer.querySelector('#search-input');
const searchErr = document.querySelector('#no-match');

// Get 12 random people in the US from the RandomUser API
fetch('https://randomuser.me/api/?results=12&nat=us')
 .then( response => response.json() )
 .then( data => {
  console.log(data.results);
  makeCards(data);

  // Generate an array containing all the employee cards
  let cards = document.querySelectorAll('.card');
  cards = Array.from(cards);

  // Put employee names in an array
  const names = cards.map( card => card.querySelector('h3').textContent.toLowerCase());
  // When users interact with the search field, filter employees on the page
  search.addEventListener('search', () => {
    filterEmployees(names, cards);
  });

  // Add an event listener to each card to generate a modal for the card that is clicked
  for (const card of cards) {
   card.addEventListener('click', () => {
    index = cards.indexOf(card);
    makeModal(index, data);
   });
  }
 });

/**
 * Filter employees by name based on search input
 * 
 * @param {array} names - an array of employee names
 * @param {array} cards - an array of HTML elements
 */
const filterEmployees = (names, cards) => {
 let match = false;
 const input = search.value.toLowerCase();
 
 // Hide cards on the page that do not match search input.
 for (const name of names) {
  if (name.includes(input)) {
   match = true;
   cards[names.indexOf(name)].style.display = 'flex';
  } else {
   cards[names.indexOf(name)].style.display = 'none';
  }
 }

 // If there are no matches to the search input, display the error message.
 if (!match) {
  searchErr.style.display = 'block';
 } else {
  searchErr.style.display = 'none';
 }
}

/**
* Create each employee's card using the RandomUser API results.
* 
* @param {Object} userData - JSON response from the Random User API.
*/
const makeCards = userData => {
 for (const user of userData.results) {
  // Build the card's HTML
  let html = `
   <div class="card">
    <div class="card-img-container">
     <img class="card-img" src="${user.picture.large}" alt="profile picture">
    </div>
    <div class="card-info-container">
     <h3 id="${user.name.first.toLowerCase()}-${user.name.last.toLowerCase()}" class="card-name cap">${user.name.first} ${user.name.last}</h3>
     <p id="email" class="card-text">${user.email}</p>
     <p class="card-text cap">${user.location.city}, ${user.location.state}</p>
    </div>
   </div>
  `;

   // Add this card to the DOM
   gallery.insertAdjacentHTML('beforeend', html);
  }
}

/**
 * Creates a modal and adds it to the page along with necessary event listeners for closing the modal or moving through the directory
 * 
 * @param {HTMLElement} index - the index associated with the employee data to display in the modal.
 * @param {Object} - JSON response from the Random User API.
 */
const makeModal = (index, data) => {
 
 const employee = data.results[index];

 // Build modal HTML
 let html = `
 <div class="modal-container">
  <div class="modal">
   <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
    <div class="modal-info-container">
     <img class="modal-img" src="${employee.picture.large}" alt="profile picture">
     <h3 id="${employee.name.first}-${employee.name.last}-modal" class="modal-name cap">${employee.name.first} ${employee.name.last}</h3>
     <p class="modal-text">${employee.email}</p>
     <p class="modal-text cap">${employee.location.city}</p>
     <hr>
     <p class="modal-text">${formatPhone(employee)}</p>
     <p class="modal-text">${employee.location.street.number} ${employee.location.street.name}, ${employee.location.city}, ${employee.location.state} ${employee.location.postcode}</p>
     <p class="modal-text">Birthday: ${formatDOB(employee)}</p>
    </div>
   </div>

   <div class="modal-btn-container">
    <button type="button" id="modal-prev" class="modal-prev btn" ${index === 0 ? 'style="display: none;"' : ''}>Prev</button>
    <button type="button" id="modal-next" class="modal-next btn" ${index === 11 ? 'style="display: none;"' : ''}>Next</button>
   </div>
  </div>
 `;

 // Add Modal to DOM
 document.querySelector('body').insertAdjacentHTML('beforeend', html);

 // When the close button is clicked, remove the modal from the DOM
 document.querySelector('.modal-close-btn').addEventListener('click', closeModal);

 // When the next button is clicked, display a modal for the next employee
 document.querySelector('#modal-next').addEventListener('click', () => {
  index += 1;
  closeModal();
  makeModal(index, data);
 });

 // When the prev button is clicked, display a modal for the previous employee
 document.querySelector('#modal-prev').addEventListener('click', () => {
  index -= 1;
  closeModal();
  makeModal(index, data);
 });
}

/**
 * Converts employee's phone number to the following format: (xxx) xxx-xxxx
 *
 * @param (Object) employee - object containing data for this employee
 * @returns (string) - the properly formatted phone number
 */
const formatPhone = employee => `(${employee.phone.slice(1, 4)}) ${employee.phone.slice(6, 9)}-${employee.phone.slice(-4)}`;

/**
 * Converts employee's date of birth to the following format: MM/DD/YYYY
 *
 * @param (Object) employee - object containing data for this employee
 * @returns (string) - the properly formatted date of birth
 */
const formatDOB = employee => `${employee.dob.date.slice(5, 7)}/${employee.dob.date.slice(8, 10)}/${employee.dob.date.slice(0, 4)}`;

/**
 * Removes the current modal from the DOM
 */
const closeModal = () => {
    document.querySelector('.modal-container').remove();
}