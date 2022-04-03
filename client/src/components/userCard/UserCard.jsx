import { Link } from "react-router-dom";
import "./userCard.css";

const PF = process.env.REACT_APP_PUBLIC_FOLDER;

const UserCard = ({ user }) => {
  return (
    <div className="user-chat-card mb-2">
      <img
        src={
          user.profilePicture ? PF + user.img : "/assets/person/noAvatar.png"
        }
        alt="user"
      />
      <div className="container">
        <h5>{user.username}</h5>
        <Link to={`/chat/${user._id}`} className="btn btn-chat">
          Chat
        </Link>
      </div>
    </div>
  );
};

export default UserCard;
