
//only runs after all dom contents has been loaded
document.addEventListener("DOMContentLoaded", () => {


  function displayMovieList() {
    fetch('http://localhost:3000/films')
      .then(res => res.json())
      .then(films => {

// Adds full movie list to the left side of the page
       // const movieList = document.createElement('ul');
       // movieList.id = 'films';
       // movieList.classList.add('movie-list');
const movieList = document.getElementById('films')

  // add each title to list and add event listener 
        films.forEach(film => {
          const li = document.createElement('li');
          let movied= document.getElementById('films')
          

          li.classList.add('film', 'item');
          li.textContent = film.title;
          
          movied.appendChild(li);


          li.addEventListener('click', () => {
            const availableTickets = film.capacity - film.tickets_sold;
            const movieDetails = `
              <div class="card">
                <img src="${film.poster}" class="card-img-top" alt="${film.title}">
                <div class="card-body">
                  <h5 class="card-title">${film.title}</h5>
                  <p id="available-tickets" class="card-text">Runtime: ${film.runtime} | Showtime: ${film.showtime} | Available Tickets: ${availableTickets}</p>
                  <a href="#" class="btn btn-primary"  id="buy-ticket">Buy Ticket</a>
                </div>
              </div>
            `
            document.getElementById('movie-details').innerHTML = movieDetails;

            // Add event listener to Buy Ticket button
            const buyTicketBtn = document.getElementById('buy-ticket');
            buyTicketBtn.addEventListener('click', () => {
              const availableTicketsSpan = document.getElementById('available-tickets');
              let availableTickets = parseInt(availableTicketsSpan.textContent);
              if (availableTickets > 0) {
                // Make POST request to update tickets_sold
                fetch(`http://localhost:3000/films/${film.id}`, {
                  method: 'PATCH',
                  headers: {
                    'Content-Type': 'application/json'
                  },
                  body: JSON.stringify({
                    tickets_sold: film.tickets_sold + 1
                  })
                })
                  .then(res => res.json())
                  .then(updatedFilm => {
                    console.log('Updated film:', updatedFilm);

                    // Update availableTickets on frontend
                    availableTicketsSpan.textContent = updatedFilm.capacity - updatedFilm.tickets_sold;
                  })
                  .catch(err => console.error(err));
              } else {
                alert('Sold out!');
              }
          });
        });
      })
        document.querySelector('.movie-list-container').appendChild(movieList);
   

 // Display details for the first movie on the right side of the page
const firstFilm = films[0]
const availableTickets=firstFilm.capacity-firstFilm.tickets_sold
const movieDetails =`
<div class="card">
<img src="${firstFilm.poster}" class="card-img-top" alt="${firstFilm.title}">

<div class="card-body">
  <h5 class="card-title">${firstFilm.title}</h5>
  <p class="card-text"> Runtime: ${firstFilm.runtime} | Showtime: ${firstFilm.showtime} | Available Tickets: ${availableTickets}</p>
  <a href="#" class="btn btn-primary">Buy Ticket</a>
</div>

</div>
`
document.getElementById('movie-details').innerHTML = movieDetails;


//add event lisstener for each movie once title is clicked and display each movies details
        document.querySelectorAll('.card').forEach(div => {
          div.addEventListener('click', (e) => {
            let target = e.target.parentNode
            if (target.childNodes.length < 2) {
              let movie = films.find(film => film.title === target.querySelector ('.card-title').textContent)

              let innercard = `
              <div class="card" >
              <img src="${movie.poster}" class="card-img-top" alt="${movie.title}">
              <div class="card-body">
                <h5 class="card-title">${movie.title}</h5>
                <p class="card-text">Runtime: ${movie.runtime} | Showtime: ${movie.showtime} | Available Tickets: ${movie.capacity - movie.tickets_sold}</p>
                <a href="#" class="btn btn-primary">Buy Ticket</a>
              </div>
            </div>
          `
              target.innerHTML = innercard
            } else {
              target.innerHTML =`
              <div class="card">
              <img src="${firstFilm.poster}" class="card-img-top" alt="${firstFilm.title}">
              <div class="card-body">
                <h5 class="card-title">${firstFilm.title}</h5>
                <p class="card-text">Runtime: ${firstFilm.runtime} | Showtime: ${firstFilm.showtime} | Available Tickets: ${availableTickets}</p>
                <a href="#" class="btn btn-primary">Buy Ticket</a>
              </div>
            </div>
              `
            }
          })
        })
      })
  }

  displayMovieList()

})


