import "./record.css";
import { useRef, useState, useContext } from "react";
import { axiosJWT, Context } from "../../context/Context";
import { Mic, Stop } from "@material-ui/icons";

export default function Record({
  conversationId,
  setMessages,
  messages,
  emitMessage,
}) {
  const stopButtonRef = useRef(null);
  const { user } = useContext(Context);
  const [startRecord, setStartRecord] = useState(false);

  const startRecording = () => {
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then(function (stream) {
        setStartRecord(true);
        const options = { mimeType: "audio/webm" };
        const recordedChunks = [];
        const mediaRecorder = new MediaRecorder(stream, options);

        mediaRecorder.addEventListener("dataavailable", (e) => {
          if (e.data.size > 0) recordedChunks.push(e.data);
        });

        mediaRecorder.addEventListener("stop", async () => {
          let blob = new Blob(recordedChunks, { type: "audio/mp3;" });
          if (blob) {
            const data = new FormData();
            const fileName = `${Date.now()}_${user._id}.mp3`;
            data.append("name", fileName);
            data.append("file", blob);
            const voiceMsg = {
              sender: user._id,
              content: fileName,
              conversationId,
            };

            try {
              // Upload voice
              await axiosJWT({
                method: "post",
                url: "/api/v1/upload/voices",
                headers: {
                  "auth-token": user.accessToken,
                },
                data: data,
              });
              // Post message
              let res = await axiosJWT({
                method: "post",
                url: "/api/v1/messages",
                headers: {
                  "auth-token": user.accessToken,
                },
                data: voiceMsg,
              });
              emitMessage(fileName);
              setMessages([...messages, res.data]);
            } catch (err) {
              console.log(err);
            }
          }
        });

        stopButtonRef?.current?.addEventListener(
          "click",
          function onStopClick() {
            setStartRecord(false);
            mediaRecorder.stop();
            this.removeEventListener("click", onStopClick);
          }
        );
        mediaRecorder.start();
      });
  };

  return (
    <>
      <div className="record-wrapper">
        {startRecord ? (
          <div ref={stopButtonRef} className="voice-record">
            <Stop className="fs-inherit" />
          </div>
        ) : (
          <div className="voice-record" onClick={startRecording}>
            <Mic className="fs-inherit" />
          </div>
        )}
      </div>
    </>
  );
}
