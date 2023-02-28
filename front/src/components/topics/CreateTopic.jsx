import axios from "axios";
import { BASE_URL } from '../../tools/utils.js';
import { useState } from "react";

const CreateTopic = () => {
    const initialState = { title: ''};

    const [topicData, setTopicData] = useState(initialState);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTopicData({ ...topicData, [name]: value });
    };

    const submit = (e) => {
        e.preventDefault();
        axios.post(`${BASE_URL}/createTopic`, { title: topicData.title })
        .then(res => console.log(res));
        setTopicData(initialState);
    };


    return (
        <form onSubmit={submit}>
            <input type='text' placeholder='title' name='title' onChange={handleChange} value={topicData.title} />
            <input type='submit' />
        </form>
    );
};

export default CreateTopic;
