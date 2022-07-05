import "./online.css";
import { Link } from "react-router-dom";

export default function Online({ user }) {
  const userImg = user?.img;

  return (
    <Link to={`/profile/${user?._id}`}>
      <li className="rightbarFriend">
        <div className="rightbarProfileImgContainer">
          <img
            className="rightbarProfileImg"
            src={
              userImg
                ? `/images/users/${userImg}`
                : `/assets/images/noAvatar.png`
            }
            alt="userImg"
          />
          <div className="rightbarOnline" title="Online now" />
        </div>
        <span className="rightbarUsername">{user?.username}</span>
      </li>
    </Link>
  );
}
