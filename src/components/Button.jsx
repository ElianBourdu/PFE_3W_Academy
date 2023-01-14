const Button = (props) => {
    return (
        <button onClick={() => props.onClick()}>{props.content}</button>
    );
};

export default Button;