const searchContainer = document.querySelector('.search-container');
const gallery = document.querySelector('#gallery');

let html = `
 <form action="#" method="get">
     <input type="search" id="search-input" class="search-input" placeholder="Search...">
     <input type="submit" value="&#x1F50D;" id="search-submit" class="search-submit">
 </form>
`;
searchContainer.insertAdjacentHTML('beforeend', html);

fetch('https://randomuser.me/api/?results=12')
 .then( response => response.json() )
 .then( data => data.results )
 .then( results => {

  console.log(results);

  /**
   * Loop to create each person card using the returned results
  */
  for (const result of results) {
   let html = `
    <div class="card">
     <div class="card-img-container">
         <img class="card-img" src="${result.picture.large}" alt="profile picture">
     </div>
     <div class="card-info-container">
         <h3 id="${result.name.first.toLowerCase()}-${result.name.last.toLowerCase()}" class="card-name cap">${result.name.first} ${result.name.last}</h3>
         <p class="card-text">${result.email}</p>
         <p class="card-text cap">${result.location.city}, ${result.location.state}</p>
     </div>
    </div>
   `;

   gallery.insertAdjacentHTML('beforeend', html);
  }

 })
 .then( data => {
  const cards = document.querySelectorAll('.card');
  for (let card of cards) {
   console.log(card.querySelector('.card-img-container > img').src);
  }
 });


//Write functions down there v || Run functions up there ^