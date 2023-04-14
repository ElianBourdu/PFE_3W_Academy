import axios from "axios";
import { BASE_URL } from '../../tools/utils.js';
import { useEffect, useContext, Fragment } from "react";
import { NavLink } from 'react-router-dom';
import { StoreContext } from '../../tools/context.js';
import CreateThread from '../threads/CreateThread';
import ReadAllThreads from '../threads/ReadAllThreads';
import { faTrashCan } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const ReadAllTopics = () => {
    const [state, dispatch] = useContext(StoreContext);

    useEffect(() => {
        if (state.topics.length === 0) {
            axios.get(`${BASE_URL}/readTopics`)
                .then(res => {
                    dispatch({ type: "READ_ALL_TOPICS", payload: res.data.allTopics });
                })
                .catch(err => console.log(err));
        }
    }, [state.topics, state.threads]);

    const deleteTopic = (id) => {
        axios.post(`${BASE_URL}/deleteTopic`, { id })
            .then(res => {
                console.log(res);
                dispatch({
                    type: "DELETE_THREAD",
                    payload: state.threads.filter(thread => thread.topic__id !== id)
                });
                dispatch({
                    type: "DELETE_TOPIC",
                    payload: state.topics.filter(topic => topic.id !== id)
                });
            })
            .catch(err => console.log(err));
    };

    return (
        <Fragment>
            { state.topics.length === 0 && (<p>loading</p>)}
            {state.topics.map((topic, i) => {
                return(
                    <div className="topic" key={i}>
                        <div className="topic__title">
                            <NavLink className="button button--link" to={`/topic/${topic.id}`}>{topic.title}</NavLink>
                            { state.user.admin && 
                            <button className='button--delete' onClick={() => deleteTopic(topic.id)}>
                                <FontAwesomeIcon icon={faTrashCan} />
                            </button> }
                        </div>
                        <div className="thread__container">
                            <ReadAllThreads topic__id={topic.id}/>
                            <CreateThread topic__id={topic.id}/>
                        </div>
                    </div>
                );
            })}
        </Fragment>
    );
};

export default ReadAllTopics;
