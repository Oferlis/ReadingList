import {useState} from 'react'
import {deleteLink, markLinkAsRead} from "../helpers/requests"

const openLinkHandler = (link) => {
    window.open(link)
}

async function deleteLinkHandler(id) {
    return deleteLink(id)
}

const Link = (props) => {
    const [isChecked, setIsChecked] = useState(props.isRead)

    const handleCheckedBox = (id, isRead) => {
        props.onUpdate(!isRead, props.id)
        markLinkAsRead(id, isRead)
        setIsChecked(!isChecked)
    }

    return (
        <li className="table-row">
            <div className='col-3'>
                <input type='checkbox' onChange={() => handleCheckedBox(props.id, props.isRead)} checked={isChecked}/>
                <button onClick={() => deleteLinkHandler(props.id)}>Delete</button>
            </div>
            <div className='col-1' onClick={() => openLinkHandler(props.link)}>{props.name}</div>
        </li>
    )
}

export default Link;