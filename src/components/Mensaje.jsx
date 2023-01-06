import m from "../styles/Mensaje.module.css";

export const Mensaje = ({ children, tipo }) => {
  if (tipo) return <div className={m[tipo]}>{children}</div>;
};
