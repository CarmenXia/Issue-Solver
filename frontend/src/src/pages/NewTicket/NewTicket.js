import React, { useState } from "react";
import "./NewTicket.css";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { createTicket } from "../../dataHandling/ticketHandling";
const NewTicket = () => {
  const today = new Date();
  const date =
    today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDay();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [status, setStatus] = useState("Open");
  const [priority, setPriority] = useState("");
  const [deadLine, setDeadLine] = useState("");
  const [description, setDescription] = useState("");

  function handleTitle(e) {
    setTitle(e.target.value);
  }

  function handleSatus(e) {
    setStatus(e.target.value);
  }

  function handlePriority(e) {
    setPriority(e.target.value);
  }

  function handleDeadLine(e) {
    setDeadLine(e.target.value);
  }

  function handleDescription(e) {
    setDescription(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    createTicket(title, status, priority, deadLine, description)
      .then((data) => {
        console.log(data);
        navigate("/tickets");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className='container'>
      <h1>Create a new ticket</h1>
      <form
        onSubmit={(e) => {
          handleSubmit(e);
        }}
      >
        <label htmlFor='title'>Title</label>
        <input
          type='text'
          placeholder='Title'
          autoComplete='off'
          id='title'
          name='title'
          required
          onChange={(e) => {
            handleTitle(e);
          }}
        />

        <label htmlFor='priority'>Priority</label>
        <select
          id='priority'
          name='priority'
          onChange={(e) => {
            handlePriority(e);
          }}
        >
          <option value=''>--Please select a priority level--</option>
          <option value='High'>High</option>
          <option value='Medium'>Medium</option>
          <option value='Low'>Low</option>
        </select>

        <label htmlFor='status'>Status</label>
        <select
          id='status'
          name='status'
          onChange={(e) => {
            handleSatus(e);
          }}
        >
          <option selected name='status' value='Open'>
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
          id='deadline'
          onChange={(e) => {
            handleDeadLine(e);
          }}
        />

        <label htmlFor='description'>Description</label>
        <textarea
          type='text'
          placeholder='Please describe the ticket here.'
          autoComplete='off'
          id='description'
          name='description'
          required
          onChange={(e) => {
            handleDescription(e);
          }}
        />

        <button>Submit</button>

        <span className='line'>
          <Link to='/tickets'>
            <a>Back to Tickets</a>
          </Link>
        </span>
      </form>
    </div>
  );
};

export default NewTicket;
