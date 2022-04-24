import React, { useEffect, useState } from "react";
import { API } from "../backend.js";
import thubmnaila from "../assets/coding.jpg";
import classes from "./VideoCard.module.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import VideoView from "./VideoView.js";
import moment from "moment";
const VideoCard = ({ videoInfo, index }) => {
  const [channel, setChannel] = useState(null);
  const [profilePic, setProfilePic] = useState(null);
  const navigate = useNavigate();
  const ChannelInfoGetter = () => {
    // console.log(videoInfo, "vdieoinfor");
    axios
      .get(`${API}/finduserchannels/${videoInfo.user_id}`)
      .then((response) => {
        setChannel(response.data[0]);
        console.log(channel, "cjamm");
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  };
  const getUser = () => {
    axios
      .get(`${API}/user/${videoInfo.user_id}`)
      .then((response) => {
        setProfilePic(response.data.profilePhoto);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const truncatingString = (str, n) => {
    if (str.length >= n) {
      return str.slice(0, n).concat("...");
    } else {
      return str;
    }
  };
  useEffect(() => {
    ChannelInfoGetter();
    getUser();
  }, []);

  return (
    <div className={classes.Videocard} style={{ cursor: "pointer" }}>
      <img
        src={`https://picsum.photos/200/300?random=${Math.floor(
          Math.random() * 10
        )}`}
        className="card-img-top img-fluid"
      />
      <div className="card-body">
        <div className={classes.videInfo}>
          <Link to={`/VideoView/${videoInfo._id}`}>
            <img
              src={
                profilePic
                  ? profilePic
                  : `https://picsum.photos/200/300?random=${Math.floor(
                      Math.random() * 10
                    )}`
              }
              className="rounded-circle img-fluid"
            />
          </Link>

          <div
            onClick={() => {
              navigate(`/VideoView/${videoInfo._id}`);
            }}
          >
            {/* <p className="text-muted">{title}</p> */}

            <p className={`text-muted ${classes.videoTitle}`}>
              {truncatingString(videoInfo.title, 20)}
            </p>
            {channel && (
              <p className={classes.channel_name}>{channel.channel_name}</p>
            )}

            <div className="d-flex gap-3">
              <p className={`${classes.views} text-muted fs-6`}>2.4M views</p>
              <p className={`${classes.views} text-muted fs-6`}>
                {videoInfo.createdAt
                  ? moment(videoInfo.createdAt).startOf("minute").fromNow()
                  : "No data"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoCard;
