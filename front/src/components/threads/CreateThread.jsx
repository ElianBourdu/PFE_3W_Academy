import axios from "axios";
import { BASE_URL } from '../../tools/utils.js';
import { useState } from "react";

const CreateThread = (topic__id) => {
    const initialState = { title: '' };

    const [threadData, setThreadData] = useState(initialState);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setThreadData({ ...threadData, [name]: value });
    };

    const submit = (e) => {
        e.preventDefault();
        console.log(topic__id)
        axios.post(`${BASE_URL}/createThread`, { title: threadData.title, topic__id: topic__id.topic__id })
            .then(res => console.log(res));
        setThreadData(initialState);
    };


    return (
        <form onSubmit={submit}>
            <label htmlFor="title">Create your thread</label>
            <input type='text' placeholder='title' name='title' onChange={handleChange} value={threadData.title} />
            <input type='submit' />
        </form>
    );
};

export default CreateThread;
