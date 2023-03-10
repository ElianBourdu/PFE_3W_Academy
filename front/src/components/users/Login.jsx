import { useState, useContext } from "react";
import axios from "axios";
import { BASE_URL } from "../../tools/utils.js";
import { StoreContext } from "../../tools/context.js";
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const initialState = { email: '', password: '' };
    const [state, dispatch] = useContext(StoreContext);
    const [info, setInfo] = useState(initialState);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInfo({ ...info, [name]: value });
    };

    const submit = (e) => {
        e.preventDefault();
        axios.post(`${BASE_URL}/login`, { email: info.email, password: info.password })
            .then(res => {
                console.log(res);
                if (res.data.login.response === null) {
                    setInfo(initialState);
                    return console.log('connection error occurred')
                } else {
                    localStorage.setItem('jwtToken', res.data.login.response.token);
                    axios.defaults.headers.common['Authorization'] = 'Bearer ' + res.data.login.response.token;
                    dispatch({ type: "LOGIN", payload:res.data.login.response.response });
                    setInfo(initialState);
                    navigate(`/`);
                }
            });
    };

    return (
        <form onSubmit={submit}>
            <div>
                <label htmlFor="email">email</label>
                <input type='text' name='email' placeholder='email' onChange={handleChange} value={info.email} />
            </div>
            <div>
                <label htmlFor="password">password</label>
                <input type='password' name='password' placeholder='password' onChange={handleChange} value={info.password} />
            </div>
            <input type="submit" />
        </form>
    );
};

export default Login;
