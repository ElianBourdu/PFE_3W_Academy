import { useParams } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../../tools/utils.js";
import { useState, useEffect, Fragment } from "react";

const UpdateMessage = () => {
    const { id } = useParams();
    const [message, setMessage] = useState();

    useEffect(() => {
        axios.post(`${BASE_URL}/readMessage`, { id })
            .then(res => setMessage(res.data.readMessage[0]))
            .catch(err => console.log(err));
    }, [id]);


    const handleChange = (e) => {
        const { name, value } = e.target;
        setMessage({ ...message, [name]: value });
    };

    const submit = (e) => {
        e.preventDefault();
        axios.post(`${BASE_URL}/updateMessage`, {content: message.content, id: id})
            .then(res => console.log('on submit :', res))
            .catch(err => console.log(err));
    };

    return (
        <Fragment>
            { !message && (<p>loading</p>)}
            { message && (
                <Fragment>
                    <form onSubmit={submit}>
                        <div>
                            <label htmlFor="content">content</label>
                            <textarea name='content' placeholder='content' onChange={handleChange} value={message.content}></textarea>
                        </div>
                        <input type='submit' />
                    </form>
                </Fragment>
            )}
        </Fragment>
    );
};

export default UpdateMessage;