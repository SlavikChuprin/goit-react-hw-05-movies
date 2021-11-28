import { useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import s from "./MoviesPage.module.css";
import { fetchMovies } from "../services/movies-api";
import MoviesList from "../MoviesList";

// import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
// import Loader from "react-loader-spinner";

export default function MoviesPage() {
  const history = useHistory();
  const location = useLocation();
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [noResults, setNoResults] = useState(false);

  const onSearchMovies = (e) => {
    e.preventDefault();

    history.push({ ...location, search: `query=${query}`, state: `${query}` });
    setQuery("");
  };

  useEffect(() => {
    if (location.state) {
      fetchMovies(location.state)
        .then(({ results }) => {
          if (results.length === 0) {
            setNoResults(true);
            return;
          }
          setMovies(results);
          localStorage.setItem("movies", JSON.stringify(results));
        })
        .finally(setNoResults(false));
    }
    return;
  }, [location]);

  return (
    <div className={s.search}>
      <form onSubmit={onSearchMovies}>
        <label>
          <input
            type="text"
            className={s.searchInput}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button className={s.btnSearch} onClick={onSearchMovies}>
            Search
          </button>
        </label>
      </form>
      {noResults ? (
        <h1>Sorry, we have not movies for request {location.state}</h1>
      ) : (
        <MoviesList movies={movies} />
      )}
    </div>
  );
}
