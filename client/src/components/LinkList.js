import Link from "./Link";
import './LinkList.scss'

const LinkList = (props) => {
    return (
        <ul className="responsive-table">
            {props.links.map((link)=>(
                <Link 
                    id={link.id}
                    name={link.name}
                    link={link.link}
                    isRead={link.isRead}
                    onUpdate={props.onUpdate} />
            ))}
        </ul>
    )
}

export default LinkList;