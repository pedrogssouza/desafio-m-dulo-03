import "./App.css";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import LoginPage from "./Pages/Login";
import CadastroPage from "./Pages/Cadastro";
import ProdutosPage from "./Pages/Produtos";
import { AuthContext } from "./Contexts/authContext";
import { ErrorContext } from "./Contexts/errorContext";
import { useContext, useState } from "react";
import Navbar from "./Components/Navbar";
import StoreNameComponent from "./Components/StoreName/StoreNameComponent";
import ProdutosNovosPage from "./Pages/ProdutosNovos";
import PerfilPage from "./Pages/Perfil";

function RotasProtegidas(props) {
  const { token } = useContext(AuthContext);

  return (
    <Route render={() => (token ? props.children : <Redirect to="/" />)} />
  );
}

function App() {
  const [token, setToken] = useState("");
  const [requestError, setRequestError] = useState("");
  return (
    <AuthContext.Provider value={{ token, setToken }}>
      <ErrorContext.Provider value={{ requestError, setRequestError }}>
        <Router>
          <Switch>
            <Route path="/" exact component={LoginPage} />
            <Route path="/cadastro" component={CadastroPage} />
            <RotasProtegidas>
              <Navbar>
                <StoreNameComponent>
                  <Route path="/produtos/novo" component={ProdutosNovosPage} />
                  <Route path="/produtos" exact component={ProdutosPage} />
                  <Route path="/perfil" exact component={PerfilPage} />
                </StoreNameComponent>
              </Navbar>
            </RotasProtegidas>
          </Switch>
        </Router>
      </ErrorContext.Provider>
    </AuthContext.Provider>
  );
}

export default App;
