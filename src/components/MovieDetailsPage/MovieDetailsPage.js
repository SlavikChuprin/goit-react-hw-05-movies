import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
const PATH = "https://image.tmdb.org/t/p/w500";
export default function MovieDetailsPage() {
  const { filmId } = useParams();

  const [film, setFilm] = useState(null);
  const [genres, setGenres] = useState(null);

  useEffect(() => {
    const curentFilm = JSON.parse(window.localStorage.getItem("movies")).find(
      (film) => film.id === Number(filmId)
    );
    setFilm(curentFilm);

    const genresArray = JSON.parse(window.localStorage.getItem("genres"));
    console.log(genresArray);
    const genresForFilm = curentFilm.genre_ids.reduce((acc, id) => {
      const genreInFilm = genresArray.genres.find((genre) => genre.id === id);
      acc = [...acc, genreInFilm.name];
      return acc;
    }, []);
    console.log(genresForFilm);
    setGenres(genresForFilm);
  }, [filmId]);

  useEffect(() => {}, []);

  return (
    <div>
      <button type="button">Go back</button>
      {film && (
        <div>
          <img src={`${PATH}${film.poster_path}`} alt={film.title} />
          <h2>{film.title}</h2>
          <h3>User score:</h3>
          <p> {film.vote_average}</p>
          <h3>Overview: </h3>
          <p>{film.overview}</p>
          <h3>Genres</h3>
          <p>{genres.join(", ")}</p>
        </div>
      )}
    </div>
  );
}
