import { useContext } from "react";
import { useHistory } from "react-router-dom";
import { AuthContext } from "./Contexts/authContext";
import { ErrorContext } from "./Contexts/errorContext";
import { LoadingContext } from "./Contexts/loadingContext";
import { PerfilContext } from "./Contexts/perfilContext";
import { ProdutosContext } from "./Contexts/produtosContext";
import {
  postRequest,
  postProtectedRequest,
  getProtectedRequest,
  deleteProtectedRequest,
} from "./Pages/requests";

export default function useAPI() {
  const { token, setToken } = useContext(AuthContext);
  const { setRequestError } = useContext(ErrorContext);
  const { setPerfil } = useContext(PerfilContext);
  const { setProdutos } = useContext(ProdutosContext);
  const { setLoading } = useContext(LoadingContext);
  const history = useHistory();

  async function loginRequest(data) {
    setLoading(true);

    const response = await postRequest("http://localhost:8000/login", data);

    const dados = await response.json();

    setLoading(false);

    setRequestError("");

    if (response.ok) {
      setToken(dados.token);
      localStorage.setItem("token", dados.token);
      history.push("/produtos");
      return;
    }

    setRequestError(dados);
  }

  async function cadastroRequest(data) {
    setLoading(true);

    const response = await postRequest("http://localhost:8000/cadastro", data);

    const dados = await response.json();

    setLoading(false);

    setRequestError("");

    if (response.ok) {
      history.push("/");
      return;
    }

    setRequestError(dados);
  }

  async function getPerfilRequest() {
    setLoading(true);

    const response = await getProtectedRequest(
      "http://localhost:8000/perfil",
      token
    );

    const dados = await response.json();

    setLoading(false);

    setRequestError("");

    if (response.ok) {
      console.log(dados);
      setPerfil(dados);
      return;
    }

    setRequestError(dados);
  }

  async function atualizarPerfilRequest(data) {
    setLoading(true);

    const response = await postProtectedRequest(
      "http://localhost:8000/perfil",
      "PUT",
      data,
      token
    );

    const dados = await response.json();

    setRequestError("");

    if (response.ok) {
      setPerfil(dados);
      history.push("/perfil");
      setLoading(false);
      return;
    }

    setRequestError(dados);
  }

  async function getProdutosRequest() {
    setLoading(true);

    const response = await getProtectedRequest(
      "http://localhost:8000/produtos",
      token
    );

    const dados = await response.json();

    setLoading(false);

    setRequestError("");

    if (response.ok) {
      setProdutos(dados);
      return;
    }

    setRequestError(dados);
  }

  async function cadastroProdutoRequest(data) {
    setLoading(true);

    const response = await postProtectedRequest(
      "http://localhost:8000/produtos",
      "POST",
      data,
      token
    );

    const dados = await response.json();

    setLoading(false);

    setRequestError("");

    if (response.ok) {
      history.push("/produtos");
      return;
    }

    setRequestError(dados);
  }

  async function deleteProdutoRequest(id) {
    setLoading(true);

    const response = await deleteProtectedRequest(
      `http://localhost:8000/produtos/${id}`,
      token
    );

    const dados = await response.json();

    setLoading(false);

    setRequestError("");

    if (response.ok) {
      return;
    }

    setRequestError(dados);
  }

  return {
    loginRequest,
    cadastroRequest,
    cadastroProdutoRequest,
    getPerfilRequest,
    atualizarPerfilRequest,
    getProdutosRequest,
    deleteProdutoRequest,
  };
}
