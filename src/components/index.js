import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import Map from "./map";
import { AiOutlineClose } from "react-icons/ai";

const Users = () => {
  const users = useSelector((state) => state.users.users);
  console.log(users);

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [userId, setUserId] = useState(null);

  const [showForm, setShowForm] = useState(false);
  const [addButtonVisible, setAddButtonVisible] = useState(true);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: "GET_USERS_REQ" });
  }, [dispatch]);

  function selectUser(id) {
    const user = users.find((user) => user.id === id);
    if (user) {
      setName(user.name);
      setAddress(user.address);
      setEmail(user.email);
      setContact(user.contact);
      setUserId(user.id);
      setShowForm(true); // Open form popup when a user is selected
      setAddButtonVisible(false); // hide the button when a user is selected
    }
  }

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const payload = { id: userId, name, address, email, contact };
    if (userId) {
      dispatch({ type: "PUT_REQ", payload: payload });
    } else {
      dispatch({ type: "POST_REQ", payload: payload });
    }
    setName("");
    setAddress("");
    setEmail("");
    setContact("");
    setUserId(null);
    dispatch({ type: "GET_USERS_REQ" });
    setShowForm(false); // Close form popup after submitting the form
    setAddButtonVisible(true); // hide the button
  };

  const handleDelete = (id) => {
    dispatch({
      type: "DEL_USER_REQ",
      payload: id,
    });

    dispatch({ type: "GET_USERS_REQ" });
  };

  const handleAddUserClick = () => {
    setShowForm(true);
    setAddButtonVisible(false);
  };

  const handleCloseClick = () => {
    setShowForm(false);
    setAddButtonVisible(true);
    setName("");
    setAddress("");
    setEmail("");
    setContact("");
    setUserId(null);
  };

  return (
    <div>
      <div className="header">
        <>CRUD REDUX OBS</>
        <>
          {addButtonVisible && (
            <button className="btn" onClick={handleAddUserClick}>
              Add New User
            </button>
          )}
        </>
      </div>

      <div className="main">
        {/* <h1 className="userList"> User List ({users.length})</h1> */}

        {showForm && (
          <div className="overlay">
            <form className="form-" onSubmit={handleFormSubmit}>
              <div>
                <h1>{userId ? "Edit your Info" : "Fillup and Submit"}</h1>
                <button className="close-btn" onClick={handleCloseClick}>
                  <AiOutlineClose />
                </button>
              </div>
              <input
                name="name"
                type="string"
                value={name}
                placeholder="Name.."
                onChange={(e) => setName(e.target.value)}
              />

              <input
                name="address"
                type="string"
                placeholder="Your address..."
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
              <input
                name="email"
                type="email"
                placeholder="Your email here..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                name="contact"
                type="number"
                placeholder="Contact"
                value={contact}
                onChange={(e) => setContact(e.target.value)}
              />

              <button className="btn" type="submit">
                {userId ? "PUT" : "POST"}
              </button>
            </form>
          </div>
        )}
        <div className="container">
          {Array.isArray(users) ? (
            users.map((user, key) => (
              <Map
                key={key}
                user={user}
                handleDelete={handleDelete}
                selectUser={selectUser}
              />
            ))
          ) : (
            <div>User State is Empty</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Users;
