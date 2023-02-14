import { NavLink } from "react-router-dom";
// import {useEffect} from 'react';
// import axios from 'axios';
const Navbar = (props) => {
  
  // useEffect(() => {
  //   const jwtToken = localStorage.getItem("jwtToken")
  //   if (!axios.defaults.headers.common["Authorization"] && jwtToken) {
  //     axios.defaults.headers.common["Authorization"] = `Bearer ${jwtToken}`
  //   }
  // }, [])
  
  return (
    <nav>
      <ul>
        <li>
          <NavLink to="/">
            HOME
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;