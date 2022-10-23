import React, { useState } from "react";
import { useParams } from "react-router-dom";
import "./Reply.css";
import { createReply } from "../../dataHandling/replyHandling";

const ReplyCreateModal = (props) => {
  const params = useParams();
  const [content, setContent] = useState("");

  function handleReply(e) {
    setContent(e.target.value);
  }
  const handleCancel = () => {
    window.location.reload();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      createReply({
        content: content,
        issueId: params.issueId,
      }).then((data) => console.log(data));
    } catch (error) {
      console.log(error);
    } finally {
      window.location.reload();
    }
  };

  return (
    <div className={props.open ? "overlay" : ""}>
      <div className={props.open ? "reply-form show" : "reply-form"}>
        <h2> Reply </h2>
        <textarea
          type='text'
          placeholder='Please reply here.'
          autoComplete='off'
          id='conten'
          name='conten'
          className='conten'
          onChange={handleReply}
          value={content}
        />

        <div>
          <button className='reply-cancel' onClick={handleCancel}>
            Cancel
          </button>
          <button className='reply-submit' onClick={handleSubmit}>
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReplyCreateModal;
