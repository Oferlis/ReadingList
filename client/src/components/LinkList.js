import Link from "./Link";
import "./LinkList.scss";

const LinkList = (props) => {
  return (
    <ul className="responsive-table">
      {props.links.map(
        (link) =>
          console.log(link) || (
            <Link
              key={Math.random()}
              id={link._id}
              name={link.name}
              link={link.link}
              isRead={link.isRead}
              onUpdate={props.onUpdate}
              onDelete={props.onDelete}
            />
          )
      )}
    </ul>
  );
};

export default LinkList;
