import "./NewIssue.css";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { createIssue } from "../../dataHandling/issueHandling";

//create the new issue from the create button in the
//ticket editpage
const NewIssueModal = (props) => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [priority, setPriority] = useState("");
  const [status, setStatus] = useState("");
  const params = useParams();

  function handleTitle(e) {
    setTitle(e.target.value);
  }
  function handleBody(e) {
    setBody(e.target.value);
  }

  function handlePriority(e) {
    setPriority(e.target.value);
  }
  function handleStatus(e) {
    setStatus(e.target.value);
  }
  const handleCancel = () => {
    //navigate(`/ticket/${props.ticketId}`);
    window.location.reload();
  };

  async function handleAddIssue(e) {
    e.preventDefault();
    try {
      createIssue({
        title: title,
        body: body,
        priority: priority,
        belongTo: params.ticketId,
        status: status,
      }).then((data) => console.log(data));
    } catch (error) {
      console.log(error);
    }
    window.location.reload();
  }

  return (
    <div className={props.open ? "overlay" : ""}>
      <div className={props.open ? "issue-form show" : "issue-form"}>
        <h3>Create a new issue</h3>
        <label htmlFor='title'>Issue Title</label>
        <input
          type='text'
          placeholder='Title'
          autoComplete='off'
          id='title'
          name='title'
          onChange={handleTitle}
        />

        <label htmlFor='priority'>Priority</label>
        <select
          id='priority'
          name='priority'
          onChange={handlePriority}
          value={priority}
        >
          <option value=''>--Please select a priority level--</option>
          <option name='priority' value='High'>
            High
          </option>
          <option name='priority' value='Medium'>
            Medium
          </option>
          <option name='priority' value='Low'>
            Low
          </option>
        </select>

        <label htmlFor='status'>Status</label>
        <select
          id='status'
          name='status'
          onChange={handleStatus}
          value={status}
        >
          <option name='status' value='Open'>
            Open
          </option>
          <option name='status' value='In progress'>
            In progress
          </option>
          <option name='status' value='Solved'>
            Solved
          </option>
        </select>
        <label htmlFor='body'>Description</label>
        <textarea
          type='text'
          placeholder='Please describe the issue here.'
          autoComplete='off'
          id='body'
          name='body'
          className='issue-body'
          onChange={handleBody}
        />
        <div>
          <button className='isuue-cancel-btn' onClick={handleCancel}>
            Cancel
          </button>
          <button onClick={handleAddIssue} className='issue-submit-btn'>
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewIssueModal;
