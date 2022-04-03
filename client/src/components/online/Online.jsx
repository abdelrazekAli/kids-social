import "./online.css";
import { Link } from "react-router-dom";

export default function Online({ user }) {
  const userImg = user.img;
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  return (
    <Link to={`/profile/${user?._id}`}>
      <li className="rightbarFriend">
        <div className="rightbarProfileImgContainer">
          <img
            className="rightbarProfileImg"
            src={userImg ? `${PF}${userImg}` : `/assets/person/noAvatar.png`}
            alt="userImg"
          />
        </div>
        <span className="rightbarUsername">{user?.username}</span>
      </li>
    </Link>
  );
}
