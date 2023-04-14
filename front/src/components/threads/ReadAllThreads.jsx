import axios from "axios";
import { BASE_URL } from '../../tools/utils.js';
import { useEffect, Fragment, useContext } from "react";
import { StoreContext } from '../../tools/context.js';
import { NavLink } from 'react-router-dom';
import { faTrashCan } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

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
                return (
                    (topic__id.topic__id === thread.topic__id) && (
                        <div className="thread" key={i}>
                            <NavLink to={`/thread/${thread.id}`}>
                                <h2>{thread.title}</h2>
                            </NavLink>
                            <button className='button--delete button--delete--reversed' onClick={() => deleteThread(thread.id)}>
                                <FontAwesomeIcon icon={faTrashCan} />
                            </button>
                        </div>
                    )
                );
            })}
        </Fragment>
    );
};

export default ReadAllthreads;
