import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { isAutheticated } from "../auth/helper";
import { API } from "../backend";
import Base from "../core/Base";
import VideoCard from "./VideoCard";

function SaveVideos() {
  const { user, token } = isAutheticated();
  const [userInfo, setUserInfo] = useState(null);
  const [videos, setVideos] = useState([]);

  const getUser = () => {
    axios
      .get(`${API}/user/${user._id}`)
      .then((response) => {
        setUserInfo(response.data.save_to_watch_later);
        console.log(userInfo, "response.data");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const thumbnailHandler = () => {
    axios
      .get(`${API}/videos/getAll`)
      .then((response) => {
        setVideos(response.data);
        console.log(response.data);
        console.log(videos, "videos");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getUser();
    thumbnailHandler();
  }, []);

  return (
    <Base>
      <h1 className="mt-5 pt-5">Saved videos</h1>
      <div className="d-flex ms-4 mt-4  flex-wrap gap-2">
        {userInfo ? (
          videos
            .filter((e) => {
              return userInfo.includes(e._id);
            })
            .map((d, i) => {
              return <VideoCard key={i} videoInfo={d} />;
            })
        ) : (
          <div
            className="mt-5 d-flex justify-content-center align-items-center"
            style={{ width: "100%", height: "100%" }}
          >
            <h3>You Haven't Save Any Video to Watch Later !</h3>
          </div>
        )}
      </div>
    </Base>
  );
}

export default SaveVideos;
