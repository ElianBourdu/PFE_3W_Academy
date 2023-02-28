import axios from "axios";
import { BASE_URL } from '../../tools/utils.js';
import { useState } from "react";

const AddUser = () => {
    const initialState = {
        content: ''
    };

    const [userData, setUserData] = useState(initialState);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData({ ...userData, [name]: value });
    };

    const submit = (e) => {
        e.preventDefault();
        axios
            .post(`${BASE_URL}/createMessage`, {
                content: userData.content,
                user__id: 2,
                thread__id: 3
            })
            .then(res => console.log(res));
        setUserData(initialState);
    };

    return (
        <form onSubmit={submit}>
            <textarea placeholder='type your message' name='content' onChange={handleChange} value={userData.content}></textarea>
            <input type='submit' />
        </form>
    );
};

export default AddUser;
