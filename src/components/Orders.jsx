import React from "react";
import s from "../styles/NavBar.module.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import h from "../styles/Admin.module.css";
import { useEffect } from "react";
import * as orderActions from "../redux/order/actions";
import { CardOrder } from ".";
import { NavBarAdmin } from ".";
export const Orders = () => {
  const [modalVisivility, setmodalVisivility] = useState("modalMenu");
  const { logout, isAuthenticated, loginWithRedirect, isLoading } = useAuth0();
  const profile = useSelector((state) => state.profileReducer.profile);
  const navigate = useNavigate();
  let location = useLocation().pathname;

  useEffect(() => {
    localStorage.setItem("profile", JSON.stringify(profile));
  });
  /* orders */
  const { activeOrders, changes } = useSelector((state) => state.orderReducer);
  const dispatch = useDispatch();

  useEffect(() => {
      dispatch(orderActions.getActiveOrders());
  }, []);

  if (isLoading) {
    <div className="containerSpin">
      <div className="spinner"></div>
    </div>;
  } else {
    if (isAuthenticated) {
      if (!profile.superadmin) {
        navigate("/home");
      } else if (
        location !== "/createProduct" &&
        !location.includes("/cards") &&
        location !== "/profile" &&
        location !== "/scannQR" &&
        location !== "/selectPayMethod"
      ) {
        return (
          <div>
           <NavBarAdmin/>
            <div>
              <span className={h.imageProfile}>
                <img src={profile.picture} alt="" />
              </span>
              <h4>Admin</h4>
              <h2>{`${profile.name} ${profile.lastname}`}</h2>
            </div>

            {/* ---- Ordenes activas ---- */}
            <div className={h.homecontainer}>
              {activeOrders.length !== 0 ? (
                activeOrders.map((order) => (
                  <Link to={`/process/${order.id}`} key={order.id}>
                    <CardOrder idMesa={order.id_mesa} id_mesa={order.id_mesa} />
                  </Link>
                ))
              ) : (
                <h2>No hay ordenes activas</h2>
              )}
            </div>
          </div>
        );
      } else {
        return (
          <div>
            <div
              className={
                modalVisivility === "modalMenu"
                  ? s.modalMenu
                  : s.modalMenuVisible
              }
            >
              <a
                id={s.closeModal}
                className="material-symbols-outlined"
                onClick={() => setmodalVisivility("modalMenu")}
              >
                close
              </a>

              <div className={s.modalDiv}>
                <span className={`material-symbols-outlined ${s.modalSpan}`}>
                  manage_accounts
                </span>
                <button
                  className={s.modalButton}
                  onClick={() =>
                    isAuthenticated ? navigate("/profile") : loginWithRedirect()
                  }
                >
                  Perfil
                </button>
              </div>

              <div className={s.modalDiv} onClick={() => navigate("/home")}>
                <span className={`material-symbols-outlined ${s.modalSpan}`}>
                  home
                </span>
                <button className={s.modalButton}>Inicio</button>
              </div>
              <div className={s.modalDiv}>
                <span className={`material-symbols-outlined ${s.modalSpan}`}>
                  {isAuthenticated ? "logout" : "login"}{" "}
                </span>
                <button
                  className={s.modalButton}
                  onClick={() =>
                    isAuthenticated ? logout() : loginWithRedirect()
                  }
                >
                  {isAuthenticated ? "Salir" : "Entrar"}
                </button>
              </div>
            </div>
            <div className={s.navbar__container}>
              <div className={s.navbar__content}>
                <div className={s.logo}>
                  <Link to={"/home"}>
                    <img
                      src="https://res.cloudinary.com/dypjcpbis/image/upload/v1670886694/EasyOrder_BD/Recurso_1_l9yefi.svg"
                      alt="logo_EasyOrder.svg"
                    />
                  </Link>
                </div>
                <div className={s.navbar__allicons}>
                  <span className="material-symbols-outlined">
                    notifications
                  </span>
                  <Link to={"/cart"}>
                    <span className="material-symbols-outlined">
                      shopping_cart
                    </span>
                  </Link>
                  <span
                    onClick={() =>
                      isAuthenticated
                        ? navigate("/profile")
                        : loginWithRedirect()
                    }
                    className="material-symbols-outlined"
                  >
                    account_circle
                  </span>

                  <a
                    id={s.menuButton}
                    className="material-symbols-outlined"
                    onClick={() => setmodalVisivility("modalMenuVisible")}
                  >
                    menu
                  </a>
                </div>
              </div>
            </div>
          </div>
        );
      }
    }
  }
};
