import React, { useState } from "react";
import "./IssueUpdate.css";
import { useParams } from "react-router-dom";
import { updateIssue } from "../../dataHandling/issueHandling";

const IssueUpdateModal = (props) => {
  const params = useParams();

  //update main issue
  const [title, setTitle] = useState(props.title);
  const [priority, setPriority] = useState(props.priority);
  const [status, setStatus] = useState(props.status);
  const [body, setBody] = useState(props.body);

  function handleIssueTitle(e) {
    setTitle(e.target.value);
  }
  function handleIssuePriority(e) {
    setPriority(e.target.value);
  }
  function handleIssueStatus(e) {
    setStatus(e.target.value);
  }
  function handleIssueBody(e) {
    setBody(e.target.value);
  }

  const handleCancel = () => {
    window.location.reload();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      updateIssue(params.issueId, {
        title: title,
        priority: priority,
        status: status,
        body: body,
      }).then((data) => console.log(data));
    } catch (error) {
      console.log(error);
    } finally {
      window.location.reload();
    }
  };

  return (
    <div className={props.open ? "overlay" : ""}>
      <div
        className={props.open ? "issue-update-form show" : "issue-update-form"}
      >
        <h2>Update Issue</h2>
        <div>
          <label htmlFor='title'>Title</label>
          <input
            type='text'
            placeholder='Title'
            autoComplete='off'
            id='title'
            name='title'
            className='form-title'
            onChange={handleIssueTitle}
            value={title}
          />

          <label htmlFor='priority'>Priority</label>
          <select
            id='priority'
            onChange={handleIssuePriority}
            className='form-priority'
            value={priority}
          >
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
          <select id='status' onChange={handleIssueStatus}>
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
        </div>
        <label htmlFor='body'>Description</label>
        <textarea
          type='text'
          placeholder='Please describe the Issue here.'
          autoComplete='off'
          id='body'
          name='body'
          className='body'
          onChange={handleIssueBody}
          value={body}
        />
        <div>
          <button className='ticket-update-cancel' onClick={handleCancel}>
            Cancel
          </button>
          <button className='ticket-update-submit' onClick={handleSubmit}>
            Update
          </button>
        </div>
      </div>
    </div>
  );
};

export default IssueUpdateModal;
