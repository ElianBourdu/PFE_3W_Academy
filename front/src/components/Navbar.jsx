import { NavLink } from "react-router-dom";
import { useEffect, useContext, Fragment } from 'react';
import axios from 'axios';
import { StoreContext } from "../tools/context.js";

const Navbar = (props) => {
    const [state] = useContext(StoreContext);

    useEffect(() => {
        console.log(state);
        const jwtToken = localStorage.getItem("jwtToken");
        if (!axios.defaults.headers.common["Authorization"] && jwtToken) {
            axios.defaults.headers.common["Authorization"] = `Bearer ${jwtToken}`;
        }
    }, [state]);

    return (
        <nav>
            {state.user.isLogged && <p>Welcome {state.user.role_name} {state.user.first_name} {state.user.last_name}</p>}
            <ul>
                <li>
                    <NavLink to="/">
                        Home
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/ReadAllUsers">
                        View users list
                    </NavLink>
                </li>
                { !state.user.isLogged && 
                <Fragment>
                    <li>
                        <NavLink to="/CreateUser">
                            Register
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/Login">
                            Login
                        </NavLink>
                    </li>
                </Fragment>
                }
                { state.user.isLogged && 
                <li>
                    <NavLink to="/Logout">
                        Logout
                    </NavLink>
                </li>}
                {/*<li>
                    <NavLink to="/CreateTopic">
                        Create topic
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/ReadAllTopics">
                        Read all topics
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/CreateThread">
                        Create thread
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/ReadAllThreads">
                        Read all threads
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/CreateMessage">
                        Create message
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/ReadAllMessages">
                        Read all messages
                    </NavLink>
                </li>*/}
            </ul>
        </nav>
    );
};

export default Navbar;
