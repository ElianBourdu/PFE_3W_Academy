import axios from "axios";
import { BASE_URL } from '../../tools/utils.js';
import { useEffect, useState, Fragment } from "react";
import { NavLink } from 'react-router-dom';

const ReadAllThreads = (topic__id = null, group__id = null) => {
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
        <Fragment>
            { threadsList.length === 0 && (<p>loading</p>)}
            {threadsList.map((thread, i) => {
                return(
                    (topic__id.topic__id === thread.topic__id) && (
                        <ul key={i}>
                            <li>title: <NavLink to={`/thread/${thread.id}`}>{thread.title}</NavLink></li>
                            <button onClick={() => deleteThread(thread.id)}>X</button>
                        </ul>
                    )
                );
            })}
        </Fragment>
    );
};

export default ReadAllThreads;
