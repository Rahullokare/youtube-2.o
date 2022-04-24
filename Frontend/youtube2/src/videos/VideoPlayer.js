import React, { useState } from "react";
import VideoPlayerReact from "react-video-js-player";
import video from "../assets/video.mp4";
import { FileServer } from "../backend";
const VideoPlayer = ({ videosrc, videopath }) => {
  console.log(videosrc, "videosrc");
  console.log(videopath, "videopath");
  // const [videosrcFile, setVideosrcFile] = useState("");
  // if (videosrc) {
  //   setVideosrcFile(videosrc.videosrc);
  // }
  // const src = `${videosrc.videosrc}`;
  const poster =
    "https://media.istockphoto.com/photos/young-couple-taking-break-from-sightseeing-for-selfie-picture-id1291682560?b=1&k=20&m=1291682560&s=170667a&w=0&h=nt6JJOV82jMhE23a0S2X7OHgYR9mA7Y2pfByJXUQoP0=";
  return (
    <div>
      <VideoPlayerReact src={video} poster={poster} width="600" height="400" />
      {/* <video className="video-play" controls>
        <source
          src={`http://127.0.0.1:8887/${videosrc.videosrc}`}
          type="video/mp4"
          controls
        />
        Your browser does not support the video tag
      </video> */}
    </div>
  );
};

export default VideoPlayer;
