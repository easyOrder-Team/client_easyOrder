import React, { useState } from "react";
import { Rating } from "react-simple-star-rating";
import { useDispatch } from "react-redux";
import * as actions from "../redux/review/actions";
import s from "../styles/Review.module.css";
export const Stars = (props) => {
  const dispatch = useDispatch();
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState({
    stars: 0,
    comment: "",
    id_profile: props.id_profile,
    products: props.products,
  });
  // Catch Rating value
  const handleRating = (rate) => {
    setRating(rate);
    setReview({ ...review, stars: rate });
    console.log(rate);
    // other logic
  };
  const handleChange = (e) => {
    setReview({ ...review, [e.target.name]: e.target.value });
  };
  const handleClick = (e) => {
    e.preventDefault();
    setReview({
      stars: rating,
      comment: review.comment,
      id_profile: props.id_profile,
      products: props.products,
    });
    console.log(review);
    dispatch(actions.createReview(review));
  };
  // Optinal callback functions
  return (
    <div className={s.review}>
      <Rating
        onClick={handleRating}
        size={20}
        iconsCount={5}
        className={s.star}
      />
      <textarea
        name="comment"
        cols="30"
        rows="10"
        value={review.comment}
        onChange={handleChange}
        className={s.textarea}
        placeholder="Ingrese su comentario aquí..."
      ></textarea>
      <button onClick={handleClick} className={s.btn1}>
        Enviar
      </button>
    </div>
  );
};
