import { Button, makeStyles, TextField } from "@material-ui/core";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import ErrorComponent from "../../Components/ErrorComponent";
import LoadingComponent from "../../Components/Loading";
import InputSenha from "../../Components/SenhaComponent";
import { PerfilContext } from "../../Contexts/perfilContext";
import useAPI from "../../useAPI";

const useStyles = makeStyles({
  button: {
    backgroundColor: "#007DFF",
    color: "#FFFFFF",
  },
});

export default function EditarPerfilPage() {
  const classes = useStyles();
  const {
    handleSubmit,
    register,
    formState: { errors },
    setError,
  } = useForm();
  const { atualizarPerfilRequest } = useAPI();

  async function atualizarPerfil(data) {
    if (data.senha !== data.senha_repetida) {
      setError("senha", { type: "validate" }, { shouldFocus: true });
      setError("senha_repetida", { type: "validate" }, { shouldFocus: false });
      return;
    }

    await atualizarPerfilRequest(data);
  }
  return (
    <div>
      <h3 className="subtitulo">Editar Perfil</h3>
      <form onSubmit={handleSubmit(atualizarPerfil)}>
        <div className="form">
          <TextField
            label="Seu nome"
            {...register("nome", { required: true })}
            fullWidth
          />
          <TextField
            label="Nome da loja"
            {...register("nome_loja", { required: true })}
            fullWidth
          />
          <TextField
            label="E-mail"
            {...register("email", { required: true })}
            fullWidth
          />
          <InputSenha
            id="senha"
            label="Nova senha"
            register={() => register("senha", { required: true })}
            error={errors.senha ? true : false}
          />
          <InputSenha
            id="senha_repetida"
            label="Repita a nova senha"
            register={() => register("senha_repetida", { required: true })}
            error={errors.senha_repetida ? true : false}
          />
        </div>
        <hr className="linha"></hr>
        <Link to="/produtos" className="link">
          CANCELAR
        </Link>
        <Button type="submit" className={classes.button}>
          EDITAR PERFIL
        </Button>
      </form>
      <ErrorComponent />
      <LoadingComponent />
    </div>
  );
}
