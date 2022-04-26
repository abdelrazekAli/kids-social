import "./message.css";
import { format } from "timeago.js";

export default function Message({ own, msg }) {
  return (
    <>
      {own ? (
        <div className={"position-relative d-flex justify-content-end mb-4"}>
          <div className="msg_cotainer_send">{msg.content}</div>
          <span className="msg_time_send">{format(msg.createdAt)}</span>
        </div>
      ) : (
        <div className="position-relative d-flex justify-content-start mb-4">
          <div className="msg_cotainer">{msg.content}</div>
          <span className="msg_time">{format(msg.createdAt)}</span>
        </div>
      )}
    </>
  );
}
