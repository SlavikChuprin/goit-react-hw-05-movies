import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import s from "./MovieDetailsPage.module.css";
import { NavLink, Route, useRouteMatch } from "react-router-dom";
import Cast from "../Cast";

const PATH = "https://image.tmdb.org/t/p/w500";

export default function MovieDetailsPage() {
  const { url, path } = useRouteMatch();
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
      <div className={s.filmDetails}>
        <button className={s.btn} type="button">
          Go back
        </button>
        {film && (
          <div className={s.cardFilm}>
            <img
              className={s.cover}
              src={`${PATH}${film.poster_path}`}
              alt={film.title}
            />
            <div className={s.filmDescription}>
              <h2>{film.title}</h2>
              <h3>User score:</h3>
              <p> {film.vote_average}</p>
              <h3>Overview: </h3>
              <p>{film.overview}</p>
              <h3>Genres</h3>
              <p>{genres.join(", ")}</p>
            </div>
          </div>
        )}
      </div>
      <ul className={s.additionalInfo}>
        Additional information:
        <li>
          <NavLink to={`${url}/cast`}>Cast</NavLink>
        </li>
        <li>
          <NavLink to={`${url}/reviews`}>Reviews</NavLink>
        </li>
      </ul>

      <Route path={`${path}/cast`} exact>
        <Cast id={filmId} />
      </Route>
      <Route path={`${path}/reviews`} exact>
        <h1>reviews</h1>
      </Route>
    </div>
  );
}
