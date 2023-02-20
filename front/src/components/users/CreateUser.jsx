import axios from "axios";
import { BASE_URL } from '../../tools/utils.js';
import { useState } from "react";

const AddUser = () => {
    const initialState = {
        last_name: '',
        first_name: '',
        email: '',
        password: ''
    };
    const [userData, setUserData] = useState(initialState);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData({ ...userData, [name]: value });
    };

    const submit = (e) => {
        e.preventDefault();
        axios.post(`${BASE_URL}/createUser`, {
            last_name: userData.last_name,
            first_name: userData.first_name,
            email: userData.email,
            password: userData.password
        });
        setUserData(initialState);
    };


    return (
        <form onSubmit={submit}>
            <input type='text' placeholder='last_name' name='last_name' onChange={handleChange} value={userData.last_name} />
            <input type='text' placeholder='first_name' name='first_name' onChange={handleChange} value={userData.first_name} />
            <input type='text' placeholder='email' name='email' onChange={handleChange} value={userData.email} />
            <input type='text' placeholder='password' name='password' onChange={handleChange} value={userData.password} />
            <input type='submit' />
        </form>
    );
};

export default AddUser;