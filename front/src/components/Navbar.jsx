import { NavLink } from "react-router-dom";
import {useEffect} from 'react'
import axios from 'axios'
const Nav = (props) => {
  
  useEffect(() => {
    const jwtToken = localStorage.getItem("jwtToken")
    if (!axios.defaults.headers.common["Authorization"] && jwtToken) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${jwtToken}`
    }
  }, [])
  
  return (
    <nav>
      <ul>
        <li>
          <NavLink to="/">
            HOME
          </NavLink>
        </li>
        <li>
          <NavLink to="/contact">
            contact
          </NavLink>
        </li>
        <li>
          <NavLink to="/profil">
            profil
          </NavLink>
        </li>
        <li>
          <NavLink to="/product/react">
            profil
          </NavLink>
        </li>
        <li>
          <NavLink to="/product/html">
            profil
          </NavLink>
        </li>
        <li>
          <NavLink to="/testme">
            profil
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;