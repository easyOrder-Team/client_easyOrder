import React from "react";
import login from "../styles/Login.module.css";
import { Link } from "react-router-dom";
import auth0 from '../images/auth0.png'
import { useAuth0 } from "@auth0/auth0-react";
export const Login = () => {

  const {loginWithRedirect} = useAuth0()
  const handleSubmit = () => {
    
  }

  return (
    <div className={login.globalContainer}>
      <div className={login.logo}>
        <h5>Easy</h5>
        <h5>Order</h5>
      </div>
      <div className={login.loginContainer}>
        <h1>Iniciar sesíon</h1>
        <input className={login.inputLogin} type="text" />
        <div className={login.containerPasword}>
          <input className={login.inputPasswor} type="password" />
          <button className={`material-icons ${login.visibilityButton}`}>
            visibility
          </button>
        </div>
        <button className={login.siguienteButton}>SIGUIENTE</button>
        <a href="">¿Olvido su contraseña?</a>
        <h6>ó</h6>
        <div className={login.auth0Container}>
          <img className={login.auth0img} src={auth0} alt="" />
          <button className={login.auth0Button} onClick ={() => loginWithRedirect()}>CONTINUAR CON AUTH0</button>
        </div>
        <Link className={login.registrate} to="/registro">
          Registrarte
        </Link>
      </div>
    </div>
  );
};
