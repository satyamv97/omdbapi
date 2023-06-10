// const apiKey = '[yourkey]&';
const searchInput = document.getElementById('searchInput');
const searchResults = document.getElementById('searchResults');
const movieDetails = document.getElementById('movieDetails');

searchInput.addEventListener('input', () => {
  const searchTerm = searchInput.value.trim();
  if (searchTerm !== '') {
    searchMovies(searchTerm);
  } else {
    searchResults.innerHTML = '';
  }
});

function searchMovies(query) {

  const url = `https://www.omdbapi.com/?s=${query}&apikey=88da2735&page=1`;

  // Clear previous search results
  searchResults.innerHTML = '';
  console.log(query);

  // Fetch movie results from the OMDB API
  fetch(`${url}`)
    .then(response => response.json())
    .then(data => {
      if (data.Search) {
        const movies = data.Search;

        // Display search results
        movies.forEach(movie => {
          const listItem = document.createElement('li');
          listItem.classList.add('movie-item');
          listItem.textContent = movie.Title;

          listItem.addEventListener('click', () => {
            showMovieDetails(movie.imdbID);
          });

          searchResults.appendChild(listItem);
        });
      }
    })
    .catch(error => {
      console.log('Error:', error);
    });
}

function showMovieDetails(movieId) {
  const url = `https://www.omdbapi.com/?apikey=${apiKey}&i=${movieId}`;

  // Fetch detailed information about the movie from the OMDB API
  fetch(url)
    .then(response => response.json())
    .then(movie => {
      // Display movie details
      movieDetails.innerHTML = `
        <h2>${movie.Title}</h2>
        <p>${movie.Plot}</p>
        <p>Genre: ${movie.Genre}</p>
      `;
      movieDetails.style.display = 'block';
    })
    .catch(error => {
      console.log('Error:', error);
    });
}
