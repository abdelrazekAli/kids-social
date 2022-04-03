import "./error.css";

export default function Error({ msg }) {
  return (
    <>
      <div className="alert-danger">
        <p>{msg}</p>
      </div>
    </>
  );
}
