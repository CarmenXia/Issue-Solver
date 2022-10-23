import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./AllTickets.css";
import { getAllTickets, deleteTicket } from "../../dataHandling/ticketHandling";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const AllTicketsComp = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(null);

  const navigate = useNavigate();

  //handle project detail
  const openTicket = (ticket) => {
    // console.log(ticket);
  };

  //handle delete project
  const handleDeteleTicket = (ticketId) => {
    //console.log(ticketId);
    deleteTicket(ticketId).catch((err) => console.log(err));
    window.location.reload();
  };
  useEffect(() => {
    getAllTickets()
      .then((res) => {
        setTickets(res);
        //console.log(res);
        setErr(null);
      })
      .catch((err) => setErr(err))
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div>
      {loading && (
        <p>
          <FontAwesomeIcon icon={faSpinner} />
          Fetching Data...
        </p>
      )}
      {err && alert(`There is a problem occurs while fetching data...${err}`)}
      <div className='allTicket-top'>
        <h1 className='ticket-list'>Ticket Lists</h1>
        <button className='ticket-create'>
          <Link to='/newTicket' className='create-button'>
            Create
          </Link>
        </button>
      </div>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Status</th>
            <th>Priority</th>
            <th>Description</th>
            <th>DeadLine</th>
            <th>Funtions</th>
          </tr>
        </thead>
        <tbody>
          {tickets &&
            tickets.map((ticket, key) => {
              return (
                <tr key={key}>
                  <td>{ticket.title}</td>
                  {ticket.author === null ? (
                    <td></td>
                  ) : (
                    <td>{ticket.author.username}</td>
                  )}
                  <td>{ticket.status}</td>
                  <td>{ticket.priority}</td>
                  <td>{ticket.description}</td>
                  <td>{ticket.deadLine.slice(0, 10)}</td>
                  <td>
                    <Link
                      to='#'
                      onClick={() => handleDeteleTicket(ticket._id)}
                      className='ticket-detele-link'
                    >
                      Delete
                    </Link>
                    <Link
                      to={`/ticket/${ticket._id}`}
                      onClick={() => openTicket(ticket)}
                      className='ticket-detail-link'
                    >
                      | Detail
                    </Link>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};

export default AllTicketsComp;
