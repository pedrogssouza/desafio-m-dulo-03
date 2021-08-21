import {
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  makeStyles,
  Typography,
} from "@material-ui/core";
import DeleteSweepIcon from "@material-ui/icons/DeleteSweep";
import { useState } from "react";
import { CardRemoverProduto } from "../CardRemoverProduto";
const useStyles = makeStyles({
  root: {
    maxWidth: 240,
    maxHeight: 430,
    borderRadius: 24,
  },
  media: {
    height: 280,
    width: "100%",
    position: "relative",
    top: -100,
  },
  botao: {
    backgroundColor: "#FF505F",
    width: 48,
    height: 48,
    borderRadius: "50%",
    margin: "22px 22px",
    display: "inline",
    zIndex: 1,
  },
  content: {
    position: "relative",
    top: -90,
    gap: 20,
    display: "flex",
    flexDirection: "column",
  },
  div_card: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export default function CardProduto(props) {
  const classes = useStyles();
  const [removerProduto, setRemoverProduto] = useState(false);
  const handleClose = () => {
    setRemoverProduto(false);
  };
  return (
    <Card className={classes.root}>
      <CardActionArea>
        <Button
          className={classes.botao}
          onClick={() => setRemoverProduto(true)}
        >
          <DeleteSweepIcon></DeleteSweepIcon>
        </Button>
        {removerProduto ? (
          <CardRemoverProduto
            removerProduto={removerProduto}
            handleClose={handleClose}
            id={props.id}
          ></CardRemoverProduto>
        ) : (
          ""
        )}
        <CardMedia
          className={classes.media}
          image={`${props.imagem}`}
          title={`${props.nome}`}
        />
        <CardContent className={classes.content}>
          <Typography gutterBottom variant="h5" component="h3">
            {props.nome}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {props.descricao}
          </Typography>
          <div className={classes.div_card}>
            <Typography variant="button" display="block" gutterBottom>
              {props.estoque + " UNIDADE(S)"}
            </Typography>
            <Typography variant="button" display="block" gutterBottom>
              {"R$ " + props.preco / 100}
            </Typography>
          </div>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
