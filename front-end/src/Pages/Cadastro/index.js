import React from "react";
import "../styles.css";
import {
  Button,
  Card,
  Link,
  makeStyles,
  TextField,
  Typography,
} from "@material-ui/core";
import { useHistory } from "react-router-dom";
import InputSenha from "../../Components/SenhaComponent";
import { useForm } from "react-hook-form";
import useAPI from "../../useAPI";
import ErrorComponent from "../../Components/ErrorComponent";
import LoadingComponent from "../../Components/Loading";

const useStyles = makeStyles({
  card: {
    boxShadow:
      "0px 8px 9px -5px rgba(0, 0, 0, 0.2), 0px 15px 22px 2px rgba(0, 0, 0, 0.14), 0px 6px 28px 5px rgba(0, 0, 0, 0.12)",
    borderRadius: 16,
    padding: 60,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    "& p": {
      maxWidth: 210,
      fontSize: 13,
      marginTop: 35,
    },
  },
  button: {
    backgroundColor: "#007DFF",
    color: "#FFFFFF",
  },
});

export default function CadastroPage() {
  const history = useHistory();
  const classes = useStyles();
  const {
    handleSubmit,
    register,
    formState: { errors },
    setError,
  } = useForm();
  const { cadastroRequest } = useAPI();

  async function cadastro(data) {
    if (data.senha !== data.senha_repetida) {
      setError("senha", { type: "validate" }, { shouldFocus: true });
      setError("senha_repetida", { type: "validate" }, { shouldFocus: false });
      return;
    }

    cadastroRequest(data);
  }
  return (
    <form className="first_form" onSubmit={handleSubmit(cadastro)}>
      <Card className={classes.card}>
        <Typography component="h2" variant="h4">
          Criar uma conta
        </Typography>
        <div className="inputs">
          <TextField
            label="Seu nome"
            {...register("nome", { required: true })}
            error={errors.nome ? true : false}
          ></TextField>
          <TextField
            label="Nome da loja"
            {...register("nome_loja", { required: true })}
            error={errors.nome_loja ? true : false}
          ></TextField>
          <TextField
            label="E-mail"
            {...register("email", { required: true })}
            error={errors.email ? true : false}
          ></TextField>
          <InputSenha
            id="senha"
            label="Senha"
            register={() => register("senha", { required: true })}
            error={errors.senha ? true : false}
          />
          <InputSenha
            id="senhaRepetida"
            label="Repita a senha"
            register={() => register("senha_repetida", { required: true })}
            error={errors.senha_repetida ? true : false}
          />
        </div>
        <Button type="submit" variant="contained" className={classes.button}>
          Criar conta
        </Button>
        <Typography component="p">
          {" "}
          Já possui uma conta?
          <Link onClick={() => history.push("/")}>ACESSE</Link>
        </Typography>
        <ErrorComponent />
        <LoadingComponent />
      </Card>
    </form>
  );
}
