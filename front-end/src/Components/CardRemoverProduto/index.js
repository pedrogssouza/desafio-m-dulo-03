import {
  Backdrop,
  Button,
  Card,
  CardActions,
  CardContent,
  makeStyles,
  Typography,
} from "@material-ui/core";
import useAPI from "../../useAPI";

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
  blue_button: {
    backgroundColor: "#007DFF",
    color: "#FFFFFF",
  },
  red_button: {
    backgroundColor: "#FF505F",
    color: "#FFFFFF",
    marginLeft: 10,
  },
  root: {
    background: "#FFFFFF",
    borderRadius: 12,
    width: 380,
    height: 190,
    padding: 10,
  },
  buttons: {
    display: "block",
    marginLeft: "auto",
  },
  text: {
    marginTop: 40,
  },
}));

export function CardRemoverProduto(props) {
  const classes = useStyles();
  const { deleteProdutoRequest } = useAPI();
  return (
    <Backdrop
      className={classes.backdrop}
      open={props.removerProduto}
      onClick={props.handleClose}
    >
      <Card className={classes.root}>
        <CardContent>
          <Typography className={classes.title} variant="h5" component="h2">
            Remover produto do catalógo?
          </Typography>
          <Typography color="textPrimary" gutterBottom className={classes.text}>
            Esta ação não pode ser desfeita
          </Typography>
        </CardContent>
        <CardActions>
          <div className={classes.buttons}>
            <Button className={classes.blue_button}>MANTER PRODUTO</Button>
            <Button
              className={classes.red_button}
              onClick={() => deleteProdutoRequest(props.id)}
            >
              REMOVER
            </Button>
          </div>
        </CardActions>
      </Card>
    </Backdrop>
  );
}
