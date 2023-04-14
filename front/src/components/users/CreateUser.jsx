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
        })
        .then(res => console.log(res));
        setUserData(initialState);
    };


    return (
        <form className='user__register' onSubmit={submit}>
            <label htmlFor="last_name">last_name</label>
            <input type='text' placeholder='last_name' name='last_name' onChange={handleChange} value={userData.last_name} />
            <label htmlFor="first_name">first_name</label>
            <input type='text' placeholder='first_name' name='first_name' onChange={handleChange} value={userData.first_name} />
            <label htmlFor="email">email</label>
            <input type='text' placeholder='email' name='email' onChange={handleChange} value={userData.email} />
            <label htmlFor="password">password</label>
            <input type='text' placeholder='password' name='password' onChange={handleChange} value={userData.password} />
            <input className="button--submit" type='submit' value='Create account'/>
        </form>
    );
};

export default AddUser;