import { Fragment, useContext } from "react";
// import { StoreContext } from '../tools/context.js';
import ReadAllTopics from './topics/ReadAllTopics';
import CreateTopic from './topics/CreateTopic';

const Home = () => {
    // const [state, dispatch] = useContext(StoreContext);
    
    return (
        <Fragment>
            <CreateTopic />
            <ReadAllTopics />
        </Fragment>
    );
};

export default Home;