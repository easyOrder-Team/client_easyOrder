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
  const { siteDetail } = useSelector((state) => state.siteReducer);

  useEffect(() => {
    dispatch(actions.getNumTable(id));
  }, []);

  console.log("siteDetail", siteDetail);

  const [newData, setNewData] = useState({
    amount_persons: "",
    avalible: "",
    num_table: "",
  });
  let state;

  const available = (siteDetail) => {
    if (siteDetail.avalible === false) {
      state = false;
    }
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
                  type="text"
                  name="num_table"
                  defaultValue={siteDetail[0].num_table}
                  onChange={(e) => checkNumber(e)}
                ></input>
              </div>

              <div>
                <label>Comensales:</label>
                <input
                  type="number"
                  name="amount"
                  defaultValue={siteDetail[0].amount_persons}
                  onChange={(e) => checkAmount(e)}
                ></input>
              </div>

              <div>
                <div>
                  <label>Disponible:</label>
                  <input
                    type="checkbox"
                    name="Disponible"
                    defaultChecked={siteDetail[0].amount_persons}
                    onChange={(e) => checkState(e)}
                  ></input>
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
