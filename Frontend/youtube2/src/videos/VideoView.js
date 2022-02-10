import React, { useEffect, useState } from "react";
import Base from "../core/Base";
import "./VideoView.css";
// import video from "../assets/video.mp4";
import video from '../assets/video.mp4'

import thubmnail from "../assets/coding.jpg";
import SugesstionVideo from "./SugesstionVideo";
import { useParams } from "react-router-dom";
import { API } from "../backend";

function VideoView() {
  const { videoId } = useParams();

  const [renderVideo, setRenderVideo] = useState("");

  const [videoUser, setVideoUser] = useState("");

  const [sujessionVideo, setSujjesionVide] = useState([]);

  useEffect(() => {
    fetch(`${API}/api/video/render/${videoId}`)
      .then((response) => response.json())
      .then((data) => setRenderVideo(data.video));
  }, [videoId]);

  useEffect(() => {
    if (renderVideo) {
      fetch(`${API}/api/user/${renderVideo.userid}`)
        .then((response) => response.json())
        .then((data) => setVideoUser(data.user));
    }
    console.log(renderVideo);
  }, [renderVideo, videoId]);

  useEffect(() => {
    fetch(`${API}/api/thumbnail/getall`)
      .then((response) => response.json())
      .then((data) => setSujjesionVide(data));
  }, []);

  return (
    <Base className="container">
      {/* <div className=" row">
        <div className="col-7 ">
          {renderVideo.path ? (
            <video className="video-play" controls>
              <source
                src={`${API}/${renderVideo.path}`}
                type="video/mp4"
                controls
              />
              Your browser does not support the video tag
            </video>
          ) : (
            ""
          )}

          <div className="d-flex mt-3">
            <div>
              <h4 className="ms-3 ">{renderVideo.title}</h4>
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
                {renderVideo.likes && `${renderVideo.likes.length}`} &nbsp;
                <i class="far fa-thumbs-up"></i>
              </div>
              <div className="dislike d-inline ms-3">
                {renderVideo.dislikes && `${renderVideo.dislikes.length}`}{" "}
                &nbsp;
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
                  src={
                    videoUser.profilephoto ? videoUser.profilephoto : thubmnail
                  }
                  height="30"
                  width="30"
                  className="rounded-circle"
                  alt=""
                  srcset=""
                />
                &nbsp;&nbsp;
                <div>
                  <h5 className="d-inline">{videoUser.email}</h5>
                  <p className="fw-light ">
                    {videoUser.subscriptions
                      ? `${videoUser.subscriptions.length} subscriber`
                      : ""}
                  </p>
                </div>
              </div>
              <div className="subscribe-button">
                <button className="btn fw-bold me-5 btn-danger">
                  Subscribe
                </button>
              </div>
            </div>
            <p>{renderVideo.description}</p>
          </div>
        </div>
        <div className="col-4 col-offset-1">
          <h1>suggestion</h1>

          {sujessionVideo.map((thumbnail, i) => {
            return <SugesstionVideo thumbinfo={thumbnail} key={i} />;
          })}
        </div>
      </div> */}
      <video className="video-play" controls>
        <source
          src={video}
          type="video/mp4"
          controls
        />
        Your browser does not support the video tag
      </video>
    </Base>
  );
}

export default VideoView;
