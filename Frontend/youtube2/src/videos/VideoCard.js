import React, { useEffect, useState } from "react";
import { API } from "../backend.js";
import thubmnaila from "../assets/coding.jpg";
import "./VideoCard.css";
import { Link } from "react-router-dom";
const VideoCard = (props) => {
  const [user, setUser] = useState({});

  useEffect(() => {
    fetch(`${API}/api/user/${props.thumbnails.userId}`)
      .then((response) => response.json())
      .then((data) => setUser(data.user));
  }, []);

  return (
    <div className="video-card">
      <Link
        to={`/VideoView/${props.thumbnails.video._id}`}
        className="video text-decoration-none text-white"
      >
        <div className="thubmnail ">
          <img
            src={`${API}/${props.thumbnails.path}`}
            className="img-fluid"
            alt=""
          />
        </div>
        <div className="d-flex mt-3 justify-content-around">
          <div className="user-image">
            <img
              src={`${user.profilephoto ? user.profilephoto : thubmnaila}`}
              className="rounded-circle "
              height="30"
              width="30"
              alt="profile-img"
            />
          </div>
          <div className="video-info ">
            <p className="video-title">{props.thumbnails.video.title}</p>
            {user.name ? <p className="user-name">{user.name}</p> : ""}
          </div>
        </div>
      </Link>
    </div>
  );
};

export default VideoCard;
