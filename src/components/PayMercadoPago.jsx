import React from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";

export const PasarelaMercadoPago= () => {
  const productsCart = useSelector((state) => state.productsCart.productsCart);
  useEffect(() => {
    
    if (productsCart) {
      fetch(`http://localhost:3000/api/v1/mercadoPago?products=${JSON.stringify(productsCart)}`)
        .then((response) => response.json())
        .then((response) => {
          const mp = new MercadoPago("TEST-9fe93067-1f36-4424-a5ff-fba804c5e0a4", {
            locale: "es-CO",
          });
          console.log(response)
          mp.checkout({
            preference: {
              id: response,
            },
            autoOpen: true,
          });
        });
    }
  }, [productsCart]);

  return <div className="cho-container"></div>;
};
