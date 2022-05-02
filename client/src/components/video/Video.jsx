import "./video.css";
import { useEffect, useRef } from "react";

const Video = ({ peer, style }) => {
  const friendVideo = useRef();

  useEffect(() => {
    peer.on("stream", (stream) => {
      friendVideo.current.srcObject = stream;
    });
  }, [peer]);

  return (
    <video
      playsInline
      autoPlay
      ref={friendVideo}
      className="h-40 w-50"
      style={style}
    />
  );
};

export default Video;
