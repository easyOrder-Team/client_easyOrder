import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import * as actions from "../redux/site/actions";
import style from "../styles/Site.module.css";
import { NavBar, Mensaje } from ".";

export const SiteDetails = () => {
  const { id } = useParams();
  const navegate = useNavigate();
  const dispatch = useDispatch();
  const { siteDetail } = useSelector((state) => state.siteReducer);
  const [mensaje, setMensaje] = useState("");

  useEffect(() => {
    dispatch(actions.getNumTable(id));
  }, []);

  console.log(siteDetail);

  const handleEdit = (e) => {
    e.preventDefault();
    navegate(`/updateSite/${id}`);
  };

  const handleDelete = (e) => {
    e.preventDefault();
    dispatch(actions.deleteSite(e));

    setMensaje("Mesa eliminada correctamente");
    setTimeout(() => {
      setMensaje("");
      navegate("/sites");
    }, 1500);
  };

  return (
    <div>
      <NavBar />
      {siteDetail.length !== 0 ? (
        <div>
          <div className={style.container_Name}>
            <h1> Numero de mesa:</h1>
            <h2> {siteDetail[0].num_table}</h2>
          </div>
          <div>
            <div className={style.container_Name}>
              <h1> Comensales:</h1>
              <h2>{siteDetail[0].amount_persons}</h2>
            </div>
          </div>
          <div>
            <div className={style.container_Name}>
              <div>
                {siteDetail[0].avalible === true ? (
                  <h1>Disponible</h1>
                ) : (
                  <h1>Ocupada</h1>
                )}
              </div>
            </div>
          </div>
          <div>
            <button className={style.btn2} onClick={handleEdit}>
              Editar mesa
            </button>
            <button className={style.btn1} onClick={handleDelete}>
              Eliminar Mesa
            </button>
            {mensaje && <Mensaje tipo="success">{mensaje}</Mensaje>}
          </div>
        </div>
      ) : (
        []
      )}
    </div>
  );
};
