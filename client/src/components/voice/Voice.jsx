import "./voice.css";

export default function Voice({ src, own }) {
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
      </div>
    </>
  );
}
