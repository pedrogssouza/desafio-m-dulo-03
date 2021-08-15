const conexao = require("../conexao.js");
const securePassword = require("secure-password");
const jwt = require("jsonwebtoken");
const jwtSecret = require("../jwt_secret");

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

    return res.status(201).json("Usuário cadastrado com sucesso");
  } catch (error) {
    return res.status(400).json(error.message);
  }
}

async function login(req, res) {
  const { email, senha } = req.body;

  if (!email) {
    return res.status(400).json("O email é um campo obrigatório");
  }
  if (!senha) {
    return res.status(400).json("A senha é um campo obrigatório");
  }

  try {
    const query = `select * from usuarios where email = $1`;
    const usuarios = await conexao.query(query, [email]);

    if (usuarios.rowCount === 0) {
      return res.status(400).json("Email ou senha incorretos");
    }

    const usuario = usuarios.rows[0];

    const result = await pwd.verify(
      Buffer.from(senha),
      Buffer.from(usuario.senha, "hex")
    );

    switch (result) {
      case securePassword.INVALID_UNRECOGNIZED_HASH:
      case securePassword.INVALID:
        return res.status(400).json("Email ou senha incorretos");
      case securePassword.VALID:
        break;
      case securePassword.VALID_NEEDS_REHASH:
        try {
          const hash = (await pwd.hash(Buffer.from(senha))).toString("hex");

          const query = `update usuarios set senha = $1 where email = $2`;
          await conexao.query(query, [hash, email]);
        } catch {}
        break;
    }

    const token = jwt.sign(
      {
        ...usuario,
        senha: undefined,
      },
      jwtSecret,
      { expiresIn: "1h" }
    );

    const usuarioFormatado = {
      id: usuario.id,
      nome: usuario.nome,
      email: usuario.email,
      nome_loja: usuario.nome_loja,
    };

    const response = {
      usuario: usuarioFormatado,
      token: token,
    };
    return res.status(200).json(response);
  } catch (error) {
    return res.status(400).json(error.message);
  }
}

async function obterUsuario(req, res) {
  try {
    const token = req.headers.authorization.replace("Bearer ", "");

    const { id } = jwt.verify(token, jwtSecret);

    const query = `select id,nome,email,nome_loja from usuarios where id = $1`;
    const usuario = await conexao.query(query, [id]);

    return res.status(200).json(usuario.rows[0]);
  } catch (error) {
    return res.status(400).json(error.message);
  }
}

async function atualizarUsuario(req, res) {
  try {
    const { nome, email, senha, nome_loja } = req.body;
    const token = req.headers.authorization.replace("Bearer ", "");
    const { id } = jwt.verify(token, jwtSecret);

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

    const usuario = await conexao.query(
      "select * from usuarios where id = $1",
      [id]
    );

    console.log(usuario);

    if (email !== usuario.rows[0].email) {
      const buscaDeUsuarioPeloEmail = await conexao.query(
        "select * from usuarios where email=$1",
        [email]
      );

      if (buscaDeUsuarioPeloEmail.rowCount > 0) {
        return res.status(400).json("Esse email já foi cadastrado");
      }
    }

    const hash = (await pwd.hash(Buffer.from(senha))).toString("hex");

    const query = `update usuarios set nome=$1, email=$2, senha=$3, nome_loja=$4 where id = $5 `;
    await conexao.query(query, [nome, email, hash, nome_loja, id]);

    res.status(204).json("Usuário atualizado com sucesso!");
  } catch (error) {
    return res.status(400).json(error.message);
  }
}

module.exports = {
  cadastrarUsuario,
  login,
  obterUsuario,
  atualizarUsuario,
};
