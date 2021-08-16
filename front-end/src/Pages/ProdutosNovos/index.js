import "./styles.css";
import {
  Button,
  InputAdornment,
  makeStyles,
  TextField,
  FormControl,
  Input,
  InputLabel,
} from "@material-ui/core";
import React from "react";
import { useForm } from "react-hook-form";
import ErrorComponent from "../../Components/ErrorComponent";
import { Link } from "react-router-dom";
import useAPI from "../../useAPI";

const useStyles = makeStyles({
  button: {
    backgroundColor: "#007DFF",
    color: "#FFFFFF",
  },
});

export default function ProdutosNovosPage() {
  const classes = useStyles();
  const { handleSubmit, register } = useForm();
  const { cadastroProdutoRequest } = useAPI();
  return (
    <div>
      <h3 className="subtitulo">Adicionar Produto</h3>
      <form onSubmit={handleSubmit(cadastroProdutoRequest)}>
        <div className="form">
          <TextField
            label="Nome do produto"
            {...register("nome", { required: true })}
            fullWidth
          />
          <div className="inputs_preco_qtd">
            <FormControl>
              <InputLabel htmlFor="preco">Preço</InputLabel>
              <Input
                {...register("preco", { required: true })}
                id="preco"
                type="number"
                startAdornment={
                  <InputAdornment position="start">R$</InputAdornment>
                }
              ></Input>
            </FormControl>
            <FormControl>
              <InputLabel htmlFor="estoque">Estoque</InputLabel>
              <Input
                {...register("estoque", { required: true })}
                id="estoque"
                type="number"
                startAdornment={
                  <InputAdornment position="start">Un</InputAdornment>
                }
              ></Input>
            </FormControl>
          </div>
          <TextField
            label="Descrição do produto"
            {...register("descricao", { required: true })}
            fullWidth
          />
          <TextField label="Imagem" {...register("imagem")} fullWidth />
        </div>
        <hr className="linha"></hr>
        <Link to="/produtos" className="link">
          CANCELAR
        </Link>
        <Button type="submit" className={classes.button}>
          Adicionar Produto
        </Button>
      </form>
      <ErrorComponent />
    </div>
  );
}
