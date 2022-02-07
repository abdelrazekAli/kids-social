import "./request.css";

const PF = process.env.REACT_APP_PUBLIC_FOLDER;

const Request = ({ request }) => {
  return (
    <div className="request">
      <img className="req-img" src={PF + "person/noAvatar.png"} alt="" />
      <div className="req-details">
        <h3>{request.username}</h3>
        <div className="req-buttons">
          <button className="btn btn-confirm">Confirm</button>
          <button className="btn btn-delete">Delete</button>
        </div>
      </div>
    </div>
  );
};

export default Request;
