import Link from "./Link";
import "./LinkList.scss";

const LinkList = (props) => {
  return (
    <ul className="responsive-table">
      {props.links.map((link) => (
        <Link
          key={Math.random()}
          id={link.id}
          name={link.name}
          link={link.link}
          isRead={link.isRead}
          onUpdate={props.onUpdate}
          onDelete={props.onDelete}
        />
      ))}
    </ul>
  );
};

export default LinkList;
