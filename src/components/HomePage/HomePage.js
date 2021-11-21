import { useEffect, useState } from "react";
// import { useRouteMatch } from "react-router-dom";
import MoviesList from "../MoviesList";
import PageHeading from "../PageHeading";
import fetchMovies from "../services/movies-api";

export default function HomePage() {
  // const { url } = useRouteMatch();

  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetchMovies().then(({ results }) => {
      setMovies(results);
      localStorage.setItem("movies", JSON.stringify(results));
    });
  }, []);

  return (
    <div>
      <PageHeading text="Trending today" />
      <MoviesList movies={movies} />
    </div>
  );
}
