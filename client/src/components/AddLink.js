import React, { useRef } from 'react';

import classes from './AddLink.module.css';

function AddLink(props) {
  const titleRef = useRef('');
  const linkRef = useRef('');

  function submitHandler(event) {
    event.preventDefault();

    // could add validation here...

    const link = {
      title: titleRef.current.value,
      link: linkRef.current.value,
    };

    props.onAddLink(link);
  }

  return (
    <form onSubmit={submitHandler}>
      <div className={classes.control}>
        <label htmlFor='title'>Title</label>
        <input type='text' id='title' ref={titleRef} />
        <label htmlFor='link'>Link</label>
        <input type='text' id='link' ref={linkRef} />
      </div>
      <button>Add Link</button>
    </form>
  );
}

export default AddLink;