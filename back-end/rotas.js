const express = require("express");
const usuario = require("./controladores/usuario");
const produtos = require("./controladores/produtos");

const rotas = express();

rotas.post("/cadastro", usuario.cadastrarUsuario);
rotas.post("/login", usuario.login);
rotas.get("/perfil", usuario.obterUsuario);
rotas.put("/perfil", usuario.atualizarUsuario);

rotas.get("/produtos", produtos.obterProdutos);
rotas.get("/produtos/:id", produtos.obterProdutoPorId);
rotas.post("/produtos", produtos.cadastrarProduto);
rotas.put("/produtos/:id", produtos.atualizarProduto);
rotas.delete("/produtos/:id", produtos.deletarProduto);

module.exports = rotas;
