import { useEffect, useState } from "react";
import useAPI from "../../useAPI";

export default function PerfilPage() {
  const [perfil, setPerfil] = useState({});
  const { getPerfilRequest } = useAPI();

  useEffect(() => getPerfilRequest(setPerfil), []);
  return (
    <div>
      {perfil.nome}
      {perfil.email}
    </div>
  );
}
