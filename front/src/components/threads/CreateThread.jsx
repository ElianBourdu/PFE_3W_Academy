import axios from "axios";
import { BASE_URL } from '../../tools/utils.js';
import { useState, useContext } from "react";
import { StoreContext } from '../../tools/context.js';

const CreateThread = (topic__id) => {
    const [state, dispatch] = useContext(StoreContext);
    const initialState = { title: '' };
    const [threadData, setThreadData] = useState(initialState);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setThreadData({ ...threadData, [name]: value });
    };

    const submit = (e) => {
        e.preventDefault();
        axios.post(`${BASE_URL}/createThread`, { title: threadData.title, topic__id: topic__id.topic__id })
            .then(res => {
                console.log(res);
                dispatch({
                    type: "CREATE_THREAD",
                    payload: {
                        id: res.data.newThread.response.insertId,
                        topic__id: topic__id.topic__id,
                        group__id: null,
                        title: threadData.title,
                        lock_date: null
                    }
                });
            });
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
