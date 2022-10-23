import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { getIssueById } from "../../dataHandling/issueHandling";
import "./Issue.css";
import IssueUpdateModal from "../IssueUpdate/IssueUpdate";
import ReplyCreateModal from "../Reply/Reply";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

//Issue dateail page
//get issues info from DB
//edit modal (edit issue & create replies)
const Issue = () => {
  const params = useParams();
  const [err, setErr] = useState(null);
  const [loading, setLoading] = useState(true);
  const [issue, setIssue] = useState();

  //Get ticket info
  useEffect(() => {
    getIssueById(params.issueId)
      .then((res) => {
        setIssue(res);
        //console.log(res);
      })
      .catch((err) => setErr(err))
      .finally(() => {
        setLoading(false);
      });
  }, []);

  //issue update modal
  const [editIssueOpen, setEditIssueOpen] = useState(false);
  const handleEditIssueOpen = (e) => {
    e.preventDefault();
    setEditIssueOpen(true);
  };

  //reply create modal
  const [creteReplyOpen, setCreateReplyOpen] = useState(false);
  const handleReply = (e) => {
    e.preventDefault();
    setCreateReplyOpen(true);
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
          <h2 className='issue-title'>{issue.title}</h2>
          <button className='issue-edit' onClick={handleEditIssueOpen}>
            edit
          </button>
        </div>
        <IssueUpdateModal
          open={editIssueOpen}
          title={issue.title}
          body={issue.body}
          priority={issue.priority}
          status={issue.status}
        />
        <label htmlFor='belongTo'>BelongTo</label>
        {issue.belongTo === null ? null : (
          <input
            type='text'
            id='belongTo'
            readOnly
            defaultValue={issue.belongTo.title}
          />
        )}

        <label htmlFor='authorName'>Author</label>
        {issue.author === null ? null : (
          <input
            type='text'
            id='authorName'
            readOnly
            defaultValue={issue.author.username}
          />
        )}

        <label htmlFor='priority'>Priority</label>
        <input
          type='text'
          readOnly
          id='priority'
          defaultValue={issue.priority}
        />

        <label htmlFor='status'>Status</label>
        <input type='text' readOnly id='status' defaultValue={issue.status} />

        <label htmlFor='createdDate'>CreatedDate</label>
        <input
          type='text'
          readOnly
          id='createdDate'
          defaultValue={issue.createdAt.slice(0, 10)}
        />

        <label htmlFor='lastUpdateAt'>LastUpdate</label>
        <input
          readOnly
          type='date'
          name='LastUpdate'
          id='lastUpdateAt'
          value={issue.updatedAt.slice(0, 10)}
        />

        <label htmlFor='description'>Description</label>
        <textarea readOnly id='description' defaultValue={issue.body} />

        <div className='reply'>
          <label className='reply-label' htmlFor='replies'>
            Replies
          </label>
          <button className='issue-create' onClick={handleReply}>
            Create
          </button>
          <div className='reply-cards' id='replies'>
            {issue.replies &&
              issue.replies.map((reply) => {
                return (
                  <div className='reply-card'>
                    {reply.author === null ? null : (
                      <div className='reply-card-title'>
                        Replied by: {reply.author.username}
                      </div>
                    )}
                    <div className='reply-card-content'>{reply.content}</div>
                  </div>
                );
              })}
          </div>
        </div>
        <ReplyCreateModal open={creteReplyOpen} />
      </form>
    </div>
  );
};

export default Issue;
