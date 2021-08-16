import { Button, makeStyles } from "@material-ui/core";
import ErrorComponent from "../../Components/ErrorComponent";
import { useHistory } from "react-router-dom";
import useAPI from "../../useAPI";
import { useEffect, useState } from "react";
import CardProduto from "../../Components/CardProduto";

const useStyles = makeStyles({
  button: {
    backgroundColor: "#007DFF",
    color: "#FFFFFF",
  },
});

export default function ProdutosPage() {
  const classes = useStyles();
  const history = useHistory();
  const [produtos, setProdutos] = useState();
  const { getProdutosRequest } = useAPI();

  async function getProdutos() {
    await getProdutosRequest(setProdutos);
  }

  useEffect(getProdutos, []);

  return (
    <div className="content">
      <h3 className="subtitulo">Seus produtos</h3>
      <div className="grid">
        {produtos &&
          produtos.map((produto) => {
            return (
              <CardProduto
                imagem={produto.imagem}
                nome={produto.nome}
                descricao={produto.descricao}
                estoque={produto.estoque}
                preco={produto.preco}
                id={produto.id}
              />
            );
          })}
      </div>
      <hr className="linha"></hr>
      <Button
        className={classes.button}
        onClick={() => history.push("produtos/novo")}
      >
        Adicionar Produto
      </Button>
      <ErrorComponent />
    </div>
  );
}
