import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./AllIssues.css";
import { getAllIssues, deleteIssue } from "../../dataHandling/issueHandling";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
//when click in the card show details
//delete button
const AllIssuesComp = () => {
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(null);

  //handle issue detail
  const openIssue = (issue) => {
    //console.log(issue);
  };

  //handle delete issue
  const handleDeteleIssue = (issueId) => {
    //console.log(ticketId);
    deleteIssue(issueId).catch((err) => console.log(err));
    window.location.reload();
  };

  useEffect(() => {
    getAllIssues()
      .then((res) => {
        setIssues(res);
        //console.log(res);
        setErr(null);
      })
      .catch((err) => setErr(err))
      .finally(() => {
        setLoading(false);
      });
  }, []);

  //cards:title(issue title)
  //subtitle(belongTo which ticket)
  //content: issue body
  //footer: edit button delete button
  //detail:when click on the card
  return (
    <>
      {loading && (
        <p className='load'>
          <FontAwesomeIcon icon={faSpinner} />
          Fetching Data...
        </p>
      )}
      {err && alert(`There is a problem occurs while fetching data...${err}`)}
      <h1 className='issue-list'>Issue Lists</h1>
      <div className='issue-cards'>
        {issues &&
          issues.map((issue, key) => {
            return (
              <div className='issue-card' key={key}>
                <h3 className='card-title'>{issue.title}</h3>
                {issue.belongTo === null ? (
                  <h4 className='card-subtitle'>" "</h4>
                ) : (
                  <h4 className='card-subtitle'>
                    Ticket: {issue.belongTo.title}
                  </h4>
                )}
                <p className='card-content'>{issue.body.slice(0, 60)}...</p>
                <div className='card-link'>
                  <Link
                    to='#'
                    className='detele-link'
                    onClick={() => handleDeteleIssue(issue._id)}
                  >
                    detele
                  </Link>
                  <Link
                    to={`/issue/${issue._id}`}
                    className='detail-link'
                    onClick={() => openIssue(issue)}
                  >
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

export default AllIssuesComp;
