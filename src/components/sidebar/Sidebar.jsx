import "./sidebar.css";

import { useState, useRef } from "react";
import { Link, NavLink } from "react-router-dom";

import { Search } from "@material-ui/icons";
import AddIcon from "@material-ui/icons/Add";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { Chat, Group, Person, Home } from "@material-ui/icons";

export default function Sidebar() {
  const modal = useRef(null);
  const span = useRef(null);

  const [sidebar, setSidebar] = useState(false);
  const [hideModal, setHideModal] = useState(true);

  const toggleSidebar = () => {
    setSidebar(!sidebar);
    document.getElementById("root").classList.toggle("hide-root");
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
            <NavLink to="/profile/0">
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
            <Link to={"/login"}>
              <li className="sidebarListItem">
                <ExitToAppIcon className="sidebarIcon" />
                <span className="sidebarListItemText">Logout</span>
              </li>
            </Link>
          </ul>
          <hr className="sidebarHr" />

          <div className="topbarCenter">
            <div className="searchbar">
              <Search />
              <input
                placeholder="Search for relatives"
                className="searchInput"
              />
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
