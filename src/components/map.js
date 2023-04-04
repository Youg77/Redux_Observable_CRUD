import React from "react";

function Map({ user, handleDelete, selectUser }) {
  return (
    <div className="userCard">
      <div className="image"></div>
      <div>
        <ul>
          {/* <li> ID: {user.id}</li> */}
          <li> Name: {user.name}</li>
          <li> Address: {user.address}</li>
          <li> Email: {user.email}</li>
          <li> Contact: {user.contact}</li>
          <button className="btn_1" onClick={() => handleDelete(user.id)}>
            DEL
          </button>
          <button className="btn_1" onClick={() => selectUser(user.id)}>
            EDIT
          </button>
        </ul>
      </div>
    </div>
  );
}

export default Map;
