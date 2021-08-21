import { Button, makeStyles, TextField } from "@material-ui/core";
import { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import ErrorComponent from "../../Components/ErrorComponent";
import LoadingComponent from "../../Components/Loading";
import { PerfilContext } from "../../Contexts/perfilContext";
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
  const {
    perfil: { nome, nome_loja, email },
  } = useContext(PerfilContext);
  const { getPerfilRequest } = useAPI();

  useEffect(() => {
    async function getPerfil() {
      await getPerfilRequest();
    }
    getPerfil();
  }, []);

  return (
    <>
      <h3 className="subtitulo">Perfil</h3>
      <div className="form">
        <TextField disabled id="nome" label="Seu nome" defaultValue={nome} />
        <TextField
          disabled
          id="nome_loja"
          label="Nome da loja"
          defaultValue={nome_loja}
        />
        <TextField disabled id="email" label="Email" defaultValue={email} />
      </div>
      <hr className="linha"></hr>
      <Button
        className={classes.button}
        onClick={() => history.push("perfil/editar")}
      >
        EDITAR PERFIL
      </Button>
      <ErrorComponent />
      <LoadingComponent />
    </>
  );
}
