import * as types from "../types";
import axios from "axios";

export const getPaymentInfo = (id_payment) => {
    return (dispatch) =>
      axios
        .get(`https://api.mercadopago.com/v1/payments/${id_payment}`,{
            headers:{
                "Authorization":"Bearer TEST-8502805663003777-121712-6d62eb213a0a33d9012c3ae6aac0803d-1260039185"
            }
        })
        .then((response) => {
          dispatch({
            type: types.GET_INFO_PAYMENT,
            payload: response,
          });
        })
        .catch((error) => console.log(error));
  };