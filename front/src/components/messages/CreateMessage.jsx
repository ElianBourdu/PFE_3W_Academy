import axios from "axios";
import { BASE_URL } from '../../tools/utils.js';
import { useState, useContext } from "react";
import { StoreContext } from '../../tools/context.js';

const CreateMessage = (thread__id) => {
    const [state, dispatch] = useContext(StoreContext);
    const initialState = { content: '' };
    const [messageData, setMessageData] = useState(initialState);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setMessageData({ ...messageData, [name]: value });
    };

    const submit = (e) => {
        e.preventDefault();
        axios
            .post(`${BASE_URL}/createMessage`, {
                user__id: state.user.id,
                thread__id: thread__id.thread__id,
                content: messageData.content
            })
            .then(res => {
                console.log(res);
                dispatch({
                    type: "CREATE_MESSAGE",
                    payload: {
                        user__id: state.user.id,
                        thread__id: thread__id.thread__id,
                        quoted_message__id: null,
                        content: messageData.content,
                        publication_date: new Date(),
                        like_count: 0,
                        dislike_count: 0
                    }
                });
                setMessageData(initialState);
            });
    };

    return (
        <form onSubmit={submit}>
            <textarea placeholder='type your message' name='content' onChange={handleChange} value={messageData.content}></textarea>
            <input type='submit' />
        </form>
    );
};

export default CreateMessage;
