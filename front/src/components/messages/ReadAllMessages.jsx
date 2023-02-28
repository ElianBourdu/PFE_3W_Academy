import axios from "axios";
import { BASE_URL } from '../../tools/utils.js';
import { useEffect, useState } from "react";
import { NavLink } from 'react-router-dom';

const ReadAllMessages = () => {
    const [messagesList, setMessagesList] = useState([]);

    useEffect(() => {
        if (messagesList.length === 0) {
            axios.get(`${BASE_URL}/readMessages`)
                .then(res => setMessagesList(res.data.allMessages))
                .catch(err => console.log(err));
        }
    }, [messagesList]);

    const deleteMessage = (id) => {
        axios.post(`${BASE_URL}/deleteMessage`, { id })
            .then(res => {
                console.log(res);
                setMessagesList(messagesList.filter(message => message.id !== id));
            })
            .catch(err => console.log(err));
    };

    return (
        <div>
            { messagesList.length === 0 && (<p>loading</p>)}
            {messagesList.map((message, i) => {
                return(
                    <ul key={i}>
                        <li>message: <NavLink to={`/Message/${message.id}`}>{message.content}</NavLink></li>
                        <button onClick={() => deleteMessage(message.id)}>X</button>
                    </ul>
                );
            })}
        </div>
    );
};

export default ReadAllMessages;