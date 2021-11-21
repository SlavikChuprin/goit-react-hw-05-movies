const KEY = "1e27ccd499acdd34586e1a1998d6f578";

export default function fetchMovies() {
  return fetch(
    `https://api.themoviedb.org/3/trending/movie/day?api_key=${KEY}`
  ).then((response) => {
    if (response.ok) {
      return response.json();
    }

    return Promise.reject(new Error(`Нет фильмов`));
  });
}
