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

    const handleVote = ({ vote, id }) => {
        axios.post(`${BASE_URL}/voteMessage`, { vote, id })
            .then(res => {
                console.log(res);
                dispatch({
                    type: "VOTE",
                    payload: state.messages.filter(message => message.id !== id)
                });
            })
            .catch(error => {
                console.log(error);
            });
    }

    return (
        <div>
            { state.messages.length === 0 && (<p>loading</p>)}
            { state.messages.map((message, i) => {
                return (
                    ( message.thread__id === thread__id.thread__id &&
                        <div key={i}>
                            message :
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
                            <div>like count : {message.like_count}</div>
                            <div>dislike count : {message.dislike_count}</div>
                            <button onClick={() => handleVote({vote: 1, id: message.id})}>Like</button>
                            <button onClick={() => handleVote({vote: -1, id: message.id})}>Dislike</button>
                        </div>
                    )
                );
            })}
        </div>
    );
};

export default ReadAllMessages;
