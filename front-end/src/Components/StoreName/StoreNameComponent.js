import "./styles.css";
import React, { useEffect, useState } from "react";
import useAPI from "../../useAPI";

export default function StoreNameComponent(props) {
  const [perfil, setPerfil] = useState({});
  const { getPerfilRequest } = useAPI();

  useEffect(() => getPerfilRequest(setPerfil), []);

  return (
    <>
      <h3 className="nome_loja">{perfil.nome_loja}</h3>
      {props.children}
    </>
  );
}
