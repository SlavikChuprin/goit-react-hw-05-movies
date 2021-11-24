import { useEffect, useState } from "react";
import MoviesList from "../MoviesList";
import PageHeading from "../PageHeading";
import { fetchMovies } from "../services/movies-api";
// import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
// import Loader from "react-loader-spinner";

export default function HomePage() {
  const [movies, setMovies] = useState([]);
  // const [pending, setPending] = useState(false);

  useEffect(() => {
    // setPending(true);

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
