import React from 'react';
import { useSelector } from "react-redux";
import { Link } from 'react-router-dom';
import style from "../styles/ReviewHistory.module.css";

const ReviewHistory = () => {
  const { totalReview } = useSelector((state) => state.reviewReducer);
  console.log(totalReview)

  if (totalReview.length !== 0) {
    return (
      <div className={style.globalContainerOrder}>
        {totalReview.map((r) =>
          <div className={style.containerCard}  key={r.id_review}>
            <Link to={`/reviewDetail/${r.id_review}`}>
              <div className={style.container}>
                <img className={style.card__img} src={r.image} alt="plato" />
                <h2 className={style.nameCantidada}>{r.name}</h2>
                
                <br />
              </div>
            </Link>
          </div>
        )}
      </div>
    )
  }
}

export default ReviewHistory