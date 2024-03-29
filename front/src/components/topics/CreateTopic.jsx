import axios from "axios";
import { BASE_URL } from '../../tools/utils.js';
import { useState, useContext } from "react";
import { StoreContext } from '../../tools/context.js';

const CreateTopic = () => {
    const [state, dispatch] = useContext(StoreContext);
    const initialState = { title: '' };
    const [topicData, setTopicData] = useState(initialState);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTopicData({ ...topicData, [name]: value });
    };

    const submit = (e) => {
        e.preventDefault();
        axios.post(`${BASE_URL}/createTopic`, { title: topicData.title })
            .then(res => {
                console.log(res);
                dispatch({ type: "CREATE_TOPIC", payload: { id: res.data.newTopic.response.insertId, title: topicData.title } });
            });
        setTopicData(initialState);
    };


    return (
        <form onSubmit={submit} className="topic__creation">
            <label htmlFor="title">Create your topic</label>
            <div className="input_container">
                <input type='text' placeholder='title' name='title' onChange={handleChange} value={topicData.title} />
                <input className="button--submit" type='submit' value='Create topic'/>
            </div>
        </form>
    );
};

export default CreateTopic;
