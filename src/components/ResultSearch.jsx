import React from "react";
import { useSelector } from "react-redux";
import { Card, NavBar } from ".";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";

export const ResultSearch = () => {
  const { products } = useSelector((state) => state.productReducer);

  //my code
  // const [localProducts, setLocalProducts] = useState([]);

  // useEffect(() => {
  //   setLocalProducts(products);
  // }, []);

  // console.log("localP", localProducts);
  return (
    <div>
      <div>
        <NavBar />
      </div>
      {products.length &&
        products.map((p) => (
          <Link key={p.id} to={`/details/${p.id}`}>
            <Card
              image={p.image}
              name={p.name}
              description={p.description}
              price={p.price}
            />
          </Link>
        ))}
    </div>
  );
};
