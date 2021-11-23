import { useState, useEffect } from "react/cjs/react.development";
import { reviewsFetch } from "../services/movies-api";
import s from "./Reviews.module.css";

export default function Reviews({ id }) {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    reviewsFetch(id).then(({ results }) => {
      if (results.length === 0) {
        setReviews(null);
        return;
      }
      setReviews(results);
    });
  }, [id]);

  return (
    <div>
      {!reviews ? (
        <p>Have not reviews about this film yet</p>
      ) : (
        <ul className={s.reviewsList}>
          {reviews.map((review) => (
            <li key={review.id}>
              <h4>Author: {review.author} </h4>
              <p>{review.content}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
