import React, { useRef } from "react";
import "./AddLink.scss";
import { addLink } from "../api/api";

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
  }

  return (
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
      <button>Add Link</button>
    </form>
  );
}

export default AddLink;
