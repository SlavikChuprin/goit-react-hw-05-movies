const KEY = "1e27ccd499acdd34586e1a1998d6f578";
const URL = "https://api.themoviedb.org/3/";
const PATH = "https://image.tmdb.org/t/p/w500";
const fetchMovies = (query) => {
  fetch(`${URL}genre/movie/list?api_key=${KEY}&language=en-US)`)
    .then((res) => res.json())
    .then((res) => localStorage.setItem("genres", JSON.stringify(res)));

  if (query) {
    return fetch(
      `${URL}search/movie?api_key=${KEY}&language=en-US&page=1&include_adult=false&query=${query}`
    ).then((res) => {
      if (res.ok) {
        return res.json();
      }

      return Promise.reject(
        new Error(`unfotently, we have not films for request ${query}`)
      );
    });
  }

  return fetch(`${URL}/trending/movie/day?api_key=${KEY}`).then((res) => {
    if (res.ok) {
      return res.json();
    }

    return Promise.reject(new Error(`404 not found films`));
  });
};

const castFetch = (id) => {
  return fetch(`${URL}movie/${id}/credits?api_key=${KEY}&language=en-US`)
    .then((res) => res.json())
    .catch((error) => error);
};

const reviewsFetch = (id) => {
  return fetch(`${URL}movie/${id}/reviews?api_key=${KEY}&language=en-US&page=1`)
    .then((res) => res.json())
    .catch((error) => error);
};

export { PATH, fetchMovies, castFetch, reviewsFetch };
