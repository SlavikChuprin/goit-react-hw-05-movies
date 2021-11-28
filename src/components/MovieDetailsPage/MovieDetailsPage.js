import { useState, useEffect } from "react";
import { Switch, useParams, useLocation, useHistory } from "react-router-dom";
import s from "./MovieDetailsPage.module.css";
import { NavLink, Route, useRouteMatch } from "react-router-dom";
import { PATH } from "../services/movies-api";
import { lazy, Suspense } from "react";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";
const Cast = lazy(() => import("../Cast" /* webpackChunkName: "Cast" */));
const Reviews = lazy(() =>
  import("../Reviews" /* webpackChunkName: "Reviews" */)
);
export default function MovieDetailsPage() {
  const { url, path } = useRouteMatch();
  const location = useLocation();
  const history = useHistory();

  const { filmId } = useParams();

  const [film, setFilm] = useState(null);
  const [genres, setGenres] = useState(null);

  useEffect(() => {
    const curentFilm = JSON.parse(window.localStorage.getItem("movies")).find(
      (film) => film.id === Number(filmId)
    );
    setFilm(curentFilm);

    const genresArray = JSON.parse(window.localStorage.getItem("genres"));

    const genresForFilm = curentFilm.genre_ids.reduce((acc, id) => {
      const genreInFilm = genresArray.genres.find((genre) => genre.id === id);
      acc = [...acc, genreInFilm.name];
      return acc;
    }, []);

    setGenres(genresForFilm);
  }, [filmId]);

  const onGoBack = () => {
    history.push(location?.state?.from ?? "/");
  };

  return (
    <div>
      <div className={s.filmDetails}>
        <button className={s.btn} type="button" onClick={onGoBack}>
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
          <NavLink
            to={{
              pathname: `${url}/cast`,
              state: { from: location?.state?.from ?? "/" },
            }}
          >
            Cast
          </NavLink>
        </li>
        <li>
          <NavLink
            to={{
              pathname: `${url}/reviews`,
              state: { from: location?.state?.from ?? "/" },
            }}
          >
            Reviews
          </NavLink>
        </li>
      </ul>
      <Suspense
        fallback={
          <Loader
            type="Grid"
            color="#00BFFF"
            height={500}
            width={500}
            timeout={3000}
          />
        }
      >
        <Switch>
          <Route path={`${path}/cast`} exact>
            <Cast id={filmId} />
          </Route>
          <Route path={`${path}/reviews`} exact>
            <Reviews id={filmId} />
          </Route>
        </Switch>
      </Suspense>
    </div>
  );
}
