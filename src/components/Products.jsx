import s from "../styles/NavBar.module.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { SearchBarAdmin } from "./SearchBarAdmin";
import style from "../styles/Details.module.css";
import c from "../styles/Card.module.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as actionProducts from "../redux/product/actions";
import { Card } from ".";
import h from "../styles/Admin.module.css";
import { NavBarAdmin } from ".";

export const Products = () => {
  const [modalVisivility, setmodalVisivility] = useState("modalMenu");
  const { logout, isAuthenticated, loginWithRedirect } = useAuth0();
  const { products } = useSelector((state) => state.productsList);
  const { changes } = useSelector((state) => state.productsList);
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.profileReducer.profile);

  useEffect(() => {
    dispatch(actionProducts.getProducts());
  }, []);

  useEffect(() => {
    dispatch(actionProducts.getProducts());
  }, [changes]);

  console.log(products);

  const navigate = useNavigate();
  let location = useLocation().pathname;
  if (
    location !== "/createProduct" &&
    !location.includes("/cards") &&
    location !== "/profile" &&
    location !== "/scannQR" &&
    location !== "/selectPayMethod"
  ) {
    return (
      <div>
        <NavBarAdmin />
        <div>
          <span className={h.imageProfile}>
            <img src={profile.picture} alt="" />
          </span>
          <h4>Admin</h4>
          <h2>{`${profile.name} ${profile.lastname}`}</h2>
        </div>
        <div className={style.container_search}>
          <SearchBarAdmin />
        </div>
        <div>
          <div className={style.conteiner_buttons}>
            <button
              className={style.btn1}
              id={style.btnCreate}
              onClick={() => navigate("/CreateProduct")}
            >
              Crear Producto
            </button>
          </div>
        </div>
        <div className={c.card_container}>
          {products.map((p) => (
            <div key={p.id}>
              <Card
                image={p.image}
                name={p.name}
                description={p.description}
                price={p.price}
                id={p.id}
                edit={
                  <span
                    className={`material-symbols-outlined ${s.modalSpan} ${c.icon_edit}`}
                  >
                    edit
                  </span>
                }
                borrar={
                  <span
                    className={`material-symbols-outlined ${s.modalSpan} ${c.icon_delete}`}
                  >
                    delete
                  </span>
                }
              />
            </div>
          ))}
        </div>
      </div>
    );
  } else {
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
              onClick={() => (isAuthenticated ? logout() : loginWithRedirect())}
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
              <span className="material-symbols-outlined">notifications</span>
              <Link to={"/cart"}>
                <span className="material-symbols-outlined">shopping_cart</span>
              </Link>
              <span
                onClick={() =>
                  isAuthenticated ? navigate("/profile") : loginWithRedirect()
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
};
