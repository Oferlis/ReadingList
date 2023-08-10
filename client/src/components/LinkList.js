import Link from "./Link";
import "./LinkList.scss";

const LinkList = (props) => {
  return (
    <ul className="responsive-table">
      {props.links.map((link) => (
        <Link
          key={link.id}
          id={link.id}
          name={link.name}
          link={link.link}
          isRead={link.isRead}
          onUpdate={props.onUpdate}
          onDeleteItem={props.onDeleteItem}
        />
      ))}
    </ul>
  );
};

export default LinkList;
