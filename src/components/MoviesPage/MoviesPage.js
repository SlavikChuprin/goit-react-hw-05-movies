import { useState } from "react";
// import { useRouteMatch } from "react-router-dom";
import s from "./MoviesPage.module.css";
import fetchMovies from "../services/movies-api";
import MoviesList from "../MoviesList";

export default function MoviesPage() {
  // const { url } = useRouteMatch();
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);

  const onSearchMovies = (e) => {
    e.preventDefault();
    fetchMovies(query).then(({ results }) => {
      setMovies(results);
      localStorage.setItem("movies", JSON.stringify(results));
    });

    setQuery("");
  };

  return (
    <div className={s.search}>
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
      <MoviesList movies={movies} />
    </div>
  );
}
