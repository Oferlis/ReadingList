import React, { useRef } from 'react';
import './AddLink.scss'

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
    <form onSubmit={submitHandler}  className='container'>
      <div>
        <input type='text' id='title' ref={titleRef} placeholder='Enter title'/>
        <input type='text' id='link' ref={linkRef} placeholder='Enter Link'/>
      </div>
      <button>Add Link</button>
    </form>
  );
}

export default AddLink;