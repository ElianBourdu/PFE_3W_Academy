import { useParams } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../../tools/utils.js";
import { useState, useEffect, Fragment } from "react";

const UpdateThread = () => {
    const { id } = useParams();
    const [thread, setThread] = useState();

    useEffect(() => {
        axios.post(`${BASE_URL}/readThread`, { id })
            .then(res => setThread(res.data.readThread[0]))
            .catch(err => console.log(err));
    }, [id]);


    const handleChange = (e) => {
        const { name, value } = e.target;
        setThread({ ...thread, [name]: value });
    };

    const submit = (e) => {
        e.preventDefault();
        axios.post(`${BASE_URL}/updateThread`, {title: thread.title, id: id})
            .then(res => console.log('on submit :', res))
            .catch(err => console.log(err));
    };

    return (
        <Fragment>
            { !thread && (<p>loading</p>)}
            { thread && (
                <Fragment>
                    <form onSubmit={submit}>
                        <div>
                            <label htmlFor="title">title</label>
                            <input type='text' name='title' placeholder='title' onChange={handleChange} value={thread.title} />
                        </div>
                        <input type='submit' />
                    </form>
                </Fragment>
            )}
        </Fragment>
    );
};

export default UpdateThread;