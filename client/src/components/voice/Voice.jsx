import "./voice.css";
import { format } from "timeago.js";

export default function Voice({ src, own, time }) {
  return (
    <>
      <div
        className={
          (own
            ? "justify-content-end main-audio-bg"
            : "justify-content-start") + " position-relative d-flex  mb-4"
        }
      >
        <audio src={src} controls></audio>
        <span className={own ? "msg_time_send" : "msg_time"}>
          {format(time)}
        </span>
      </div>
    </>
  );
}
