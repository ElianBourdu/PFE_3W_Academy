import axios from "axios";
import { BASE_URL } from '../../tools/utils.js';
import { useState } from "react";

const CreateThread = () => {
    const initialState = { title: ''};

    const [threadData, setThreadData] = useState(initialState);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setThreadData({ ...threadData, [name]: value });
    };

    const submit = (e) => {
        e.preventDefault();
        axios.post(`${BASE_URL}/createThread`, { title: threadData.title, topic__id: 6});
        setThreadData(initialState);
    };


    return (
        <form onSubmit={submit}>
            <input type='text' placeholder='title' name='title' onChange={handleChange} value={threadData.title} />
            <input type='submit' />
        </form>
    );
};

export default CreateThread;
