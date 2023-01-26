import { useNavigate } from "react-router";
import s from "../styles/NavBar.module.css";
import { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";
export const NavBarAdmin = () => {
  const navigate = useNavigate();
  const { logout, isAuthenticated, loginWithRedirect, isLoading } = useAuth0();
  const [modalVisivility, setmodalVisivility] = useState("modalMenu");
  return (
    <div>
      <div
        className={
          modalVisivility === "modalMenu" ? s.modalMenu : s.modalMenuVisible
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
          <span
            className={`material-symbols-outlined ${s.modalSpan}`}
            onClick={() => navigate("/home")}
          >
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
            onClick={() => (isAuthenticated ? logout({returnTo:import.meta.env.VITE_RUTA}) : loginWithRedirect())}
          >
            {isAuthenticated ? "Salir" : "Entrar"}
          </button>
        </div>
      </div>
      <div className={s.navbar__container}>
        <div className={s.navbar__content}>
          <div className={s.lightLogo}>
            <Link to={"/home"}>
              <img
                src="https://res.cloudinary.com/dbvh03usi/image/upload/v1673154193/logoLight.svg"
                alt="logo_EasyOrder.svg"
              />
            </Link>
          </div>
          <div className={s.darkLogo}>
            <Link to={"/home"}>
              <img
                src="https://res.cloudinary.com/dbvh03usi/image/upload/v1673154201/logoDark.svg"
                alt="logo_EasyOrder.svg"
              />
            </Link>
          </div>
          <div className={s.navbar__allicons__admin}>
           
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
};
