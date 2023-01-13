import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavBar, Mensaje } from ".";
import { deleteProduct } from "../redux/product/actions";
import s from "../styles/Cart.module.css";
import st from "../styles/ItemCount.module.css";
import { useNavigate } from "react-router-dom";
import * as orderActions from "../redux/order/actions";
import { useAuth0 } from "@auth0/auth0-react";
import * as actions from "../redux/product/actions";

export const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  var aux = 0;
  const state = useSelector((state) => state.profileReducer);
  const site = localStorage.getItem("site");
  const { productsCart } = useSelector((state) => state.productsList);
  const [activeButton, setAvtiveButton] = useState(true);
  const [total, setTotal] = useState(0);
  const [product, setProduct] = useState(productsCart);
  const [mensaje, setMensaje] = useState("");
  const [tipoMensaje, setTipoMensaje] = useState("success");
  const [mensajeButton, setMensajeBoton] = useState("Realizar pedido");
  const profile = JSON.parse(localStorage.getItem("profile"));
  const [order, setOrder] = useState({
    id_mesa: "",
    id_profile: "",
    total: "",
    products: "",
  });
  useEffect(()=>{
    if(site === null){
      setMensajeBoton("Escanear Mesa")
    }
    
  },[])
  useEffect(() => {
    if (profile != null) {
      setOrder({
        id_mesa: parseInt(localStorage.getItem("site")),
        id_profile: JSON.parse(localStorage.getItem("profile")).id_profile,
        total: total,
        products: product,
      });
    }
  }, []);

  const [count, setCount] = useState(
    JSON.parse(localStorage.getItem("contador")) ?? []
  );
  const [tempTotal, setTemTotal] = useState(0);

  const formatoPesosMxn = (precio) => {
    return precio
      .toLocaleString("en", {
        style: "currency",
        currency: "MXN",
      })
      .slice(2, -3);
  };

  useEffect(() => {
    const productsLS = JSON.parse(localStorage.getItem("product")) ?? [];
    if (productsLS.length > 0 && productsCart.length === 0) {
      dispatch(actions.addProductCart(productsLS));
    }
  }, []);

  useEffect(() => {
    if (product) {
      localStorage.setItem("product", JSON.stringify(product));
    }
  }, [product]);

  useEffect(() => {
    setProduct(productsCart);
  }, [productsCart]);

  useEffect(() => {
    actualizarTotal();
    setOrder({ ...order, products: productsCart, total: total });
  }, [product, total]);

  useEffect(() => {
    setTemTotal(JSON.parse(localStorage.getItem("tempTotal")) ?? []);
  }, []);

  useEffect(() => {
    localStorage.setItem("tempTotal", JSON.stringify(tempTotal));
  }, [tempTotal]);

  const resta = (e) => {
    console.log(e.target.value);
    const piMenos = product.findIndex((p) => p.id == e.target.value);
    actualizarCart(e.target.value, piMenos, false);
  };

  const suma = (e) => {
    console.log(e.target.value);
    const piMas = product.findIndex((p) => p.id == e.target.value);
    actualizarCart(e.target.value, piMas, true);
    actualizarTotal();
  };

  const actualizarCart = (id, i, sumar) => {
    let actual = product[i];
    let newState = product;
    actual.count = sumar ? actual.count + 1 : actual.count - 1;
    actual.priceTotal = actual.price * actual.count;
    newState[i] = actual;
    setProduct([...newState]);
    setOrder({ ...order, products: productsCart, total: total });
    actualizarTotal();
  };

  const actualizarTotal = () => {
    aux = 0;
    if (product.length !== 0) {
      for (let i = 0; i < product.length; i++) {
        aux = aux + product[i].priceTotal;
      }
      return setTotal(aux);
    }
    return setTotal(aux);
  };

  const handleClick = (e) => {
   
    if (site === null) {
      navigate("/scannQR");
    return
    }
    setTipoMensaje("success");
    e.preventDefault();
    dispatch(orderActions.saveOrder(order));
    if (product.length === 0) {
      setTipoMensaje("error");
      setMensaje("No hay productos en el carrito");
      setCount(0);
    } else if (count === 0) {
      localStorage.setItem("tempTotal", JSON.stringify(total));
      setTemTotal(total);
      console.log(tempTotal);
      setMensaje("Se ha realizado su pedido");
    } else if (total === tempTotal && count !== 0) {
      setMensaje("Pedido ya realizado, agrege nuevos productos");
      setTipoMensaje("error");
      console.log(tempTotal, total, count);
    } else if (total !== tempTotal && count >= 0) {
      setMensaje("Pedido Actualizado");
      setTemTotal(total);
      console.log(tempTotal, total, count);
    } else if (total === 0 && tempTotal === 0) {
      setCount(0);
    } else {
      setMensaje("");
    }

    setTimeout(() => {
      setMensaje("");
    }, 2000);
    if (product.length !== 0 && site !== null) {
      
        setCount(parseInt(count + 1));
      
    }
  };

  useEffect(() => {
    localStorage.setItem("contador", JSON.stringify(parseInt(count)));
  }, [handleClick]);
  const handleDelete = (id) => {
    dispatch(deleteProduct(id));
  };

  const handleToPay = (e) => {
    e.preventDefault();
    dispatch(orderActions.createOrder(order));
    navigate("/pagepay");
    localStorage.setItem("contador", JSON.stringify(parseInt(0)));
    setCount(0);
  };

  return (
    <div className={s.globalContainerCart}>
      <NavBar />
      <div className={s.containerCartsButtons}>
        <div className={s.Carts}>
          {productsCart.length >= 1 &&
            product.map((p) => (
              <div key={p.id} className={s.container}>
                <div className={s.img}>
                  <img src={p.image} alt={p.name} />
                </div>
                <div className={s.nameCantidad}>
                  <h2>{p.name}</h2>
                  <div className={s.cantidad}>
                    <h3>Cantidad: </h3>
                    <div className={st.counter}>
                      <button
                        disabled={p.count <= 1}
                        className={st.btn}
                        onClick={resta}
                        value={p.id}
                      >
                        -
                      </button>
                      <span>{p.count}</span>
                      <button value={p.id} className={st.btn} onClick={suma}>
                        +
                      </button>
                    </div>
                  </div>
                </div>
                <div>
                  <div className={s.price}>
                    <span>${p.priceTotal}</span>
                    <p>{total}</p>
                  </div>
                  <button
                    className={s.btnDelete}
                    onClick={() => handleDelete(p.id)}
                  >
                    <span className="material-symbols-outlined">delete</span>
                  </button>
                </div>
                <br />
              </div>
            ))}
          <div className={s.total}>
            <div>
              <h3>Total</h3>
            </div>
            <div>
              <span>{formatoPesosMxn(total)}</span>
            </div>
          </div>
        </div>
        {mensaje && <Mensaje tipo={tipoMensaje}>{mensaje}</Mensaje>}

        <div className={s.conteiner_buttons}>
          <button
            className={site === null ? s.btn1Disabled : product.length === 0 ? s.btn1Disabled : s.btn1}
            onClick={handleClick}
          >
            {mensajeButton}
          </button>

          <button className={s.btn2} onClick={handleToPay}>
            Ir a pagar
          </button>
        </div>
      </div>
    </div>
  );
};
