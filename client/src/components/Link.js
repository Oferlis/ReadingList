const onClickHandler = (props) => {
    //window.open(props.link, '_blank', 'noopener,noreferrer');
    //NO!
}

const Link = (props) => {
    return (
        <li onClick={onClickHandler(props)}>
            <h2>{props.name}</h2>
        </li>
    )
}

export default Link;