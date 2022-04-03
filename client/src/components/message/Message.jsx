import "./message.css";

export default function Message({ own, msg }) {
  return (
    <>
      {own ? (
        <div className={"position-relative d-flex justify-content-end mb-4"}>
          <div className="msg_cotainer_send">{msg.text}</div>
          <span className="msg_time_send">{msg.date}</span>
        </div>
      ) : (
        <div className="position-relative d-flex justify-content-start mb-4">
          <div className="msg_cotainer">{msg.text}</div>
          <span className="msg_time">{msg.date}</span>
        </div>
      )}
    </>
  );
}
