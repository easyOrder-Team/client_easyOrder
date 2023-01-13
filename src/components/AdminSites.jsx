import React, { useState, useEffect } from "react";
import * as actionsSite from "../redux/site/actions";
import { useDispatch, useSelector } from "react-redux";
import { Site, NavBar } from ".";
import { all } from "axios";
import style from "../styles/Site.module.css";
import { Navigate, useNavigate } from "react-router-dom";

export const AdminSites = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { allSites } = useSelector((state) => state.siteReducer);

  useEffect(() => {
    dispatch(actionsSite.getSites());
  }, []);

  const handleCreate = () => {
    navigate("/createSite");
  };

  return (
    <div>
      <div>
        <NavBar />
      </div>
      <div className={style.conteiner_Name}> Administrador de mesas </div>
      <button className={style.btn1} onClick={handleCreate}>
        {" "}
        Nueva mesa +{" "}
      </button>
      {allSites.length !== 0 ? (
        allSites.map((s) => {
          return <Site id_site={s.id_site} num_table={s.num_table} />;
        })
      ) : (
        <div>No existen mesas disponibles</div>
      )}
    </div>
  );
};
