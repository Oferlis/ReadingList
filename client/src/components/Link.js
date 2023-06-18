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
        <li className="rounded-xl my-2 px-4 py-2 flex place-content-around bg-white">
            <div className=''>
                <input type='checkbox' onChange={() => handleCheckedBox(props.id, props.isRead)} checked={isChecked}/>
            </div>
            <div className='w-4/6 whitespace-nowrap' onClick={() => openLinkHandler(props.link)}>{props.name}</div>
            <div className='w-1/6 flex flex-row h-6 place-content-between'>
                <img src='/images/checkbox-icon.svg' alt='Mark as read' onClick={() => handleCheckedBox(props.id, props.isRead)}/>
                <img src='/images/delete-icon.svg' alt='Delete' onClick={() => deleteLinkHandler(props.id)}/>
                <img src='/images/edit-icon.svg' alt='edit'/>
            </div>
        </li>
    )
}

export default Link;