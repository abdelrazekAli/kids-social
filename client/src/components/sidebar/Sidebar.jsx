import "./sidebar.css";
import axios from "axios";
import emailjs from "emailjs-com";
import Friend from "../friend/Friend";
import { NavLink } from "react-router-dom";
import AddIcon from "@material-ui/icons/Add";
import { Context } from "../../context/Context";
import { useState, useContext, useRef, useEffect } from "react";
import { CircularProgress } from "@material-ui/core";
import {
  Chat,
  Group,
  Person,
  Home,
  School,
  Search,
  Settings,
  ExitToApp,
} from "@material-ui/icons";

// Import components
import Error from "../../components/error/Error";

export default function Sidebar() {
  const modal = useRef(null);
  const span = useRef(null);

  const [email, setEmail] = useState("");
  const [users, setUsers] = useState(null);
  const [sidebar, setSidebar] = useState(false);
  const [loading, setLoading] = useState(false);
  const { user, dispatch } = useContext(Context);
  const [hideModal, setHideModal] = useState(true);
  const [isVisible, setIsVisible] = useState(true);
  const [searchValue, setSearchValue] = useState(false);
  const [invitationFaild, setInvitationFaild] = useState(false);
  const [invitationSuccess, setInvitationSuccess] = useState(false);

  const toggleSidebar = () => {
    setSidebar(!sidebar);
  };

  const handleSearch = async (search) => {
    try {
      setSearchValue(search);
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

  const handleSubmit = (e) => {
    e.preventDefault();
    setInvitationSuccess(false);
    setInvitationFaild(false);
    if (email.length > 0) {
      setLoading(true);
      emailjs
        .sendForm(
          "service_lioq9kd",
          "template_80lt9zl",
          e.target,
          "P5y7xvwHYXkrCpB3m"
        )
        .then(() => {
          setLoading(false);
          setInvitationSuccess(true);
        })
        .catch(() => {
          setLoading(false);
          setInvitationFaild(true);
          setInvitationSuccess(false);
        });
    }
  };

  // Hide Toggle button on scroll
  useEffect(() => {
    window.addEventListener("scroll", () => {
      let heightToHideFrom = 50;
      const winScroll =
        document.body.scrollTop || document.documentElement.scrollTop;

      if (winScroll > heightToHideFrom) {
        isVisible && setIsVisible(false);
      } else {
        setIsVisible(true);
      }
    });
  }, [isVisible]);

  return (
    <div>
      {isVisible && (
        <button className="toggle-button" onClick={toggleSidebar}>
          <div className="toggle-button-line" />
          <div className="toggle-button-line" />
          <div className="toggle-button-line" />
        </button>
      )}
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
            <NavLink to="/learning" exact={true}>
              <li className="sidebarListItem">
                <School className="sidebarIcon " />
                <span className="sidebarListItemText">Learning</span>
              </li>
            </NavLink>
            <NavLink to="/settings">
              <li className="sidebarListItem">
                <Settings className="sidebarIcon" />
                <span className="sidebarListItemText">Settings</span>
              </li>
            </NavLink>
            <li
              className="sidebarListItem"
              onClick={() => {
                setHideModal(!hideModal);
              }}
            >
              <AddIcon className="sidebarIcon" />
              <span className="sidebarListItemText">Invite Friend</span>
            </li>
            <li className="sidebarListItem" onClick={handleLogout}>
              <ExitToApp className="sidebarIcon" />
              <span className="sidebarListItemText">Logout</span>
            </li>
          </ul>
          <hr className="sidebarHr" />

          <div className="topbarCenter">
            <div className="searchbar">
              <Search />
              <input
                placeholder="Search for new friends"
                onChange={(e) => handleSearch(e.target.value)}
                maxLength={20}
                className="searchInput"
              />
            </div>
            <div className="mt-1">
              {Array.isArray(users) &&
                searchValue.length > 0 &&
                (users.length > 0 ? (
                  users.map((u) => <Friend key={u._id} user={u} />)
                ) : (
                  <span className="color-darker">
                    No users matches "{searchValue}"
                  </span>
                ))}
            </div>
          </div>
        </div>
      </div>
      {!hideModal && (
        <div>
          <div ref={modal} id="myModal" className="modal">
            <div className="modal-content p-relative">
              <span
                ref={span}
                onClick={() => setHideModal(true)}
                className="modal-close"
              >
                &times;
              </span>
              {loading && (
                <div className="loading">
                  <CircularProgress color="inherit" size="20px" />
                </div>
              )}
              <h3>Invite Your Friends</h3>
              <form className="invite-form" onSubmit={handleSubmit}>
                <input
                  className="invite-input"
                  placeholder="Email Address"
                  type="email"
                  name="email"
                  onChange={(e) => setEmail(e.target.value)}
                />
                <input
                  className="invite-input"
                  placeholder="Email Address"
                  type="hidden"
                  name="username"
                  value={user.username}
                />
                <button
                  className="invite-input button"
                  type="submit"
                  disabled={loading}
                >
                  Invite
                </button>
              </form>
              {invitationSuccess && (
                <span className="text-success">Invitation has been sent.</span>
              )}
              {invitationFaild && <Error msg={"Faild to send invitation"} />}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
