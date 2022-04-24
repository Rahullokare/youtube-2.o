import axios from "axios";
import moment from "moment";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { API } from "../backend";
import classes from "./VideoCard.module.css";

function SugesstionvideosCard({ videoInfo }) {
  const [channel, setChannel] = useState(null);
  const ChannelInfoGetter = () => {
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
  useEffect(() => {
    ChannelInfoGetter();
  }, []);
  return (
    <div>
      <div>
        <Link to={`/VideoView/${videoInfo._id}`}>
          {" "}
          <div className="d-flex mt-3 text-decoration-none text-white">
            <div className="video-suggestion">
              <img src="https://picsum.photos/200/300" alt="" />
            </div>
            <div className="video-info ms-2">
              <h4 className="video-suggestion-title ">{videoInfo.title}</h4>
              {channel && (
                <p className={`text-white ${classes.channel_name}`}>
                  {channel.channel_name}
                </p>
              )}
              <p class="fw-light">
                {" "}
                {videoInfo.createdAt
                  ? moment(videoInfo.createdAt).startOf("minute").fromNow()
                  : "No data"}
              </p>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default SugesstionvideosCard;
