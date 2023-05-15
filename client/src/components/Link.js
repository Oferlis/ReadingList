import {deleteLink, markLinkAsRead} from "../helpers/requests"

const openLinkHandler = (link) => {
    window.open(link)
}

async function deleteLinkHandler(id) {
    return deleteLink(id)
}

async function readLinkHandler(id, isRead) {
    return markLinkAsRead(id, isRead)
}


const Link = (props) => {
    return (
        <li className="table-row">
            <div className='col-1' onClick={() => openLinkHandler(props.link)}>{props.name}</div>
            <div className='col-2'>
                {props.isRead?.toString()}
            </div>
            <div className='col-3'>
                <button onClick={() => readLinkHandler(props.id, props.isRead)}>{props.isRead ? 'Mark as unread' : 'Mark as read'}</button>
                <button onClick={() => deleteLinkHandler(props.id)}>Delete</button>
            </div>
        </li>
    )
}

export default Link;