import { useState } from "react/cjs/react.development";
import s from "./Cast.module.css";

const KEY = "1e27ccd499acdd34586e1a1998d6f578";
const URL = "https://api.themoviedb.org/3/";

export default function Cast({ id }) {
  const [cast, setCast] = useState([]);
  fetch(`${URL}movie/${id}/credits?api_key=${KEY}&language=en-US`).then(
    (res) => {
      if (res.ok) {
        setCast(res.json);
        console.log(res.json);
        return;
      }
      if (res.cast === 0)
        return Promise.reject(
          new Error(`unfotently, we have not info about actors`)
        );
    }
  );
  return (
    <ul classname={s.castList}>
      {cast &&
        cast.cast.map((actor) => (
          <li key={actor.id}>
            <img src={`${URL}${actor.profile_path}`} alt={actor.name} />
            <p>{actor.name}</p>
            <p>{actor.character}</p>
          </li>
        ))}
    </ul>
  );
}
