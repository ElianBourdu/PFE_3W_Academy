import { useParams } from "react-router-dom";
import {  useContext } from "react";
import { StoreContext } from '../../tools/context.js';
import CreateMessage from '../messages/CreateMessage';
import ReadAllMessages from '../messages/ReadAllMessages';

const ReadByThreadID = () => {
    const [state] = useContext(StoreContext);
    const { id } = useParams();
    const thread__id = parseInt(id, 10);
    const thread = state.threads.find(thread => thread.id === thread__id);
    const threadTitle = thread ? thread.title : "Unknown Thread";
    
    return (
        <div className = "thread">
            <h1>{threadTitle}</h1>
            <ReadAllMessages thread__id={thread__id}/>
            <CreateMessage thread__id={thread__id}/>
        </div>
    );
};

export default ReadByThreadID;
