import "./comment.css";

export default function Comment({ user }) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  return (
    <>
      {user.comment && (
        <div className="comment">
          <img className="comment-img" src={PF + user.profilePicture} alt="" />
          <div className="comment-details comment-bg">
            <h4>{user.username}</h4>
            <p>{user.comment}</p>
          </div>
        </div>
      )}
    </>
  );
}
