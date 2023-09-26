import React, { useRef } from "react";
import "./AddLink.scss";
import { addLink, getLinks } from "../api/api";

function AddLink() {
  const titleRef = useRef("");
  const linkRef = useRef("");

  function submitHandler(event) {
    event.preventDefault();

    // could add validation here...

    const link = {
      name: titleRef.current.value,
      link: linkRef.current.value,
    };

    addLink(link);
    titleRef.current.value = "";
    linkRef.current.value = "";
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
      <button onClick={getLinks} className="fetch-button">
        Fetch Links
      </button>
    </>
  );
}

export default AddLink;
