import { Link } from "react-router-dom";
import s from "./MoviesList.module.css";

export default function MoviesList({ movies, url }) {
  return (
    <ul className={s.moviesList}>
      {movies.map(({ title, id }) => (
        <li key={id}>
          <Link to={`/movies/${id}`}>{title}</Link>
        </li>
      ))}
    </ul>
  );
}
