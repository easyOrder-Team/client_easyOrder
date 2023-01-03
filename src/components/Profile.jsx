import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useSelector, useDispatch } from "react-redux";
import * as profileReducer from "../redux/profile/profileReducer";
import profileStyle from "../styles/Profile.module.css";
import { NavBar } from "./NavBar";
import { useState } from "react";
import * as actionsProfile from "../redux/profile/actions";
import { useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import OrderHistory from "./OrderHistory";
import * as actionsOrders from '../redux/order/actions'
import Reservas from "./ReservationHistory";
import * as actionsReservation from '../redux/reservation/actions';


export const Profile = () => {
  const {profile} = useSelector((state) => state.profileReducer);
  const { user, isAuthenticated, isLoading } = useAuth0();
  const [ventana, setVentana] = useState("pedidos");
  const dispatch = useDispatch();
  const navigate =  useNavigate()


  
  useEffect(() => {
    if (isAuthenticated) {
      dispatch(actionsProfile.getProfileById(user.email));
      dispatch(actionsOrders.getOrdersIdfUser(user.email));
      dispatch(actionsReservation.getReservationById(user.email));

    }
  }, [user]);

  const changePassword = () => {
    let options = {
      method: "POST",
      url: `https://${import.meta.env.VITE_AUTH0_DOMAIN}/dbconnections/change_password`,
      headers: { "content-type": "application/json" },
      data: {
        client_id: import.meta.env.VITE_AUTH0_CLIENT_I,
        email: user.email,
        connection: "Username-Password-Authentication",
      },
    };

    axios
      .request(options)
      .then(function (response) {
        Swal.fire({
          title: "OK!",
          text: `El link se ha enviado al correo ${user.email}`,
          icon: "success",
        }).then((response) => {
          if (response.isConfirmed) {
            navigate("/home");
          }
        });
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  if (isLoading) {
    return (
      <div className="containerSpin">
        <div className="spinner"></div>
      </div>
    );
  } else {
    if (isAuthenticated && user.sub.includes("auth0")) {
      return (
        isAuthenticated && (
          <div className={profileStyle.globalContainer}>
            <div>
              <NavBar />
            </div>
            <div>
              <img
                className={profileStyle.profileImage}
                src={profile.picture}
                alt={user.name}
              />
              <p
                className={profileStyle.userName}
              >{`${profile.name} ${profile.lastname}`}</p>
            </div>
            <div className={profileStyle.containerOptions}>
              <div className={profileStyle.userOptions}>
                <button
                  className={profileStyle.buttons}
                  name="pedidos"
                  onClick={() => setVentana("pedidos")}
                >
                  Pedidos
                </button>
                <button
                  className={profileStyle.buttons}
                  name="reservas"
                  onClick={() => setVentana("reservas")}
                >
                  Reservas
                </button>
                <button
                  className={profileStyle.buttons}
                  name="reseñas"
                  onClick={() => setVentana("reseñas")}
                >
                  Reseñas
                </button>
                <button
                  className={profileStyle.buttons}
                  name="contraseña"
                  onClick={() => setVentana("contraseña")}
                >
                  Contraseña
                </button>
              </div>

              {ventana === "reservas" ? (
                <div className={profileStyle.containerOptionsDiv}>
                  <div><Reservas/></div>
                </div>
              ) : ventana === "reseñas" ? (
                <div className={profileStyle.containerOptionsDiv}>
                  <h1>Reseñas</h1>
                </div>
              ) : ventana === "contraseña" ? (
                <div className={profileStyle.containerOptionsDiv}>
                  <div className={profileStyle.containerContraseña}>
                    <h1 className={profileStyle.h1}>Cambiar contraseña</h1>
                    <p className={profileStyle.p}>
                      Te enviaremos un link al correo electronico donde podras
                      entrar a realizar el cambio de contraseña
                    </p>
                    <button onClick={changePassword} className={profileStyle.buttonLink}>
                      Enviar Link
                    </button>
                  </div>
                </div>
              ) : (
                <div className={profileStyle.containerOptionsDiv}>
                  <div>{<OrderHistory/>}</div>
                </div>
              )}
            </div>
          </div>
        )
      );
    } else {
      return (
        isAuthenticated && (
          <div className={profileStyle.globalContainer}>
            <div>
              <NavBar />
            </div>
            <div>
              <img
                className={profileStyle.profileImage}
                src={profile.picture}
                alt={user.name}
              />
              <p
                className={profileStyle.userName}
              >{`${profile.name} ${profile.lastname}`}</p>
            </div>
            <div className={profileStyle.containerOptions}>
              <div className={profileStyle.userOptions}>
              <button
                  className={profileStyle.buttons}
                  name="pedidos"
                  onClick={() => setVentana("pedidos")}
                >
                  Pedidos
                </button>
                <button
                  className={profileStyle.buttons}
                  name="reservas"
                  onClick={() => setVentana("reservas")}
                >
                  Reservas
                </button>
                <button
                  className={profileStyle.buttons}
                  name="reseñas"
                  onClick={() => setVentana("reseñas")}
                >
                  Reseñas
                </button>
              </div>
              {ventana === "reservas" ? (
                <div className={profileStyle.containerOptionsDiv}>
                  <div><Reservas/></div>
                </div>
              ) : ventana === "reseñas" ? (
                <div className={profileStyle.containerOptionsDiv}>
                  <h1>Reseñas</h1>
                </div>
              ) : (
                <div className={profileStyle.containerOptionsDiv}>
                  <div>{<OrderHistory/>}</div>
                </div>
              )}
            </div>
          </div>
        )
      );
    }
  }
};
