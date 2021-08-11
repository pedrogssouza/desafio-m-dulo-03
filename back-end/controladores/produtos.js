const conexao = require("../conexao.js");
const securePassword = require("secure-password");
const jwt = require("jsonwebtoken");
const jwtSecret = require("../jwt_secret");

const pwd = securePassword();

async function obterProdutos(req, res) {
  try {
    const filtro = req.query.categoria;
    const token = req.headers.authorization.replace("Bearer ", "");
    const { id: usuario_id } = jwt.verify(token, jwtSecret);

    let produtos;
    if (filtro) {
      const query = `select * from produtos where usuario_id = $1 and categoria ilike $2`;
      produtos = await conexao.query(query, [usuario_id, filtro]);
    } else {
      const query = `select * from produtos where usuario_id = $1`;
      produtos = await conexao.query(query, [usuario_id]);
    }

    res.status(200).json(produtos.rows);
  } catch (error) {
    return res.status(400).json(error.message);
  }
}

async function obterProdutoPorId(req, res) {
  try {
    const token = req.headers.authorization.replace("Bearer ", "");
    const { id: usuario_id } = jwt.verify(token, jwtSecret);
    const id = req.params.id;

    const produto = await conexao.query(
      `select * from produtos where id = $1`,
      [id]
    );

    if (produto.rowCount > 0) {
      if (produto.rows[0].usuario_id === usuario_id) {
        res.status(200).json(produto.rows[0]);
      } else {
        res.status(401).json("Você não possui esse produto cadastrado");
      }
    } else {
      return res
        .status(400)
        .json("O Id informado não corresponde à nenhum produto");
    }
  } catch (error) {
    return res.status(400).json(error.message);
  }
}

module.exports = {
  obterProdutos,
  obterProdutoPorId,
};
