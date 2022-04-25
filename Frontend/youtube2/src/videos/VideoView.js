import React, { useEffect, useState } from "react";
import Base from "../core/Base";
import "./VideoView.css";
// import video from "../assets/video.mp4";
import video from "../assets/video.mp4";
import thubmnail from "../assets/coding.jpg";
import SugesstionVideo from "./SugesstionVideo";
import { useNavigate, useParams } from "react-router-dom";
import { API, FileServer } from "../backend";
import VideoPlayer from "./VideoPlayer";
import axios from "axios";
import VideoPlayerReact from "react-video-js-player";
import { isAutheticated } from "../auth/helper";
import swal from "sweetalert";
import moment from "moment";
import SugesstionvideosCard from "./SugesstionvideosCard";

function VideoView() {
  const [video, setVideo] = useState();
  const [channel, setChannel] = useState(null);
  const [profilePic, setProfilePic] = useState(null);

  const [videos, setVideos] = useState({});
  const [suggestionVideo, setSuggeestionVideos] = useState({});
  const { videoId } = useParams();
  const { user, token } = isAutheticated();
  const navigate = useNavigate();
  const videoGetter = async () => {
    console.log(videoId, "videoIDddddddddddd");
    await axios
      .get(`${API}/video/render/${videoId}`)
      .then((response) => {
        setVideo(response.data.video);
        console.log(response.data.video, "vudeoview");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const thumbnailHandler = () => {
    axios
      .get(`${API}/videos/getAll`)
      .then((response) => {
        setVideos(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const SaveToWatchLaterHandler = () => {
    let data = {};
    axios
      .put(`${API}/save/${user._id}/${videoId}`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log(response);
        swal("Yaaaaaaaay!", `Added To Watch Later Sucessfully`, "success");
      })
      .catch((error) => {
        swal("Ooops!", `${error.response.data.message}`, "warning");
      });
  };
  const videoLikeHandler = () => {
    let data = {};
    axios
      .put(`${API}/likevideo/${user._id}/${videoId}`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log(response);
        swal("Yaaaaaaaay!", `videoLiked`, "success");
      })
      .catch((error) => {
        swal("Ooops!", `${error.response.data.message}`, "warning");
      });
  };

  const suggestionVideoHandler = () => {
    axios
      .get(`${API}/videos/getAll`)
      .then((response) => {
        setSuggeestionVideos(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const getUser = () => {
    console.log(video, "useriiiiiiiiiiid");
    // axios
    //   .get(`${API}/user/${video.user_id}`)
    //   .then((response) => {
    //     setProfilePic(response.data.profilePhoto);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  };
  const poster =
    "https://media.istockphoto.com/photos/young-couple-taking-break-from-sightseeing-for-selfie-picture-id1291682560?b=1&k=20&m=1291682560&s=170667a&w=0&h=nt6JJOV82jMhE23a0S2X7OHgYR9mA7Y2pfByJXUQoP0=";
  useEffect(() => {
    videoGetter();
    suggestionVideoHandler();
    getUser();
  }, []);
  return (
    <Base className="container">
      <div className=" row mt-5 pt-5">
        <div className="col-7 ">
          <VideoPlayer />
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
          {/* <VideoPlayerReact
            src={video ? `http://localhost:3000/${video.video_path}` : ""}
            poster={poster}
            width="600"
            height="400"
          /> */}
          {/* <video className="video-play" controls>
            <source
              src={video ? `http://localhost:3000/${video.video_path}` : ""}
              type="video/mp4"
              controls
            />
            Your browser does not support the video tag
          </video> */}
          {/* {videos.length &&
            videos.map((d, i) => {
              return (
                <>
                  <p>Video Title : {d.title}</p>
                  <p>Video Description : {d.description}</p>
                  {d.video_path ? (
                    <video className="video-play" controls>
                      <source
                        src={`../${d.video_path}`}
                        type="video/mp4"
                        controls
                      />
                      Your browser does not support the video tag
                    </video>
                  ) : (
                    ""
                  )}
                </>
              );
            })} */}
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
                <span className="ms-1">
                  {" "}
                  {/* {video.createdAt
                    ? moment(video.createdAt).startOf("minute").fromNow()
                    : "No data"}{" "} */}
                  {/* {console.log(video, "viedooooooo")} */}
                </span>
              </p>
            </div>
            <div className="like-container pe-5">
              <div
                className="like d-inline"
                onClick={() => {
                  isAutheticated() ? videoLikeHandler() : navigate("/signup");
                }}
              >
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
              <div
                className="share d-inline  ms-3"
                style={{ cursor: "pointer" }}
                onClick={() => {
                  isAutheticated()
                    ? SaveToWatchLaterHandler()
                    : swal("Ooops!", `Please Signin to save video`, "warning");
                }}
              >
                Save &nbsp;{" "}
                <svg
                  viewBox="0 0 24 24"
                  preserveAspectRatio="xMidYMid meet"
                  focusable="false"
                  class="style-scope yt-icon"
                  fill="#ffff"
                  style={{
                    pointerEvents: "none",
                    // display: "block",
                    width: "100%",
                    height: "28px",
                    width: "28px",
                    height: "100%",
                  }}
                >
                  <g class="style-scope yt-icon">
                    <path
                      d="M22,13h-4v4h-2v-4h-4v-2h4V7h2v4h4V13z M14,7H2v1h12V7z M2,12h8v-1H2V12z M2,16h8v-1H2V16z"
                      class="style-scope yt-icon"
                    ></path>
                  </g>
                </svg>
              </div>
            </div>
          </div>
          <div className="description mt-3">
            <div className="d-flex justify-content-between">
              <div className="channel-info d-flex">
                <img
                  src={
                    profilePic
                      ? profilePic
                      : `https://picsum.photos/200/300?random=${Math.floor(
                          Math.random() * 10
                        )}`
                  }
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
          {suggestionVideo.length &&
            suggestionVideo
              .filter((e) => {
                return !(e._id == video._id);
              })
              .map((info, i) => {
                return <SugesstionvideosCard key={i} videoInfo={info} />;
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
