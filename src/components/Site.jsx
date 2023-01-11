import React from "react";
import { Link } from "react-router-dom";
import style from "../styles/Site.module.css";

export const Site = ({ id_site, avalible, num_table }) => {
  return (
    <div className={style.site}>
      <Link to={`/siteDetails/${id_site}`}>
        <div>{num_table}</div>
      </Link>
    </div>
  );
};
