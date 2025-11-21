import MicIcon from "@mui/icons-material/Mic";
import MicOffIcon from "@mui/icons-material/MicOff";
import IconButton from "@mui/material/IconButton";
import AgoraRTC, {
  IAgoraRTCClient,
  IAgoraRTCRemoteUser,
  ILocalAudioTrack,
  ILocalVideoTrack,
  UID,
} from "agora-rtc-sdk-ng";
import React, { useEffect, useState } from "react";
import VideoPlayer from "../VideoPlayer/VideoPlayer";

const APP_ID = "be5b47c8df4c4b7c8e07d771df2b2ab4";
const TOKEN =
  "007eJxTYPhktTte+d6DiU9aZHVXRhcxPZg4NfxvjF9dw+bDdz557hRUYEhKNU0yMU+2SEkzSTZJAjJSDcxTzM0NU9KMkowSk0zWp7OkNwQyMvB4NTEyMkAgiM/O4J6aX5aYl8rAAABB8SHN";
const CHANNEL = "Geovane";

const client: IAgoraRTCClient = AgoraRTC.createClient({
  mode: "rtc",
  codec: "vp8",
});

interface VideoRoomUser {
  uid: UID;
  videoTrack: ILocalVideoTrack;
  audioTrack: ILocalAudioTrack;
}

interface VideoRoomProps {
  setJoined: (joined: boolean) => void;
}

const VideoRoom: React.FC<VideoRoomProps> = ({ setJoined }) => {
  const [users, setUsers] = useState<VideoRoomUser[]>([]);
  const [localTracks, setLocalTracks] = useState<
    [ILocalAudioTrack, ILocalVideoTrack] | []
  >([]);
  const [micMuted, setMicMuted] = useState<boolean>(false);

  const handleUserJoined = async (
    user: IAgoraRTCRemoteUser,
    mediaType: "audio" | "video"
  ) => {
    await client.subscribe(user, mediaType);
    if (mediaType === "video") {
      setUsers((previousUsers) => [...previousUsers, user as any]);
    }
    if (mediaType === "audio" && user.audioTrack) {
      user.audioTrack.play();
    }
  };

  const handleUserLeft = (user: IAgoraRTCRemoteUser) => {
    setUsers((previousUsers) => {
      return previousUsers.filter((u) => u.uid !== user.uid);
    });
  };

  useEffect(() => {
    client.on("user-published", handleUserJoined);
    client.on("user-left", handleUserLeft);

    client
      .join(APP_ID, CHANNEL, TOKEN, null)
      .then((uid) =>
        Promise.all([AgoraRTC.createMicrophoneAndCameraTracks(), uid])
      )
      .then(([tracks, uid]) => {
        const [audioTrack, videoTrack] = tracks;
        setLocalTracks(tracks);
        setUsers((previousUsers) => [
          ...previousUsers,
          { uid, videoTrack, audioTrack },
        ]);
        client.publish(tracks);
      });

    return () => {
      for (let localTrack of localTracks) {
        localTrack.stop();
        localTrack.close();
      }
      client.off("user-published", handleUserJoined);
      client.off("user-left", handleUserLeft);
      client.unpublish(localTracks).then(() => client.leave());
    };
  }, []);

  const leaveRoom = () => {
    for (let localTrack of localTracks) {
      localTrack.stop();
      localTrack.close();
    }
    client.leave();
    setJoined(false);
  };

  const toggleMic = () => {
    if (localTracks.length > 0) {
      const audioTrack = localTracks[0];
      if (audioTrack) {
        if (micMuted) {
          audioTrack.setEnabled(true);
        } else {
          audioTrack.setEnabled(false);
        }
        setMicMuted(!micMuted);
      }
    }
  };

  return (
    <>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div
          style={{
            display: "flex",
            gap: "40px",
            marginTop: "5rem",
          }}
        >
          {users.map((user) => {
            return <VideoPlayer key={user.uid} user={user} />;
          })}
        </div>
      </div>
      <IconButton onClick={toggleMic} style={{ marginTop: "5px" }}>
        {micMuted ? <MicOffIcon /> : <MicIcon />}
      </IconButton>
      <button onClick={leaveRoom}>LEAVE ROOM</button>
    </>
  );
};

export default VideoRoom;
