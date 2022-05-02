import "./room.css";
import Peer from "simple-peer";
import io from "socket.io-client";
import { useParams } from "react-router-dom";
import Button from "@material-ui/core/Button";
import React, { useEffect, useRef, useState } from "react";

// Import components
import Video from "../../components/video/Video";
import Topbar from "../../components/topbar/Topbar";

const videoConstraints = {
  height: window.innerHeight / 2,
  width: window.innerWidth / 2,
};

const Room = () => {
  const socketRef = useRef();
  const userVideo = useRef();
  const peersRef = useRef([]);
  const { type, roomID } = useParams();
  const [peers, setPeers] = useState([]);
  const [joined, setJoined] = useState(false);
  const [waiting, setWaiting] = useState(true);
  const [friendName, setFriendName] = useState("");
  const [canceling, setCanceling] = useState(false);

  // Refactor it plz
  useEffect(() => {
    socketRef.current = io.connect("ws://localhost:8900");
    navigator.mediaDevices
      .getUserMedia(
        type === "video"
          ? { video: videoConstraints, audio: true }
          : { audio: true }
      )
      .then((stream) => {
        userVideo.current.srcObject = stream;
        socketRef.current.emit("join room", roomID);
        socketRef.current.on("all users", (users) => {
          const peers = [];
          users.forEach((userID) => {
            const peer = createPeer(userID, socketRef.current.id, stream);
            peersRef.current.push({
              peerID: userID,
              peer,
            });
            peers.push(peer);
          });
          setPeers(peers);
        });

        socketRef.current.on("user joined", (payload) => {
          setWaiting(false);
          setJoined(true);
          const peer = addPeer(payload.signal, payload.callerID, stream);
          peersRef.current.push({
            peerID: payload.callerID,
            peer,
          });

          setPeers((users) => [...users, peer]);
        });

        socketRef.current.on("receiving returned signal", (payload) => {
          setWaiting(false);

          const item = peersRef.current.find((p) => p.peerID === payload.id);
          item.peer.signal(payload.signal);
        });
      });
  }, [roomID, type]);

  useEffect(() => {
    socketRef.current.on("canceling call", (name) => {
      setFriendName(name);
      setCanceling(true);
    });
  }, []);

  function createPeer(userToSignal, callerID, stream) {
    const peer = new Peer({
      initiator: true,
      trickle: false,
      stream,
    });

    peer.on("signal", (signal) => {
      socketRef.current.emit("sending signal", {
        userToSignal,
        callerID,
        signal,
      });
    });

    return peer;
  }

  function addPeer(incomingSignal, callerID, stream) {
    const peer = new Peer({
      initiator: false,
      trickle: false,
      stream,
    });

    peer.on("signal", (signal) => {
      setWaiting(false);

      socketRef.current.emit("returning signal", { signal, callerID });
    });

    peer.signal(incomingSignal);

    return peer;
  }

  return (
    <>
      <Topbar />
      <div className="room-container">
        {type === "video" ? <h4>Video Call</h4> : <h4>Voice Call</h4>}
        {canceling && (
          <p className="alert-danger fs-25">{friendName} canceled the call</p>
        )}
        {joined && <p className="fs-25 color-main">Your friend joined</p>}
        {waiting && !canceling && (
          <p className="fs-25 color-main">
            Just wait until your friend join ...
          </p>
        )}
        {peers.map((peer, index) => (
          <Video
            key={index}
            peer={peer}
            style={type === "voice" ? { display: "none" } : null}
          />
        ))}
        {type === "voice" && <img src={"/assets/signal.gif"} alt="" />}
        <div className="videos">
          <video
            muted
            ref={userVideo}
            autoPlay
            playsInline
            style={type === "voice" ? { display: "none" } : null}
            className="user-video"
          />
        </div>
        <Button
          variant="contained"
          color="secondary"
          className="end-btn mb-1"
          onClick={() => window.close()}
        >
          End Call
        </Button>
      </div>
    </>
  );
};

export default Room;
