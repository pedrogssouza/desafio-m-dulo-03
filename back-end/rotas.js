 const express = require("express");
 const {cadastrarUsuario} = require("./controladores/usuario");

const rotas = express();

rotas.post("/cadastro", cadastrarUsuario)


module.exports = rotas