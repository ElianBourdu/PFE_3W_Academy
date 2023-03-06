import axios from "axios";
import { BASE_URL } from '../../tools/utils.js';
import { useEffect, Fragment, useContext } from "react";
import { StoreContext } from '../../tools/context.js';
import { NavLink } from 'react-router-dom';

const ReadAllthreads = (topic__id = null/*, group__id = null*/) => {
    const [state, dispatch] = useContext(StoreContext);

    useEffect(() => {
        if (state.threads.length === 0) {
            axios.get(`${BASE_URL}/readthreads`)
                .then(res => {
                    dispatch({ type: "READ_ALL_THREADS", payload: res.data.allThreads });
                })
                .catch(err => console.log(err));
        }
    }, [state.threads]);

    const deleteThread = (id) => {
        axios.post(`${BASE_URL}/deleteThread`, { id })
            .then(res => {
                console.log(res);
                dispatch({
                    type: "DELETE_THREAD",
                    payload: state.threads.filter(thread => thread.id !== id)
                });
            })
            .catch(err => console.log(err));
    };

    return (
        <Fragment>
            { state.threads.length === 0 && (<p>loading</p>)}
            { state.threads.map((thread, i) => {
                return(
                    (topic__id.topic__id === thread.topic__id) && (
                        <ul key={i}>
                            <li>title: 
                                <NavLink to={`/thread/${thread.id}`}>{thread.title}</NavLink>
                                <button onClick={() => deleteThread(thread.id)}>X</button>
                            </li>
                        </ul>
                    )
                );
            })}
        </Fragment>
    );
};

export default ReadAllthreads;
