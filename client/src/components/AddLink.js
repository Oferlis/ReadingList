import React, { useRef } from "react";
import "./AddLink.scss";

function AddLink(props) {
  const titleRef = useRef("");
  const linkRef = useRef("");

  function submitHandler(event) {
    event.preventDefault();

    const link = {
      name: titleRef.current.value,
      link: linkRef.current.value,
    };

    props.onAddLink(link);

    event.target.reset();
  }

  return (
    <>
      <form onSubmit={submitHandler} className="container">
        <div>
          <input
            type="text"
            id="title"
            ref={titleRef}
            placeholder="Enter title"
          />
          <input type="text" id="link" ref={linkRef} placeholder="Enter Link" />
        </div>
        <button type="submit">Add Link</button>
      </form>
      <button onClick={props.onFetchLinks} className="fetch-button">
        Fetch Links
      </button>
    </>
  );
}

export default AddLink;
