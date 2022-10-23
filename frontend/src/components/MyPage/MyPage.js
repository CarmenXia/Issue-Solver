import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import "./MyPage.css";
import { showMe } from "../../dataHandling/userHandling";
import { deleteTicket } from "../../dataHandling/ticketHandling";
import { deleteIssue } from "../../dataHandling/issueHandling";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { title } from "process";
const MyPageCom = () => {
  const [myInfo, setMyInfo] = useState([]);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  const handleDeteleTicket = (ticketId) => {
    //console.log(ticketId);
    deleteTicket(ticketId).catch((err) => console.log(err));
    window.location.reload();
  };

  const handleDeteleIssue = (issueId) => {
    //console.log(ticketId);
    deleteIssue(issueId).catch((err) => console.log(err));
    window.location.reload();
  };

  useEffect(() => {
    showMe()
      .then((data) => {
        //console.log(data);
        setMyInfo(data);
      })
      .catch((error) => {
        console.log(error);
        setErr(err);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      {loading && (
        <p className='load'>
          <FontAwesomeIcon icon={faSpinner} />
          Fetching Data...
        </p>
      )}
      {err && alert(`There is a problem occurs while fetching data...${err}`)}
      <div className='ticket-cards'>
        {myInfo.tickets &&
          myInfo.tickets.map((ticket, key) => {
            return (
              <div className='ticket-card' key={key}>
                {ticket.title ? (
                  <h3 className='card-title'>Ticket: {ticket.title}</h3>
                ) : (
                  <h3 className='card-title'>" "</h3>
                )}
                {title.description ? (
                  <p className='card-content'>
                    {ticket.description.slice(0, 100)}...
                  </p>
                ) : (
                  <p className='card-content'></p>
                )}
                <div className='card-link'>
                  <Link
                    to='#'
                    className='detele-link'
                    onClick={() => handleDeteleTicket(ticket._id)}
                  >
                    detele
                  </Link>
                  <Link to={`/ticket/${ticket._id}`} className='detail-link'>
                    Detail
                  </Link>
                </div>
              </div>
            );
          })}
      </div>

      <div className='issue-cards'>
        {myInfo.issues &&
          myInfo.issues.map((issue, key) => {
            return (
              <div className='issue-card' key={key}>
                {issue.title ? (
                  <h3 className='card-title'>Issue: {issue.title}</h3>
                ) : (
                  <h3 className='card-title'>""</h3>
                )}
                {issue.body ? (
                  <p className='card-content'>{issue.body.slice(0, 100)}...</p>
                ) : (
                  <p className='card-content'>""</p>
                )}
                <div className='card-link'>
                  <Link
                    to='#'
                    className='detele-link'
                    onClick={() => handleDeteleIssue(issue._id)}
                  >
                    detele
                  </Link>
                  <Link to={`/issue/${issue._id}`} className='detail-link'>
                    Detail
                  </Link>
                </div>
              </div>
            );
          })}
      </div>
    </>
  );
};

export default MyPageCom;
