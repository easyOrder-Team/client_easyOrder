import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { NavBar } from ".";
import * as actionsReview from "../redux/review/actions";
import * as actionsProduct from "../redux/product/actions";
import { useParams } from 'react-router-dom';
import style from "../styles/ReviewDetails.module.css";
import s from "../styles/ItemCount.module.css";
import { Rating } from "react-simple-star-rating";

const ReviewDetail = () => {
    const { id } = useParams();
    const [count, setCount] = useState(1);
    const dispatch = useDispatch()
    const { reviewById } = useSelector((state) => state.reviewReducer);
    // let id_product = reviewById[0].id_products

    useEffect(() => {
        dispatch(actionsReview.getReviewByIdReview(id));
        // dispatch(actionsProduct.getProductById(reviewById[0].id_products));
    }, []);
    console.log(reviewById)
    // const { detailProduct } = useSelector((state) => state.productReducer);

    const resta = () => {
        setCount(count - 1);
    };

    const suma = () => {
        setCount(count + 1);
    };
    console.log(count);

    const handleClick = (e) => {
        e.preventDefault();
        const productSelected = {
            id: parseInt(reviewById[0].id_products),
            image: reviewById[0].image,
            name: reviewById[0].name,
            price: reviewById[0].price,
            priceTotal: reviewById[0].price * count,
            count,
        };
        dispatch(actionsProduct.addProductCart(productSelected));
        setCount(1);
    };


    return (
        <div>
            <div>
                <NavBar />
            </div>
            <div className={style.globalContainerOrder}>
                {reviewById.length !== 0 ?

                    <div className={style.container} key={reviewById[0].id_review}>
                        <div className={style.containerImg}>
                            <img className={style.img} src={reviewById[0].image} alt={reviewById[0].name} />
                        </div>
                        <div className={style.containerName}>
                            <h2 className={style.nameCantidada}>{reviewById[0].name}</h2>
                        </div>
                        {/* <div className={style.containerPrice}>
                                <h2 className={style.price}>$ {reviewById[0].price}</h2>
                            </div> */}
                        <div>
                            <h2 className={style.price}><Rating initialValue={reviewById[0].stars} /></h2>
                        </div>
                        <div>
                            <h2 className={style.comment}>Comment: {reviewById[0].comment}</h2>
                        </div>
                        <h3>Cantidad</h3>
                        <br />
                        <div className={style.counter}>
                            <button disabled={count <= 1} className={s.btn} onClick={resta}>
                                -
                            </button>
                            <span>{count}</span>
                            <button className={s.btn} onClick={suma}>
                                +
                            </button>
                        </div>
                        <br />
                        <br />
                        <div className={style.conteiner_buttons}>
                            <button className={style.btn1} onClick={handleClick}>
                                Add to cart
                            </button>
                        </div>
                    </div>
                    : <h1>loading</h1>}
                <br />

            </div>
        </div>
    )
}

export default ReviewDetail