import "./Link.scss";
import { deleteLink } from "../api/api";
import ToolsSidebar from "./ToolsSidebar";

const openLinkHandler = (link) => {
  window.open(link);
};

async function deleteLinkHandler(props) {
  deleteLink(props.id);
  // updateList()
}

const Link = (props) => {
  const handleCheckedBox = () => {
    props.onUpdate(!props.isRead, props.id);
  };

  console.log(props);
  return (
    <li className="link-item" key={props.id}>
      <div>
        <input
          type="checkbox"
          onChange={handleCheckedBox}
          checked={props.isRead}
        />
      </div>
      <div
        className="w-4/6 whitespace-nowrap"
        onClick={() => openLinkHandler(props.link)}
      >
        {props.name}
      </div>
      <ToolsSidebar
        onDelete={() => deleteLinkHandler(props)}
        onCheckBox={() => handleCheckedBox(props)}
      />
    </li>
  );
};

export default Link;
