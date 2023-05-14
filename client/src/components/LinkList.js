import Link from "./Link";


const LinkList = (props) => {
    return (
        <ul>
            {props.links.map((link)=>(
                <Link 
                id={link.id}
                name={link.name}
                link={link.link}/>
            ))}
        </ul>
    )
}

export default LinkList;