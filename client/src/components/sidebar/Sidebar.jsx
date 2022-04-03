import "./sidebar.css";
import axios from "axios";
import Online from "../online/Online";
import { NavLink } from "react-router-dom";
import { Search } from "@material-ui/icons";
import AddIcon from "@material-ui/icons/Add";
import { Context } from "../../context/Context";
import { useState, useContext, useRef } from "react";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { Chat, Group, Person, Home } from "@material-ui/icons";

export default function Sidebar() {
  const modal = useRef(null);
  const span = useRef(null);

  const { user, dispatch } = useContext(Context);
  const [sidebar, setSidebar] = useState(false);
  const [hideModal, setHideModal] = useState(true);
  const [users, setUsers] = useState([]);

  const toggleSidebar = () => {
    setSidebar(!sidebar);
    document.getElementById("root").classList.toggle("hide-root");
  };

  const handleSearch = async (search) => {
    try {
      if (search.length > 0) {
        // Get users
        const res = await axios.get(`/api/v1/users?search=${search}`);
        setUsers(res.data);
      } else {
        setUsers([]);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleLogout = async () => {
    try {
      let res = await axios.post("/api/v1/auth/logout", {
        token: user.refreshToken,
      });
      if (res) {
        dispatch({ type: "LOGOUT" });
        window.location.replace("/");
      }
    } catch (err) {
      window.location.replace("/");
    }
  };

  // When the user clicks anywhere outside of the modal, close it
  window.onclick = (e) => {
    if (e.target === modal.current) {
      setHideModal(!hideModal);
    }
  };

  return (
    <div>
      <button className="toggle-button" onClick={toggleSidebar}>
        <div className="toggle-button-line" />
        <div className="toggle-button-line" />
        <div className="toggle-button-line" />
      </button>
      <div className={sidebar ? "sidebar d-block" : "sidebar"}>
        <div className="sidebarWrapper">
          <ul className="sidebarList">
            <NavLink to="/" exact={true}>
              <li className="sidebarListItem">
                <Home className="sidebarIcon " />
                <span className="sidebarListItemText">Home</span>
              </li>
            </NavLink>
            <NavLink to={`/profile/${user._id}`}>
              <li className="sidebarListItem">
                <Person className="sidebarIcon" />
                <span className="sidebarListItemText">Profile</span>
              </li>
            </NavLink>
            <NavLink to="/requests">
              <li className="sidebarListItem">
                <Group className="sidebarIcon" />
                <span className="sidebarListItemText">Requests</span>
              </li>
            </NavLink>
            <NavLink to="/chats">
              <li className="sidebarListItem">
                <Chat className="sidebarIcon" />
                <span className="sidebarListItemText">Chats</span>
              </li>
            </NavLink>
            <li
              className="sidebarListItem"
              onClick={() => {
                setHideModal(!hideModal);
              }}
            >
              <AddIcon className="sidebarIcon" />
              <span className="sidebarListItemText">Invite Family</span>
            </li>
            <li className="sidebarListItem" onClick={handleLogout}>
              <ExitToAppIcon className="sidebarIcon" />
              <span className="sidebarListItemText">Logout</span>
            </li>
          </ul>
          <hr className="sidebarHr" />

          <div className="topbarCenter">
            <div className="searchbar">
              <Search />
              <input
                placeholder="Search for relatives"
                onKeyUp={(e) => handleSearch(e.target.value)}
                className="searchInput"
              />
            </div>
            <div className="mt-1">
              {users.length > 0 &&
                users.map((u) => <Online key={u._id} user={u} />)}
            </div>
          </div>
        </div>
      </div>
      {!hideModal && (
        <modal>
          <div ref={modal} id="myModal" className="modal">
            <div className="modal-content p-relative">
              <span
                ref={span}
                onClick={() => setHideModal(true)}
                className="modal-close"
              >
                &times;
              </span>
              <h3>Invite Your Family</h3>
              <form className="invite-form">
                <input
                  className="invite-input"
                  placeholder="Email Address"
                  type="email"
                />
                <input
                  className="invite-input button"
                  type="submit"
                  value="Invite"
                />
              </form>
            </div>
          </div>
        </modal>
      )}
    </div>
  );
}
