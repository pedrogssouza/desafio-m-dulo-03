import { Button, makeStyles, TextField } from "@material-ui/core";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import useAPI from "../../useAPI";

const useStyles = makeStyles({
  button: {
    backgroundColor: "#007DFF",
    color: "#FFFFFF",
  },
});

export default function PerfilPage() {
  const classes = useStyles();
  const history = useHistory();
  const [perfil, setPerfil] = useState({});
  const { getPerfilRequest } = useAPI();

  useEffect(() => getPerfilRequest(setPerfil), []);
  return (
    <>
      <h3 className="subtitulo">Perfil</h3>
      <div className="form_perfil">
        <TextField
          disabled
          id="nome"
          label="Seu nome"
          defaultValue={perfil.nome}
        />
        <TextField
          disabled
          id="nome_loja"
          label="Nome da loja"
          defaultValue={perfil.nome_loja}
        />
        <TextField
          disabled
          id="email"
          label="Email"
          defaultValue={perfil.email}
        />
      </div>
      <hr className="linha"></hr>
      <Button
        className={classes.button}
        onClick={() => history.push("perfil/editar")}
      >
        EDITAR PERFIL
      </Button>
    </>
  );
}
