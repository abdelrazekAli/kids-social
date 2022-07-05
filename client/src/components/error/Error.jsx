import "./error.css";

export default function Error({ msg }) {
  return (
    <>
      <div className="alert-danger text-center">
        <p>{msg}</p>
      </div>
    </>
  );
}
