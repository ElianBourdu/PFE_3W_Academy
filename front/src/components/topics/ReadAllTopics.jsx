import axios from "axios";
import { BASE_URL } from '../../tools/utils.js';
import { useEffect, useContext, Fragment } from "react";
import { NavLink } from 'react-router-dom';
import { StoreContext } from '../../tools/context.js';
import CreateThread from '../threads/CreateThread';
import ReadAllThreads from '../threads/ReadAllThreads';

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
                    <div key={i}>
                        <div className = "topic">
                            <li>title: <NavLink to={`/topic/${topic.id}`}>{topic.title}</NavLink></li>
                            { state.user.admin && <button onClick={() => deleteTopic(topic.id)}>X</button>}
                        </div>
                        <ReadAllThreads topic__id={topic.id}/>
                        <CreateThread topic__id={topic.id}/>
                    </div>
                );
            })}
        </Fragment>
    );
};

export default ReadAllTopics;
