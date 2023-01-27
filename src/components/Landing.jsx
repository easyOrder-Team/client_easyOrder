import React from "react";
import { json, Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
/* import s from "./Landing.module.css"; */
import "../styles/Landing.css";
import * as actionsProfile from "../redux/profile/actions";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";

export function Landing() {
  // const [table, setTable] = useState('')
  const dispatch = useDispatch();
  const { site } = useParams();
  const { loginWithRedirect, isAuthenticated, isLoading } = useAuth0();
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.clear();
  });
  // useEffect(() => {
  //   const getLS = () => {
  //     const tableLS = JSON.parse(localStorage.getItem('site')) ?? '';
  //     setTable(tableLS)
  //   }
  //   getLS();
  // },[])

  // useEffect(() => {
  //   localStorage.setItem("site", JSON.stringify(parseInt(site)));
  //   let numMesa = localStorage.getItem("site");
  //   // console.log(numMesa)
  // }, []);

  // useEffect(() => {
  //   dispatch(actionsProfile.getSite(site));
  // }, [site]);

  if (isLoading) {
    return (
      <div className="containerSpin">
        <div className="spinner"></div>
      </div>
    );
  } else {
    if (isAuthenticated) {
      navigate("/home");
    } else {
      localStorage.removeItem("site");
      return (
        <div className="root">
          <div className="carousel">
            <div className="item" id="item1">
              <div className="img" id="img1"></div>
              <div className="arrows">
                <a href="#item3">
                  <span className="material-symbols-outlined" id="arrow">
                    arrow_back_ios
                  </span>
                </a>
                <a href="#item2">
                  <span className="material-symbols-outlined" id="arrow">
                    arrow_forward_ios
                  </span>
                </a>
              </div>
            </div>

            <div className="item" id="item2">
              <div className="img" id="img2"></div>
              <div className="arrows">
                <a href="#item1">
                  <span className="material-symbols-outlined" id="arrow">
                  arrow_back_ios
                  </span>
                </a>
                <a href="#item3">
                  <span className="material-symbols-outlined" id="arrow">
                  arrow_forward_ios
                  </span>
                </a>
              </div>
            </div>

            <div className="item" id="item3">
              <div className="img" id="img3"></div>
              <div className="arrows">
                <a href="#item2">
                  <span className="material-symbols-outlined" id="arrow">
                    arrow_back_ios
                  </span>
                </a>
                <a href="#item1">
                  <span className="material-symbols-outlined" id="arrow">
                    arrow_forward_ios
                  </span>
                </a>
              </div>
            </div>
          </div>
{/*           <div className="points">
            <a href="#item1">
              <button className="point" state="active"></button>
            </a>
            <a href="#item2">
              <button className="point"></button>
            </a>
            <a href="#item3">
              <button className="point"></button>
            </a>
          </div> */}

          <div className="container">
            <div>
              <img
                className="logo"
                src="https://res.cloudinary.com/dbvh03usi/image/upload/v1673154193/logoLight.svg"
                alt="logo_EasyOrder.svg"
              />
              <h1 className="title">¡BIENVENIDOS!</h1>
              <h3 className="text">
                Aquí podrás hacer tus pedidos de una manera <b>rápida y fácil</b>.
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
  }
}
