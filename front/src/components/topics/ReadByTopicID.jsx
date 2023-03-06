import { useParams } from "react-router-dom";
import {  useContext } from "react";
import { StoreContext } from '../../tools/context.js';
import CreateThread from '../threads/CreateThread';
import ReadAllThreads from '../threads/ReadAllThreads';

const ReadByTopicID = () => {
    const [state] = useContext(StoreContext);
    const { id } = useParams();
    const topic__id = parseInt(id, 10);
    const topic = state.topics.find(topic => topic.id === topic__id);
    const topicTitle = topic ? topic.title : "Unknown Topic";
    
    return (
        <div className = "topic">
            <h1>{topicTitle}</h1>
            <ReadAllThreads topic__id={topic__id}/>
            <CreateThread topic__id={topic__id}/>
        </div>
    );
};

export default ReadByTopicID;
