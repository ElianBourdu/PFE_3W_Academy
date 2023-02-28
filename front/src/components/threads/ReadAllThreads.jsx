import axios from "axios";
import { BASE_URL } from '../../tools/utils.js';
import { useEffect, useState } from "react";
import { NavLink } from 'react-router-dom';

const ReadAllThreads = () => {
    const [threadsList, setThreadsList] = useState([]);

    useEffect(() => {
        if (threadsList.length === 0) {
            axios.get(`${BASE_URL}/readThreads`)
                .then(res => setThreadsList(res.data.allThreads))
                .catch(err => console.log(err));
        }
    }, [threadsList]);

    const deleteThread = (id) => {
        axios.post(`${BASE_URL}/deleteThread`, { id })
            .then(res => {
                console.log(res);
                setThreadsList(threadsList.filter(thread => thread.id !== id));
            })
            .catch(err => console.log(err));
    };

    return (
        <div>
            { threadsList.length === 0 && (<p>loading</p>)}
            {threadsList.map((thread, i) => {
                return(
                    <ul key={i}>
                        <li>title: <NavLink to={`/thread/${thread.id}`}>{thread.title}</NavLink></li>
                        <button onClick={() => deleteThread(thread.id)}>X</button>
                    </ul>
                );
            })}
        </div>
    );
};

export default ReadAllThreads;