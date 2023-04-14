import axios from "axios";
import { BASE_URL } from '../../tools/utils.js';
import { useEffect, useContext } from "react";
import { StoreContext } from '../../tools/context.js';
import { NavLink } from 'react-router-dom';
import { faTrashCan, faThumbsDown, faThumbsUp } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

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
        <div className="message__container">
            { state.messages.length === 0 && (<p>loading</p>)}
            { state.messages.map((message, i) => {
                return (
                    ( message.thread__id === thread__id.thread__id &&
                        <div key={i} className="message">
                            <div className="message__publication-date">
                                <p>
                                    {new Date(message.publication_date).toLocaleString('fr-FR', {
                                        weekday: 'long',
                                        day: 'numeric',
                                        month: 'long',
                                        year: 'numeric',
                                        hour: 'numeric',
                                        second: 'numeric',
                                        hour12: false
                                    })}
                                </p>
                                <button className='button--delete' onClick={() => deleteMessage(message.id)}>
                                    <FontAwesomeIcon icon={faTrashCan} />
                                </button>
                            </div>
                            <div className="message__content">
                                {message.content}
                            </div>
                            <div className="message__vote">
                                <button onClick={() => handleVote({vote: 1, id: message.id})}>
                                    <FontAwesomeIcon icon={faThumbsUp} />
                                </button>
                                <div>{message.like_count}</div>
                                <button onClick={() => handleVote({vote: -1, id: message.id})}>
                                    <FontAwesomeIcon icon={faThumbsDown} />
                                </button>
                                <div>{message.dislike_count}</div>
                            </div>
                        </div>
                    )
                );
            })}
        </div>
    );
};

export default ReadAllMessages;
