import {deleteLink} from "../helpers/requests"

const openLinkHandler = (props) => {
    console.log("click!", props.link)
}

async function deleteLinkHandler(props) {
    return deleteLink(props.id)
}

const Link = (props) => {
    return (
        <li>
            <h3 onClick={() => openLinkHandler(props)}>{props.name}</h3>
            <h3 onClick={() => deleteLinkHandler(props)}>delete</h3>
        </li>
    )
}

export default Link;