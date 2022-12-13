import React from "react";
import { Link } from "react-router-dom";
/* import s from "./Landing.module.css"; */
import "../styles/Landing.css";

import { useAuth0 } from "@auth0/auth0-react";

/* export function Landing() {
  return (
    <Fragment>
      <h1>Landing</h1>
      <h2>Hola</h2>
    </Fragment>
  );
} */

export function Landing() {
  const { loginWithRedirect } = useAuth0();

  return (
    <div className="root">
      <div className="carrousel">
        <div className="item" id="item1">
          <div className="img" id="img1">
            1
          </div>
          <div className="arrows">
            <a href="#item3">
              <span className="material-symbols-outlined">arrow_back_ios</span>
            </a>
            <a href="#item2">
              <span className="material-symbols-outlined">
                arrow_forward_ios
              </span>
            </a>
          </div>
        </div>

        <div className="item" id="item2">
          <div className="img" id="img2">
            2
          </div>
          <div className="arrows">
            <a href="#item1">
              <span className="material-symbols-outlined">arrow_back_ios</span>
            </a>
            <a href="#item3">
              <span className="material-symbols-outlined">
                arrow_forward_ios
              </span>
            </a>
          </div>
        </div>

        <div className="item" id="item3">
          <div className="img" id="img3">
            3
          </div>
          <div className="arrows">
            <a href="#item2">
              <span className="material-symbols-outlined">arrow_back_ios</span>
            </a>
            <a href="#item1">
              <span className="material-symbols-outlined">
                arrow_forward_ios
              </span>
            </a>
          </div>
        </div>
      </div>

      <div className="points">
        <a href="#item1">
          <button className="point" state="active"></button>
        </a>
        <a href="#item2">
          <button className="point"></button>
        </a>
        <a href="#item3">
          <button className="point"></button>
        </a>
      </div>

      <div className="container">
        <div>
          <h1 className="title">¡BIENVENIDOS!</h1>
          <h3 className="text">
            Aquí podrás hacer tus pedidos de una manera rápida y fácil.
          </h3>
        </div>
        <div className="buttons">
          <Link to="/home">
            <button className="button1">SOY VISITANTE</button>
          </Link>
          <button onClick={() => loginWithRedirect()} className="button2">
            SOY CLIENTE
          </button>
        </div>
      </div>
    </div>
  );
}
