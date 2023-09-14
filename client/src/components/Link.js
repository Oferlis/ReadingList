import { useState } from "react";
import "./Link.scss";
import { updateLink, deleteLink } from "../api/api";

const openLinkHandler = (link) => {
  window.open(link);
};

async function deleteLinkHandler(props) {
  deleteLink(props.id);
  props.onDeleteItem(props.id);
}

const Link = (props) => {
  const [isChecked, setIsChecked] = useState(props.isRead);

  const handleCheckedBox = (id, isRead) => {
    updateLink(props.id, !isRead);

    setIsChecked(!isChecked);
  };

  return (
    <li className="link-item">
      <div className="">
        <input
          type="checkbox"
          onChange={() => handleCheckedBox(props.id, props.isRead)}
          checked={isChecked}
        />
      </div>
      <div
        className="w-4/6 whitespace-nowrap"
        onClick={() => openLinkHandler(props.link)}
      >
        {props.name}
      </div>
      <div className="link-tools">
        <img
          src="/images/checkbox-icon.svg"
          alt="Mark as read"
          onClick={() => handleCheckedBox(props.id, props.isRead)}
        />
        <img
          src="/images/delete-icon.svg"
          alt="Delete"
          onClick={() => deleteLinkHandler(props)}
        />
        <img src="/images/edit-icon.svg" alt="edit" />
      </div>
    </li>
  );
};

export default Link;
