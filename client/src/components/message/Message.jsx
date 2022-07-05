import "./message.css";
import { format } from "timeago.js";

export default function Message({ own, msg }) {
  return (
    <>
      <div
        className={
          (own ? "justify-content-end" : "justify-content-start") +
          " position-relative d-flex  mb-4"
        }
      >
        <div className={own ? "msg_cotainer_send" : "msg_cotainer"}>
          {msg.content}
        </div>
        <span className={own ? "msg_time_send" : "msg_time"}>
          {format(msg.createdAt)}
        </span>
      </div>
    </>
  );
}
