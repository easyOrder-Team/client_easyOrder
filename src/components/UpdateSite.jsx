import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import { NavBar } from "../components";
import { useNavigate, useParams } from "react-router-dom";
import * as actions from "../redux/site/actions";

export const UpdateSite = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [data, setData] = useState({
    amount_persons: siteDetail[0].amount_persons,
    avalible: true,
    num_table: siteDetail[0].num_table,
  });

  useEffect(() => {
    dispatch(actions.getNumTable(id));
  }, []);
  const { siteDetail } = useSelector((state) => state.siteReducer);

  const handleChange = (e) => {
    console.log("data 1", data);

    if (e.target.name !== "avalible") {
      setData({
        ...data,
        [e.target.name]: Number(e.target.value),
      });
    } else {
      setData({
        ...data,
        [e.target.name]: Boolean(e.target.value === "true"),
      });
    }
    console.log("data 1", data);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(data);
    dispatch(actions.updateSite(id, data));
    setData({
      amount_persons: "",
      avalible: "",
      num_table: "",
    });
  };

  return (
    <div>
      {siteDetail.length !== 0 ? (
        <form onSubmit={(e) => handleSubmit(e)}>
          <div>
            <div>
              <div>
                <label>Numero de mesa:</label>
                <input
                  type="number"
                  name="num_table"
                  defaultValue={siteDetail[0].num_table}
                  onChange={handleChange}
                ></input>
              </div>

              <div>
                <label>Comensales:</label>
                <input
                  type="number"
                  name="amount_persons"
                  defaultValue={siteDetail[0].amount_persons}
                  onChange={handleChange}
                ></input>
              </div>

              <div>
                <div>
                  <label>Disponible:</label>
                  <select
                    name="avalible"
                    defaultValue={siteDetail[0].avalible}
                    onChange={handleChange}
                  >
                    <option value={"true"}>Si</option>
                    <option value={"false"}>No</option>
                  </select>
                </div>
              </div>
            </div>
            <div>
              <button>Actualizar Mesa</button>
            </div>
            <div>
              <button onClick={() => navigate(`/siteDetails/${id}`)}>
                Cancelar
              </button>
            </div>
          </div>
        </form>
      ) : (
        []
      )}
    </div>
  );
};
