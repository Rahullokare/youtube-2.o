import React, { useEffect, useState } from "react";
import Base from "../core/Base";
import "./VideoView.css";
// import video from "../assets/video.mp4";
import video from "../assets/video.mp4";
import thubmnail from "../assets/coding.jpg";
import SugesstionVideo from "./SugesstionVideo";
import { useParams } from "react-router-dom";
import { API, FileServer } from "../backend";
import VideoPlayer from "./VideoPlayer";
import axios from "axios";
import VideoPlayerReact from "react-video-js-player";

function VideoView() {
  const [video, setVideo] = useState();
  const [channel, setChannel] = useState(null);

  const { videoId } = useParams();

  const videoGetter = () => {
    console.log(videoId, "videoIDddddddddddd");
    axios
      .get(`${API}/video/render/${videoId}`)
      .then((response) => {
        setVideo(response.data.video);
        console.log(response.data.video, "vudeoview");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const poster =
    "https://media.istockphoto.com/photos/young-couple-taking-break-from-sightseeing-for-selfie-picture-id1291682560?b=1&k=20&m=1291682560&s=170667a&w=0&h=nt6JJOV82jMhE23a0S2X7OHgYR9mA7Y2pfByJXUQoP0=";
  useEffect(() => {
    videoGetter();
  }, []);
  return (
    <Base className="container">
      <div className=" row mt-5 pt-5">
        <div className="col-7 ">
          {/* <>{JSON.stringify(video)}</> */}
          {/* {video.video_path ? (
            <video className="video-play" controls>
              <source
                src={`../../../Backend/uploads/${video && video.video_path}`}
                type="video/mp4"
                controls
              />
              Your browser does not support the video tag
            </video>
          ) : (
            ""
          )} */}
          {/* <VideoPlayer
            videosrc={video ? video.video_path : ""}
            // videopath={video.video_path}
          /> */}
          <VideoPlayerReact
            src={video && video.video_path}
            poster={poster}
            width="600"
            height="400"
          />

          <div className="d-flex mt-3">
            <div>
              <h4 className="ms-3 " style={{ fontSize: "18px" }}>
                {video && video.title}{" "}
              </h4>
            </div>
          </div>
          <div className="d-flex justify-content-between mt-3 border-bottom">
            <div className="view-info">
              <p class="fw-light">
                14k views
                <span className="ms-1">6 hours ago </span>
              </p>
            </div>
            <div className="like-container pe-5">
              <div className="like d-inline">
                Likes &nbsp;
                <i class="far fa-thumbs-up"></i>
              </div>
              <div className="dislike d-inline ms-3">
                dislikes &nbsp;
                <i class="far fa-thumbs-down"></i>
              </div>
              <div className="share d-inline  ms-3">
                Share &nbsp; <i class="fas fa-share"></i>
              </div>
            </div>
          </div>
          <div className="description mt-3">
            <div className="d-flex justify-content-between">
              <div className="channel-info d-flex">
                <img
                  src="https://i.pravatar.cc/30"
                  height="30"
                  width="30"
                  className="rounded-circle"
                  alt=""
                  srcset=""
                />
                &nbsp;&nbsp;
                <div>
                  <h5 className="d-inline">Feel the Nature</h5>
                  <p className="fw-light ">12k</p>
                </div>
              </div>
              <div className="subscribe-button">
                <button className="btn fw-bold me-5 btn-danger">
                  Subscribe
                </button>
              </div>
            </div>
            <p>{video && video.description}</p>
          </div>
        </div>
        <div className="col-4 col-offset-1">
          <h3>Suggestion For You</h3>
          {new Array(6).fill("_").map((d, i) => {
            return (
              <div>
                <a
                  href="#"
                  className="d-flex mt-3 text-decoration-none text-white"
                >
                  <div className="video-suggestion">
                    <img src="https://picsum.photos/200/300" alt="" />
                  </div>
                  <div className="video-info ms-2">
                    <h4 className="video-suggestion-title ">we love videos</h4>
                    <h6 className="">Deveolpers_Choice</h6>
                    <p class="fw-light">6 hours ago</p>
                  </div>
                </a>
              </div>
            );
          })}
        </div>
      </div>
      {/* <video className="video-play" controls>
        <source
          src={video}
          type="video/mp4"
          controls
        />
        Your browser does not support the video tag
      </video> */}
    </Base>
  );
}

export default VideoView;
