import React, { useState, useEffect } from "react";
import { getAll, getByName } from "../../dataHandling/userHandling";
import { addMember } from "../../dataHandling/ticketHandling";
import "./AddMembers.css";

const AddMemberModal = (props) => {
  const [userState, setUserState] = useState({
    users: [],
    username: "",
  });

  const handleChange = ({ target }) => {
    // console.log(target.name, target.value)
    setUserState({ ...userState, [target.name]: target.value });
  };

  const handleAddMember = (e) => {
    e.preventDefault();
    getByName(userState.username)
      .then((user) => {
        //console.log(user);
        addMember(props.ticketId, user)
          .then((data) => console.log(data))
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err))
      .finally(() => {
        window.location.reload();
      });
  };
  const handleCancel = () => {
    //navigate(`/ticket/${props.ticketId}`);
    window.location.reload();
  };

  useEffect(() => {
    getAll()
      .then((res) => {
        const users = [...userState.users];
        res.forEach((user) => {
          users.push(user);
        });
        setUserState({ ...userState, users });
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <div className={props.open ? "overlay" : ""}>
        <div className={props.open ? "dialog show" : "dialog"}>
          <div className='dialog-content'>
            <h3 className='dialog-title'>Assign a member to the ticket</h3>
            <select
              id='members'
              className='member-select'
              name='username'
              value={userState.username}
              onChange={handleChange}
            >
              <option value=''>--Select a user--</option>
              {userState.users &&
                userState.users.map((user) => {
                  return (
                    <option key={user._id} value={user.username}>
                      {user.username}
                    </option>
                  );
                })}
            </select>

            <div className='member-btn'>
              <button className='cancel-btn' onClick={handleCancel}>
                Cancel
              </button>
              <button className='add-member-form-btn' onClick={handleAddMember}>
                Confirm
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddMemberModal;
