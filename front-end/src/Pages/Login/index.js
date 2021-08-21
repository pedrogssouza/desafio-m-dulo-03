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
import { useForm } from "react-hook-form";
import InputSenha from "../../Components/SenhaComponent";
import useAPI from "../../useAPI";
import ErrorComponent from "../../Components/ErrorComponent";
import LoadingComponent from "../../Components/Loading";

const useStyles = makeStyles({
  card: {
    boxShadow:
      "0px 8px 9px -5px rgba(0, 0, 0, 0.2), 0px 15px 22px 2px rgba(0, 0, 0, 0.14), 0px 6px 28px 5px rgba(0, 0, 0, 0.12)",
    borderRadius: 16,
    padding: 80,
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

export default function LoginPage() {
  const history = useHistory();
  const classes = useStyles();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();
  const { loginRequest } = useAPI();

  return (
    <form className="first_form" onSubmit={handleSubmit(loginRequest)}>
      <Card className={classes.card}>
        <Typography component="h2" variant="h4">
          Login
        </Typography>
        <div className="inputs">
          <TextField
            label="E-mail"
            {...register("email", { required: true })}
            error={errors.email ? true : false}
          />
          <InputSenha
            id="senha"
            label="Senha"
            register={() => register("senha", { required: true })}
            error={errors.senha ? true : false}
          />
        </div>
        <Button type="submit" className={classes.button}>
          Login
        </Button>
        <Typography component="p">
          Primeira vez aqui?
          <Link onClick={() => history.push("/cadastro")}>CRIE UMA CONTA</Link>
        </Typography>
        <ErrorComponent />
        <LoadingComponent />
      </Card>
    </form>
  );
}
