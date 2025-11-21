import React, { useEffect, useRef } from "react";
import { IRemoteVideoTrack, ILocalVideoTrack, UID } from "agora-rtc-sdk-ng";

interface VideoPlayerUser {
  uid: UID;
  videoTrack: IRemoteVideoTrack | ILocalVideoTrack;
  audioTrack?: any;
}

interface VideoPlayerProps {
  user: VideoPlayerUser;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ user }) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current) {
      user.videoTrack.play(ref.current);
    }
  }, [user.videoTrack]);

  return (
    <div>
      UID: {user.uid}
      <div ref={ref} style={{ width: "400px", height: "400px" }}></div>
    </div>
  );
};

export default VideoPlayer;
