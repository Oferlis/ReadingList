import "./Link.scss";
import ToolsSidebar from "./ToolsSidebar";

const openLinkHandler = (link) => {
  window.open(link);
};

async function deleteLinkHandler(props) {
  console.log(props);
  props.onDelete(props.id);
}

const Link = (props) => {
  const handleCheckedBox = () => {
    props.onUpdate(!props.isRead, props.id);
  };

  return (
    <li className="link-item">
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
