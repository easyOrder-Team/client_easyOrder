import React from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useAuth0 } from "@auth0/auth0-react";

export const PasarelaMercadoPago= () => {
  const productsCart = useSelector((state) => state.productsCart.productsCart);
  const { user } = useAuth0();

  useEffect(() => {
    
    if (productsCart) {
      localStorage.setItem('products', JSON.stringify(productsCart));
      fetch(`http://localhost:3000/api/v1/mercadoPago?products=${JSON.stringify(productsCart)}&email=${user.email}`)
        .then((response) => response.json())
        .then((response) => {
          const mp = new MercadoPago("TEST-9fe93067-1f36-4424-a5ff-fba804c5e0a4", {
            locale: "es-CO",
          });
          mp.checkout({
            preference: {
              id: response.id,
            },
            autoOpen: true,
          });
        });
    }
  }, [productsCart]);

  return <div className="cho-container"></div>;
};
