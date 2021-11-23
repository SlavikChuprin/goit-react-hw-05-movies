import { Link, useLocation } from "react-router-dom";
import s from "./MoviesList.module.css";

export default function MoviesList({ movies, url }) {
  const location = useLocation();
  return (
    <ul className={s.moviesList}>
      {movies.map(({ title, id }) => (
        <li key={id}>
          <Link to={{ pathname: `/movies/${id}`, state: { from: location } }}>
            {title}
          </Link>
        </li>
      ))}
    </ul>
  );
}
