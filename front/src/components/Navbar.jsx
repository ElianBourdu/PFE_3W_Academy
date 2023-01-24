import { NavLink } from "react-router-dom";

const Navbar = (props) => {
  return (
    <nav>
      <ul>
        <li>
          <NavLink to="/">
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/error">
            POC error
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;