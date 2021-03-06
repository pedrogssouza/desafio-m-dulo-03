import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import LoginPage from "./Pages/Login";
import CadastroPage from "./Pages/Cadastro";
import ProdutosPage from "./Pages/Produtos";
import { useContext, useState } from "react";
import { AuthContext } from "./Contexts/authContext";
import { ErrorContext } from "./Contexts/errorContext";
import { PerfilContext } from "./Contexts/perfilContext";
import { ProdutosContext } from "./Contexts/produtosContext";
import { LoadingContext } from "./Contexts/loadingContext";
import Navbar from "./Components/Navbar";
import StoreNameComponent from "./Components/StoreName/StoreNameComponent";
import ProdutosNovosPage from "./Pages/ProdutosNovos";
import PerfilPage from "./Pages/Perfil";
import EditarPerfilPage from "./Pages/EditarPerfil";

function RotasProtegidas(props) {
  const { token } = useContext(AuthContext);

  return (
    <Route render={() => (token ? props.children : <Redirect to="/" />)} />
  );
}

function App() {
  const [token, setToken] = useState(() => {
    const token = localStorage.getItem("token");
    return token || "";
  });
  const [requestError, setRequestError] = useState("");
  const [perfil, setPerfil] = useState({});
  const [produtos, setProdutos] = useState();
  const [loading, setLoading] = useState(false);
  return (
    <AuthContext.Provider value={{ token, setToken }}>
      <ErrorContext.Provider value={{ requestError, setRequestError }}>
        <PerfilContext.Provider value={{ perfil, setPerfil }}>
          <ProdutosContext.Provider value={{ produtos, setProdutos }}>
            <LoadingContext.Provider value={{ loading, setLoading }}>
              <Router>
                <Switch>
                  <Route path="/" exact component={LoginPage} />
                  <Route path="/cadastro" component={CadastroPage} />
                  <RotasProtegidas>
                    <Navbar>
                      <StoreNameComponent>
                        <Route
                          path="/produtos/novo"
                          component={ProdutosNovosPage}
                        />
                        <Route
                          path="/produtos"
                          exact
                          component={ProdutosPage}
                        />
                        <Route path="/perfil" exact component={PerfilPage} />
                        <Route
                          path="/perfil/editar"
                          component={EditarPerfilPage}
                        />
                      </StoreNameComponent>
                    </Navbar>
                  </RotasProtegidas>
                </Switch>
              </Router>
            </LoadingContext.Provider>
          </ProdutosContext.Provider>
        </PerfilContext.Provider>
      </ErrorContext.Provider>
    </AuthContext.Provider>
  );
}

export default App;
