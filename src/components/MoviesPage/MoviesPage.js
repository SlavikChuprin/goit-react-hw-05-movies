import { useState } from "react";
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

  const onSearchMovies = (e) => {
    e.preventDefault();
    fetchMovies(query).then(({ results }) => {
      setMovies(results);
      localStorage.setItem("movies", JSON.stringify(results));
    });

    history.push({ ...location, search: `query=${query}` });

    setQuery("");
  };

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

      <MoviesList movies={movies} />
    </div>
  );
}
