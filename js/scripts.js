const searchContainer = document.querySelector('.search-container');
const gallery = document.querySelector('#gallery');

let html = `
 <form action="#" method="get">
  <input type="search" id="search-input" class="search-input" placeholder="Search...">
  <input type="submit" value="&#x1F50D;" id="search-submit" class="search-submit">
 </form>
`;
searchContainer.insertAdjacentHTML('beforeend', html);

fetch('https://randomuser.me/api/?results=12&nat=us')
 .then( response => response.json() )
 .then( data => {
  console.log(data.results);
  makeCards(data);

  let cards = document.querySelectorAll('.card');
  cards = Array.from(cards);
  for (const card of cards) {
   card.addEventListener('click', () => {
    let thisCard = cards.indexOf(card);
    makeModal(thisCard, data);
   });
  }

 });

/**
* Create each employee's card using the returned API results
* 
* @param {object} userData - JSON response from the Random User API
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

const makeModal = (card, data) => {
 
 const nextCard = card + 1;
 const prevCard = card - 1;
 const user = data.results[card];
 console.log(user);

 //Format the API results for this user's phone and date of birth.
 const userPhone = `(${user.phone.slice(1, 4)}) ${user.phone.slice(6, 9)}-${user.phone.slice(-4)}`; // (xxx) xxx-xxxx
 const userDOB = `${user.dob.date.slice(5, 7)}/${user.dob.date.slice(8, 10)}/${user.dob.date.slice(0, 4)}`; // MM/DD/YYYY

 // Build modal HTML
 let html = `
 <div class="modal-container">
  <div class="modal">
   <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
    <div class="modal-info-container">
     <img class="modal-img" src="${user.picture.large}" alt="profile picture">
     <h3 id="${user.name.first}-${user.name.last}-modal" class="modal-name cap">${user.name.first} ${user.name.last}</h3>
     <p class="modal-text">${user.email}</p>
     <p class="modal-text cap">${user.location.city}</p>
     <hr>
     <p class="modal-text">${userPhone}</p>
     <p class="modal-text">${user.location.street.number} ${user.location.street.name}, ${user.location.city}, ${user.location.state} ${user.location.postcode}</p>
     <p class="modal-text">Birthday: ${userDOB}</p>
    </div>
   </div>

   // IMPORTANT: Below is only for exceeds tasks
   <div class="modal-btn-container">
    <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
    <button type="button" id="modal-next" class="modal-next btn">Next</button>
   </div>
  </div>
 `;

 // Add Modal to DOM
 document.querySelector('body').insertAdjacentHTML('beforeend', html);
 document.querySelector('.modal-close-btn').addEventListener('click', closeModal);
 document.querySelector('#modal-prev').addEventListener('click', prevModal(prevCard, data));
}

const closeModal = () => {
    document.querySelector('.modal-container').remove();
}

const nextModal = user => {
 
}

const prevModal = (card, data) => {
 return function(card, data) {
  closeModal();
  makeModal(card, data);
 }
}