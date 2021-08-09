const conexao = require("../conexao.js");

const securePassword = require("secure-password");

const pwd = securePassword();

async function cadastrarUsuario(req, res) {
  const { nome, email, senha, nome_loja } = req.body;

  if (!nome) {
    return res.status(400).json("O nome é um campo obrigatório");
  }
  if (!email) {
    return res.status(400).json("O email é um campo obrigatório");
  }
  if (!senha) {
    return res.status(400).json("A senha é um campo obrigatório");
  }
  if (!nome_loja) {
    return res.status(400).json("O nome da loja é um campo obrigatório");
  }

  try {
    const query = `select * from usuarios where email = $1`;
    const usuario = await conexao.query(query, [email]);

    if (usuario.rowCount > 0) {
      return res.status(400).json("Esse email já foi cadastrado");
    }
  } catch (error) {
    return res.status(400).json(error.message);
  }

  try {
    const hash = (await pwd.hash(Buffer.from(senha))).toString("hex");

    const query = `insert into usuarios(nome,email,senha,nome_loja) values($1,$2,$3,$4)`;
    const usuario = await conexao.query(query, [nome, email, hash, nome_loja]);

    if (usuario.rowCount === 0) {
      return res.status(400).json("Não foi possível cadastrar o usuário");
    }

    return res.status(200).json("Usuário cadastrado com sucesso");
  } catch (error) {
    return res.status(400).json(error.message);
  }
}

module.exports = {
  cadastrarUsuario,
};
