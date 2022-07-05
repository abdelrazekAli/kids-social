import { Link } from "react-router-dom";
import "./userCard.css";

const UserCard = ({ user }) => {
  return (
    <div className="user-chat-card mb-2">
      <img
        src={
          user.img ? `/images/users/${user.img}` : "/assets/images/noAvatar.png"
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
