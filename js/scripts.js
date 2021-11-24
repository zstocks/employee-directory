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
  makeModal(data, cards);
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

const makeModal = (userData, arr) => {
 for (let i = 0; i < userData.results.length; i++) {

  arr[i].addEventListener('click', () => {
   if (arr[i].querySelector('#email').textContent === userData.results[i].email) {
    const user = userData.results[i];
    //Need to reformat phone and birthday
    const userPhone = '(xxx) xxx-xxxx';
    const userDOB = '10/21/1998';

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
   }
  });

 }


 // const image = card.querySelector('img').src;
 // const name = card.querySelector('h3').textContent;
}

// cards are built and added to DOM [check]
// card elements are added to an array [check]
// use array to add event listeners on each card [check]
// on click, compare card.querySelector('#email').textContent to user.email [check]
// on match, build a modal with the user's info and
// add the modal to the DOM
// modal is removed from DOM on close, but event listeners remain on the card elements

