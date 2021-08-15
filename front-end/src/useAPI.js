import { useContext } from "react";
import { useHistory } from "react-router-dom";
import { AuthContext } from "./Contexts/authContext";
import { ErrorContext } from "./Contexts/errorContext";
import {
  postRequest,
  postProtectedRequest,
  getProtectedRequest,
} from "./Pages/requests";

export default function useAPI() {
  const { token, setToken } = useContext(AuthContext);
  const { setRequestError } = useContext(ErrorContext);
  const history = useHistory();

  async function loginRequest(data) {
    const response = await postRequest(
      "http://localhost:8000/login",
      "POST",
      data
    );

    const dados = await response.json();

    setRequestError("");

    if (response.ok) {
      setToken(dados.token);
      history.push("/produtos");
      return;
    }

    setRequestError(dados);
  }

  async function cadastroRequest(data) {
    const response = await postRequest(
      "http://localhost:8000/cadastro",
      "POST",
      data
    );

    const dados = await response.json();

    setRequestError("");

    if (response.ok) {
      history.push("/");
      return;
    }

    setRequestError(dados);
  }

  async function getPerfilRequest(setPerfil) {
    const response = await getProtectedRequest(
      "http://localhost:8000/perfil",
      token
    );

    const dados = await response.json();

    setRequestError("");

    if (response.ok) {
      setPerfil(dados);
      return;
    }

    setRequestError(dados);
  }

  async function atualizarPerfilRequest(data, setPerfil) {
    const response = await postProtectedRequest(
      "http://localhost:8000/perfil",
      "PUT",
      data,
      token
    );

    const dados = await response.json();

    setRequestError("");

    console.log(dados);

    if (response.ok) {
      setPerfil(...dados);
      history.push("/perfil");
      return;
    }

    setRequestError(dados);
  }

  async function cadastroProdutoRequest(data) {
    const response = await postProtectedRequest(
      "http://localhost:8000/produtos",
      "POST",
      data,
      token
    );

    console.log(response);
    const dados = await response.json();

    setRequestError("");

    if (response.ok) {
      history.push("/produtos");
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
  };
}
