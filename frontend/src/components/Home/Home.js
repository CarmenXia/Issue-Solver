import React, { useState, useEffect } from "react";
import { getAllTickets } from "../../dataHandling/ticketHandling";
import { faSearch, faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Home.css";
import { useNavigate } from "react-router-dom";
import { showMe } from "../../dataHandling/userHandling";

//search
const HomeComp = () => {
  const [tickets, setTickets] = useState([]);
  const [ticketId, setTicketId] = useState(null);
  const [loading, setLoading] = useState();
  const [myName, setMyName] = useState("");
  const navigate = useNavigate();

  const handleTicket = (e) => {
    setTicketId(e.target.value);
    //console.log(e.target.value);
    setLoading(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/ticket/${ticketId}`);
  };

  useEffect(() => {
    getAllTickets()
      .then((data) => {
        // console.log(data);
        setTickets(data);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    showMe().then((data) => {
      setMyName(data.username);
    });
  }, []);

  return (
    <div className='container'>
      {myName ? <h1 className='myname'> Welcom {myName}!</h1> : null}
      <div className='home-title'>
        <h1>Search a tikcet to start!</h1>
      </div>
      {loading ? (
        <p className='load'>
          <FontAwesomeIcon icon={faSpinner} />
          Fetching Data...
        </p>
      ) : (
        <div id='wrap'>
          <div id='search'>
            <select
              id='ticket-search'
              className='ticket-select'
              name='ticket'
              onChange={handleTicket}
              value={ticketId}
            >
              <option value=''></option>
              {tickets &&
                tickets.map((ticket) => {
                  return (
                    <option key={ticket._id} value={ticket._id}>
                      {ticket.title}
                    </option>
                  );
                })}
            </select>
            <button
              type='submit'
              className='searchButton'
              onClick={handleSubmit}
            >
              <FontAwesomeIcon icon={faSearch} className='home-search' />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomeComp;
