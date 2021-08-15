import "./styles.css";
import React, { useContext, useEffect } from "react";
import useAPI from "../../useAPI";
import { PerfilContext } from "../../Contexts/perfilContext";

export default function StoreNameComponent(props) {
  const { perfil, setPerfil } = useContext(PerfilContext);
  const { getPerfilRequest } = useAPI();

  // useEffect(() => getPerfilRequest(setPerfil), [perfil]);
  useEffect(() => getPerfilRequest(setPerfil), []);

  return (
    <>
      <h3 className="nome_loja">{perfil.nome_loja}</h3>
      {props.children}
    </>
  );
}
