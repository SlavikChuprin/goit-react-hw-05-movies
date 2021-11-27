import { useEffect, useState } from "react";
import s from "./Cast.module.css";
import { castFetch } from "../services/movies-api";

const PATH = "https://image.tmdb.org/t/p/w500";

export default function Cast({ id }) {
  const [cast, setCast] = useState([]);

  useEffect(() => {
    castFetch(id).then(({ cast }) => {
      if (cast.length === 0) {
        setCast(null);
        return;
      }
      setCast(cast);
    });
  }, [id]);

  return (
    <div>
      {!cast ? (
        <p>We have not info about cast</p>
      ) : (
        <ul className={s.castList}>
          {cast.map((actor) => (
            <li key={actor.id}>
              {actor.profile_path && (
                <img
                  className={s.avatar}
                  src={`${PATH}${actor.profile_path}`}
                  alt={actor.name}
                />
              )}
              <p>actor: {actor.name}</p>
              <p>role: {actor.character}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
