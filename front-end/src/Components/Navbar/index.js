import "./styles.css";
import React, { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../../Contexts/authContext";
import store from "../../assets/store.svg";
import storeSelected from "../../assets/store-selected.svg";
import user from "../../assets/user.svg";
import userSelected from "../../assets/user-selected.svg";
import close from "../../assets/Frame.svg";

export default function Navbar(props) {
  const { setToken } = useContext(AuthContext);
  const [selectedIcon, setSelectedIcon] = useState(true);
  function handleLogout() {
    setToken("");
  }

  return (
    <div className="page">
      <aside>
        <NavLink to="/produtos" onClick={() => setSelectedIcon(true)}>
          <img src={selectedIcon ? storeSelected : store} alt="produtos" />
        </NavLink>
        <NavLink to="/perfil" onClick={() => setSelectedIcon(false)}>
          <img src={selectedIcon ? user : userSelected} alt="perfil" />
        </NavLink>
        <NavLink to="/" onClick={handleLogout}>
          <img src={close} alt="sair" />
        </NavLink>
      </aside>
      <div className="main">{props.children}</div>
    </div>
  );
}
