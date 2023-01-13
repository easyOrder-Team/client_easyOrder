import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import { NavBar } from "../components";
import { Link, useNavigate } from "react-router-dom";
import * as actions from "../redux/site/actions";
import { Mensaje } from "../components";

export const CreateSite = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { allSites } = useSelector((state) => state.siteReducer);
  const [mensaje, setMensaje] = useState("");
  let exist = false;

  const [data, setData] = useState({
    amount_persons: "",
    avalible: "",
    num_table: "",
  });

  useEffect(() => {
    dispatch(actions.getSites());
  }, []);

  const existentSite = (allSites, data) => {
    allSites.map((s) => {
      if (s.num_table === Number(data.num_table)) {
        exist = true;
      }
      return;
    });
  };

  const handleInputChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    existentSite(allSites, data);
    if (exist === true) {
      Swal.fire({
        title: "Error!",
        text: `Ya existe una mesa con el numero ${data.num_table}`,
        icon: "error",
      });
    } else {
      if (!mensaje) {
        dispatch(actions.createSite(data));
        Swal.fire({
          title: "OK!",
          text: "El producto se ha creado con exito",
          icon: "success",
        });
      }
    }
  };

  return (
    <div>
      <div>
        <NavBar />
      </div>
      <div>
        <form onSubmit={(e) => handleSubmit(e)}>
          <Link to="/sites">
            <button>Back</button>
          </Link>
          <div>
            <div>
              <div>
                <label>Numero de mesa:</label>
                <input
                  type="number"
                  name="num_table"
                  value={data.num_table}
                  onChange={(e) => handleInputChange(e)}
                ></input>
              </div>
              <div>
                <div>
                  <label>Comensales:</label>
                  <input
                    type="number"
                    name="amount_persons"
                    value={data.amount_persons}
                    onChange={(e) => handleInputChange(e)}
                  ></input>
                </div>
              </div>
            </div>
            <div>
              <button type="submit">Crear Mesa</button>
            </div>
            <div>
              <button onClick={() => navigate("/sites")}>Cancelar</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
