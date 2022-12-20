import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styleMethod from "../styles/SelectMethod.module.css";
import { NavBar } from "./index";

export const SelectPay = () => {
  const navigate = useNavigate();

  const [select, setSelect] = useState("");

  let handleInputChange = (e) => {
    setSelect(e.target.value);
  };
  function submit(e) {
    console.log(e.value)
    e.preventDefault();
  }
  useEffect(() => {
    if (window.location.search) {
      if (window.location.search.includes("mercadoPago")) {
        navigate("/payMercadoPago");
      } else {
        navigate("/pagepay");
      }
    }
  }, [window.location.search]);
  console.log(window.location.search);
  return (
    <div className={styleMethod.globalContainer}>
      <NavBar />
      <h1>Metodo de pago</h1>
      <div className={styleMethod.globalContainerMethod}>
        <form className={styleMethod.ContainerMethod}>
          <label className={styleMethod.containerLogos}>
            <input
              id="Mercado_pago"
              type="radio"
              name="seleccion"
              value="mercadoPago"
            />
            <img
              className={styleMethod.logos}
              src="https://logodownload.org/wp-content/uploads/2019/06/mercado-pago-logo-4.png"
              alt=""
            />
          </label>
          <label className={styleMethod.containerLogos}>
            <input id="PayPal" type="radio" name="seleccion" value="paypal" />
            <img
              className={styleMethod.logos}
              src="https://www.paypalobjects.com/digitalassets/c/website/logo/full-text/pp_fc_hl.svg"
              alt=""
            />
          </label>
          <input type="submit"  onClick={(e)=>submit(e)}/>
        </form>
      </div>
    </div>
  );
};
