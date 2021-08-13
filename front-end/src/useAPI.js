import { useContext } from "react";
import { useHistory } from "react-router-dom";
import { AuthContext } from "./Contexts/authContext";
import { ErrorContext } from "./Contexts/errorContext";
import { request, protectedRequest } from "./Pages/requests";

export default function useAPI() {
  const { token, setToken } = useContext(AuthContext);
  const { setRequestError } = useContext(ErrorContext);
  const history = useHistory();

  async function loginRequest(data) {
    const response = await request("http://localhost:8000/login", "POST", data);

    const dados = await response.json();

    setRequestError("");

    if (response.ok) {
      console.log(dados);
      setToken(dados.token);
      history.push("/produtos");
      return;
    }

    setRequestError(dados);
  }

  async function cadastroRequest(data) {
    const response = await request(
      "http://localhost:8000/cadastro",
      "POST",
      data
    );

    const dados = await response.json();

    setRequestError("");

    if (response.ok) {
      console.log(dados);
      history.push("/");
      return;
    }

    setRequestError(dados);
  }
  return {
    loginRequest,
    cadastroRequest,
  };
}
