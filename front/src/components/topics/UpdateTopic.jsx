import { useParams } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../../tools/utils.js";
import { useState, useEffect, Fragment } from "react";

const UpdateTopic = () => {
    const { id } = useParams();
    const [topic, setTopic] = useState();

    useEffect(() => {
        axios.post(`${BASE_URL}/readTopic`, { id })
            .then(res => setTopic(res.data.readTopic[0]))
            .catch(err => console.log(err));
    }, [id]);


    const handleChange = (e) => {
        const { name, value } = e.target;
        setTopic({ ...topic, [name]: value });
    };

    const submit = (e) => {
        e.preventDefault();
        axios.post(`${BASE_URL}/updateTopic`, {title: topic.title, id: id})
            .then(res => console.log('on submit :', res))
            .catch(err => console.log(err));
    };

    return (
        <Fragment>
            { !topic && (<p>loading</p>)}
            { topic && (
                <Fragment>
                    <form onSubmit={submit}>
                        <div>
                            <label htmlFor="title">title</label>
                            <input type='text' name='title' placeholder='title' onChange={handleChange} value={topic.title} />
                        </div>
                        <input type='submit' />
                    </form>
                </Fragment>
            )}
        </Fragment>
    );
};

export default UpdateTopic;