import { useEffect, useState } from "react/cjs/react.development";
import s from "./Cast.module.css";

const KEY = "1e27ccd499acdd34586e1a1998d6f578";
const URL = "https://api.themoviedb.org/3/";
const PATH = "https://image.tmdb.org/t/p/w500";

const castFetch = (id) => {
  return fetch(`${URL}movie/${id}/credits?api_key=${KEY}&language=en-US`).then(
    (res) => {
      if (res.cast !== []) {
        return res.json();
      }
      return Promise.reject(
        new Error("unfotently, we have not info about actors")
      );
    }
  );
};
export default function Cast({ id }) {
  const [cast, setCast] = useState(null);

  useEffect(() => {
    castFetch(id).then(({ cast }) => {
      setCast(cast);
    });
  }, [id]);

  return (
    <ul className={s.castList}>
      {cast &&
        cast.map((actor) => (
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
  );
}
