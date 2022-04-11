import React, { useEffect, useState } from "react";
import { API } from "../backend";
import VideoCard from "../videos/VideoCard";
import Base from "./Base";
import axios from "axios";
const Home = () => {
  const [videos, setVideos] = useState({});
  useEffect(() => {
    thumbnailHandler();
  }, []);
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

  return (
    <Base className=" container-fluid mt-5 pt-5">
      {/* <h1>hello home</h1> */}
      <div>
        <div className="d-flex ms-4  flex-wrap gap-2">
          {videos.length &&
            videos.map((videoInfo, i) => {
              return <VideoCard index={i} videoInfo={videoInfo} />;
            })}
          {/* {new Array(6).fill("_").map((d, i) => {
            return <VideoCard index={i} />;
          })} */}
        </div>
      </div>

      {/* {thumbnailHandler()} */}
      {/* {
        videos.length && videos.map((d, i) => {
          return (<>
            <p>Video Title : {d.title}</p>
            <p>Video Description : {d.description}</p>
            {
              d.video_path ? (
                <video className="video-play" controls>
                  <source
                    src={d.video_path}
                    type="video/mp4"
                    controls
                  />
                  Your browser does not support the video tag
                </video>) : ""
            }

          </>)
        })
      } */}
    </Base>
  );
};

export default Home;
