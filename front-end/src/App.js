import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import LoginPage from "./Pages/Login";
import Cadastro from "./Pages/Cadastro";
import { AuthContext } from "./Contexts/authContext";
import { ErrorContext } from "./Contexts/errorContext";
import { useState } from "react";

function App() {
  const [token, setToken] = useState();
  const [requestError, setRequestError] = useState("");
  return (
    <AuthContext.Provider value={{ token, setToken }}>
      <ErrorContext.Provider value={{ requestError, setRequestError }}>
        <Router>
          <Switch>
            <Route path="/" exact component={LoginPage} />
            <Route path="/cadastro" component={Cadastro} />
          </Switch>
        </Router>
      </ErrorContext.Provider>
    </AuthContext.Provider>
  );
}

export default App;
