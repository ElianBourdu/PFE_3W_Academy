import { Fragment, useContext } from "react";
import { StoreContext } from '../tools/context.js';
import ReadAllTopics from './topics/ReadAllTopics';
import CreateTopic from './topics/CreateTopic';

const Home = () => {
    const [state] = useContext(StoreContext);
    
    return (
        <Fragment>
            <ReadAllTopics />
            { state.user.isAdmin && <CreateTopic />}
        </Fragment>
    );
};

export default Home;