import { Fragment, useContext } from "react";
import { StoreContext } from '../tools/context.js';
import ReadAllTopics from './topics/ReadAllTopics';
import CreateTopic from './topics/CreateTopic';

const Home = () => {
    const [state] = useContext(StoreContext);
    
    return (
        <div className="topic__container">
            <ReadAllTopics />
            { state.user.isAdmin && <CreateTopic />}
        </div>
    );
};

export default Home;