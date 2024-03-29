import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { isAutheticated } from "../auth/helper";
import { API } from "../backend";
import Base from "../core/Base";
import VideoCard from "../videos/VideoCard";
function ProfileVideos() {
  const { user, token } = isAutheticated();
  const [userInfo, setUserInfo] = useState(null);
  const [videos, setVideos] = useState([]);
  const thumbnailHandler = () => {
    axios
      .get(`${API}/videos/getAll`)
      .then((response) => {
        setVideos(response.data);
        // console.log(response.data);
        // console.log(videos, "videos");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    thumbnailHandler();
  }, []);
  return (
    <div>
      {/* <h1 className="mt-5 pt-5">Saved videos</h1> */}
      <div className="d-flex ms-4 mt-4  flex-wrap gap-2">
        {videos.length
          ? videos
              // .filter((e) => {
              //   return videos.includes(user._id);
              // })
              .map((d, i) => {
                return <VideoCard key={i} videoInfo={d} />;
              })
          : ""}
      </div>
    </div>
  );
}

export default ProfileVideos;
