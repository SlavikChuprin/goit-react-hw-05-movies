const KEY = "1e27ccd499acdd34586e1a1998d6f578";
const URL = "https://api.themoviedb.org/3/";

export default function fetchMovies(query) {
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
}

// class FetchApi {
//   constructor() {
//     this.searchQuery = "";
//   }

//   async fetchPopularFilms() {
//     const url = `${URL}movie/popular?api_key=${KEY}&page=1`;
//     try {
//       const response = await fetch(url);
//       const results = await response.json();
//       return results;
//     } catch (error) {
//       return error;
//     }
//   }

//   // Асинхронная функция для получения жанров фильмов с апи
//   async fetchGenres() {
//     const url = `${URL}genre/movie/list?api_key=${KEY}`;
//     try {
//       const response = await fetch(url);
//       const results = await response.json();
//       return results;
//     } catch (error) {
//       return error;
//     }
//   }

//   // Асинхронная функция для вывода фильмов через строку поиска
//   async fetchSearchFilms() {
//     try {
//       const response = await fetch(
//         `${URL}search/movie?api_key=${KEY}&page=1&include_adult=false&query=${this.searchQuery}`
//       );
//       const data = await response.json();
//       const results = await data;
//       return results;
//     } catch (error) {
//       return error;
//     }
//   }

//   //  Функция замены жанров
//   //  replaceGenreA(arrayGenre, film) {
//   //     // console.log(film);
//   //     film.results.forEach((r) => {
//   //       for (let i = 0; i < arrayGenre.length; i += 1) {
//   //         for (let j = 0; j < r.genre_ids.length; j += 1) {
//   //           arrayGenre[i].id === r.genre_ids[j]
//   //             ? (r.genre_ids[j] = arrayGenre[i].name)
//   //             : r.genre_ids[j];
//   //         }
//   //       }
//   //     });
//   //   }
// }
// export default FetchApi;
