import axios from "axios";
import { BASE_URL } from '../../tools/utils.js';
import { useEffect, Fragment, useContext } from "react";
import { StoreContext } from '../../tools/context.js';
import { NavLink } from 'react-router-dom';

const ReadAllMessages = (thread__id) => {
    const [state, dispatch] = useContext(StoreContext);

    useEffect(() => {
        if (state.messages.length === 0) {
            axios.get(`${BASE_URL}/readMessages`)
                .then(res => {
                    dispatch({ type: "READ_ALL_MESSAGES", payload: res.data.allMessages });
                })
                .catch(err => console.log(err));
        }
    }, [state.messages]);

    const deleteMessage = (id) => {
        axios.post(`${BASE_URL}/deleteMessage`, { id })
            .then(res => {
                console.log(res);
                dispatch({
                    type: "DELETE_MESSAGE",
                    payload: state.messages.filter(message => message.id !== id)
                });
            })
            .catch(err => console.log(err));
    };

    return (
        <div>
            { state.messages.length === 0 && (<p>loading</p>)}
            { state.messages.map((message, i) => {
                return (
                    ( message.thread__id === thread__id.thread__id &&
                        <ul key={i}>
                            <li>message :
                                <NavLink to={`/Message/${message.id}`}>{message.content}</NavLink>
                                <button onClick={() => deleteMessage(message.id)}>X</button>
                                publication date : 
                                {new Date(message.publication_date).toLocaleString('fr-FR', {
                                    weekday: 'long',
                                    day: 'numeric',
                                    month: 'long',
                                    year: 'numeric',
                                    hour: 'numeric',
                                    minute: 'numeric',
                                    second: 'numeric',
                                    hour12: false
                                })}
                            </li>
                        </ul>
                    )
                );
            })}
        </div>
    );
};

export default ReadAllMessages;
