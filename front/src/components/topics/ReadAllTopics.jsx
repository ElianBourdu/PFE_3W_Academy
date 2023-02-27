import axios from "axios";
import { BASE_URL } from '../../tools/utils.js';
import { useEffect, useState } from "react";
import { NavLink } from 'react-router-dom';

const ReadAllTopics = () => {
    const [topicsList, setTopicsList] = useState([]);

    useEffect(() => {
        if (topicsList.length === 0) {
            axios.get(`${BASE_URL}/readTopics`)
                .then(res => setTopicsList(res.data.allTopics))
                .catch(err => console.log(err));
        }
    }, [topicsList]);

    const deleteTopic = (id) => {
        axios.post(`${BASE_URL}/deleteTopic`, { id })
            .then(res => {
                console.log(res);
                setTopicsList(topicsList.filter(topic => topic.id !== id));
            })
            .catch(err => console.log(err));
    };

    return (
        <div>
            { topicsList.length === 0 && (<p>loading</p>)}
            {topicsList.map((topic, i) => {
                return(
                    <ul key={i}>
                        <li>title: <NavLink to={`/topic/${topic.id}`}>{topic.title}</NavLink></li>
                        <button onClick={() => deleteTopic(topic.id)}>X</button>
                    </ul>
                );
            })}
        </div>
    );
};

export default ReadAllTopics;