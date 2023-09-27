const ToolsSidebar = ({ onCheckeBox, onDelete }) => {
  return (
    <div className="link-tools">
      <img
        src="/images/checkbox-icon.svg"
        alt="Mark as read"
        onClick={onCheckeBox}
      />
      <img src="/images/delete-icon.svg" alt="Delete" onClick={onDelete} />
      <img src="/images/edit-icon.svg" alt="edit" />
    </div>
  );
};

export default ToolsSidebar;
