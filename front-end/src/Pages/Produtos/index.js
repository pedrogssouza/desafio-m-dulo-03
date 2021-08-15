import { Button, makeStyles } from "@material-ui/core";
import ErrorComponent from "../../Components/ErrorComponent";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles({
  button: {
    backgroundColor: "#007DFF",
    color: "#FFFFFF",
  },
});

export default function ProdutosPage() {
  const classes = useStyles();
  const history = useHistory();
  return (
    <div className="content">
      <h3 className="subtitulo">Seus produtos</h3>
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
