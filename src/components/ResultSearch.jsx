import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Card, NavBar, Details, Mensaje } from ".";
import { Link } from "react-router-dom";
import { useEffect } from "react";

export const ResultSearch = () => {
  const { products } = useSelector((state) => state.productsList);
  return (
    <div>
      <div>
        <NavBar />
      </div>
      {products.length !== 0 ? (
        !products[0].hasOwnProperty("message") ? (
          products.map((p) => (
            <Link key={p.id} to={`/details/${p.id}`}>
              <Card
                image={p.image}
                name={p.name}
                description={p.description}
                price={p.price}
              />
            </Link>
          ))
        ) : (
          <Mensaje tipo="error">Producto no encontrado</Mensaje>
        )
      ) : (
        <h1>Loading</h1>
      )}
    </div>
  );
};
