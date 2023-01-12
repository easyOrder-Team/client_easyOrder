import React from "react";
import { useEffect, useState } from "react";
import QrReader from "react-qr-scanner";
import { useNavigate } from "react-router-dom";
import scann from "../styles/QR_scanner.module.css";
import { NavBar } from "./index";
export const Scanner = () => {
  const navigate = useNavigate()
  const [result, setResult] = useState({
    delay: 100,
    result: "Sin resultado",
  });

  function handleScan(datos) {
    if (datos) {
      setResult({
        result: datos.text,
      });
    }
  }
  function handleError(err) {
    console.error(err);
  }

  if (result.result === "Sin resultado") {
    return (
      <div className={scann.globalContainer}>
        <div>
          <NavBar />
          <h1 className={scann.titulo}>Escanea Tu Mesa</h1>
        </div>
        <div className={scann.container}>
          <QrReader
            delay={result.delay}
            className={scann.qr}
            onError={handleError}
            onScan={handleScan}
            facingMode='rear'
          />
          <p>
            Por favor escannea el codigo QR que esta sobre la mesa, de esta
            manera sabremos en que mesa estas ubicado para llevar tu orden lo
            mas rapido posible
          </p>
        </div>
      </div>
    );
  } else {
    localStorage.setItem("site", JSON.stringify(parseInt(result.result)));
    navigate("/cart")
  }
};
