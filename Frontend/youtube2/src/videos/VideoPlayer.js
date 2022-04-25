import React, { useState } from "react";
import VideoPlayerReact from "react-video-js-player";
import video from "../assets/video.mp4";
import { FileServer } from "../backend";
const VideoPlayer = ({ videopath, thumbnail }) => {
  console.log(`http://localhost:8000/${thumbnail}`);
  // console.log(videosrc, "videosrc");
  // console.log(videopath, "videopath");
  // const [videosrcFile, setVideosrcFile] = useState("");
  // if (videosrc) {
  //   setVideosrcFile(videosrc.videosrc);
  // }
  // const src = `${videosrc.videosrc}`;
  const poster = `http://localhost:8000/${thumbnail}`;

  return (
    <div>
      <VideoPlayerReact
        src={`http://localhost:8000/${videopath}`}
        poster={poster}
        width="600"
        height="400"
      />
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
