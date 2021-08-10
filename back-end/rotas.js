const express = require("express");
const usuario = require("./controladores/usuario");

const rotas = express();

rotas.post("/cadastro", usuario.cadastrarUsuario);
rotas.post("/login", usuario.login);
rotas.get("/perfil", usuario.obterPerfil);

module.exports = rotas;