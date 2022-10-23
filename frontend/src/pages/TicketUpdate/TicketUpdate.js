import React, { useState } from "react";
import "./Update.css";
import { useParams } from "react-router-dom";
import { updataTicket } from "../../dataHandling/ticketHandling";

const TicketUpdateModal = (props) => {
  const params = useParams();

  //update main ticket
  const [title, setTitle] = useState(props.title);
  const [priority, setPriority] = useState(props.priority);
  const [status, setStatus] = useState(props.status);
  const [deadLine, setDeadLine] = useState(props.deadLine);
  const [description, setDescription] = useState(props.description);

  function handleTicketTitle(e) {
    setTitle(e.target.value);
  }

  function handlePriority(e) {
    setPriority(e.target.value);
  }
  function handleStatus(e) {
    setStatus(e.target.value);
  }

  function handleDeadLine(e) {
    setDeadLine(e.target.value);
  }

  function handleDescription(e) {
    setDescription(e.target.value);
  }
  const handleCancel = () => {
    window.location.reload();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      updataTicket(params.ticketId, {
        title: title,
        priority: priority,
        status: status,
        deadLine: deadLine,
        description: description,
      }).then((data) => console.log(data));
    } catch (error) {
      console.log(error);
    } finally {
      window.location.reload();
    }
  };

  return (
    <div className={props.open ? "overlay" : ""}>
      <div className={props.open ? "update-form show" : "update-form"}>
        <h3>Update ticket</h3>
        <div className='title-priority'>
          <label htmlFor='title'>Title</label>
          <input
            type='text'
            placeholder='Title'
            autoComplete='off'
            id='title'
            name='title'
            required
            className='form-title'
            onChange={handleTicketTitle}
            value={title}
          />

          <label htmlFor='priority'>Priority</label>
          <select
            id='priority'
            onChange={handlePriority}
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
        </div>
        <div className='status-deadLine'>
          <label htmlFor='status'>Status</label>
          <select id='status' onChange={handleStatus}>
            <option name='status' value='Open'>
              Open
            </option>
            <option name='status' value='In progress'>
              In progress
            </option>
            <option name='status' value='Completed'>
              Completed
            </option>
          </select>

          <label htmlFor='deadline'>Deadline</label>
          <input
            type='date'
            name='deadline'
            id='deadline'
            value={deadLine.slice(0, 10)}
            onChange={handleDeadLine}
          />
        </div>
        <label htmlFor='description'>Description</label>
        <textarea
          type='text'
          placeholder='Please describe the ticket here.'
          autoComplete='off'
          id='description'
          name='description'
          required
          onChange={handleDescription}
          value={description}
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

export default TicketUpdateModal;
