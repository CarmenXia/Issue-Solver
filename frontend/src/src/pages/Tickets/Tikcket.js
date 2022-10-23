import React, { useState, useEffect } from "react";
import "./Ticket.css";
import { Link, useParams } from "react-router-dom";
import { getTicketId } from "../../dataHandling/ticketHandling";
import { removeMember } from "../../dataHandling/ticketHandling";
import AddMemberModal from "../AddMembers/AddMembers";
import TicketUpdateModal from "../TicketUpdate/TicketUpdate";
import NewIssueModal from "../NewIssue/NewIssue";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Ticket = () => {
  const params = useParams();
  const [loading, setLoading] = useState(true);
  const [ticket, setTicket] = useState();

  //Get ticket info
  useEffect(() => {
    getTicketId(params.ticketId)
      .then((res) => {
        setTicket(res);
        //console.log(res);
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setLoading(false);
      });
  }, []);

  //ticket update modal
  const [editTicketOpen, setEditTicketOpen] = useState(false);
  const handleEditTicketOpen = (e) => {
    e.preventDefault();
    setEditTicketOpen(true);
  };

  //issueModal
  const [newIssueOpen, setNewIssueOpen] = useState(false);
  const handleNewIssueOpen = (e) => {
    e.preventDefault();
    setNewIssueOpen(true);
  };

  //addMemberModal
  const [addMemberOpen, setAddMemberOpen] = useState(false);
  const handleAddMemberOpen = (e) => {
    e.preventDefault();
    setAddMemberOpen(true);
  };

  //handle delete ticket members
  const handleDeteleMembers = (memberId) => {
    // console.log(memberId);
    let id = params.ticketId;
    //console.log(id);
    removeMember(id, { _id: memberId })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err))
      .finally(() => {
        window.location.reload();
      });
  };

  //Close all Modals
  const handleClose = () => {
    setAddMemberOpen(false);
  };

  return loading ? (
    <p className='load'>
      <FontAwesomeIcon icon={faSpinner} />
      Fetching Data...
    </p>
  ) : (
    <div className='container'>
      <form>
        <div className='top'>
          <h1 className='title'>{ticket.title}</h1>
          <button className='edit' onClick={handleEditTicketOpen}>
            edit
          </button>
        </div>
        <TicketUpdateModal
          open={editTicketOpen}
          title={ticket.title}
          status={ticket.status}
          deadLine={ticket.deadLine}
          description={ticket.description}
          ticketId={params.ticketId}
        />
        <label htmlFor='authorName'>Author</label>
        {ticket.author === null ? null : (
          <input
            type='text'
            id='authorName'
            readOnly
            defaultValue={ticket.author.username}
          />
        )}
        <div className='members'>
          <label htmlFor='members'>Members</label>
          <button className='add-member-button' onClick={handleAddMemberOpen}>
            + Add Member
          </button>

          <AddMemberModal
            open={addMemberOpen}
            ticketId={params.ticketId}
            handleClose={() => {
              setAddMemberOpen(false);
            }}
          />

          {ticket.members &&
            ticket.members.map((member) => (
              <div className='members-chip' key={member._id}>
                <div className='chip' key={member._id}>
                  {member.username}
                  <span
                    className='deletebtn'
                    onClick={() => handleDeteleMembers(member._id)}
                  >
                    &times;
                  </span>
                </div>
              </div>
            ))}
        </div>

        <label htmlFor='priority'>Priority</label>
        <input
          type='text'
          readOnly
          id='priority'
          defaultValue={ticket.priority}
        />

        <label htmlFor='status'>Status</label>
        <input type='text' readOnly id='status' defaultValue={ticket.status} />

        <label htmlFor='createdDate'>CreatedDate</label>
        <input
          type='text'
          readOnly
          id='createdDate'
          defaultValue={ticket.createdAt.slice(0, 10)}
        />

        <label htmlFor='deadline'>Deadline</label>
        <input
          type='date'
          readOnly
          id='deadline'
          value={ticket.deadLine.slice(0, 10)}
        />
        <label htmlFor='lastUpdateAt'>LastUpdate</label>
        <input
          readOnly
          type='date'
          name='LastUpdate'
          id='lastUpdateAt'
          value={ticket.updatedAt.slice(0, 10)}
        />

        <label htmlFor='description'>Description</label>
        <textarea readOnly id='description' defaultValue={ticket.description} />

        <div className='issue'>
          <label className='issue-label' htmlFor='issues'>
            Issue
          </label>
          <input type='text' className='searchTerm' placeholder='Search' />
          <button className='create' onClick={handleNewIssueOpen}>
            Create
          </button>
          <NewIssueModal open={newIssueOpen} ticketId={params.ticketId} />
        </div>
        {ticket.issues &&
          ticket.issues.map((issue) => {
            return (
              <div className='issue-display' id='issue'>
                <Link to={`/issue/${issue._id}`} id='issue-link'>
                  <span className='issue-display-title'>{issue.title}</span>
                  <span className='issue-display-status'>◉ {issue.status}</span>
                </Link>
              </div>
            );
          })}
      </form>
    </div>
  );
};

export default Ticket;
