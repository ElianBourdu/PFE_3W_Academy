import { Fragment, useContext } from "react";
import { StoreContext } from '../tools/context.js';
import Button from "./Button";

const Home = () => {
    const [state, dispatch] = useContext(StoreContext);
    
    return (
        <Fragment>
            <Button onClick = {() => dispatch({ type: 'ADD' }) } content = "+" />
            <Button onClick = {() => dispatch({ type: 'REDUCE' }) } content = "-" />
            <p>{state.count}</p>
        </Fragment>
    );
};

export default Home;