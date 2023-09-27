import { useState } from "react";
import "./Link.scss";
import { updateLink, deleteLink } from "../api/api";
import ToolsSidebar from "./ToolsSidebar";

const openLinkHandler = (link) => {
  window.open(link);
};

async function deleteLinkHandler(props) {
  deleteLink(props.id);
}

const Link = (props) => {
  const [isChecked, setIsChecked] = useState(props.isRead);

  const handleCheckedBox = () => {
    updateLink(props.id, !props.isRead);

    setIsChecked(!isChecked);
  };

  return (
    <li className="link-item">
      <div>
        <input
          type="checkbox"
          onChange={handleCheckedBox}
          checked={isChecked}
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
