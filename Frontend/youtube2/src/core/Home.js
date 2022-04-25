import React, { useEffect, useState } from "react";
import { API } from "../backend";
import VideoCard from "../videos/VideoCard";
import Base from "./Base";
import axios from "axios";
const Home = () => {
  const [videos, setVideos] = useState({});
  const [categorySelected, SetCategorySelected] = useState("All");
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
  useEffect(() => {
    thumbnailHandler();
  }, []);
  const Category = [
    "All",
    "Entertainment",
    "Education",
    "Programming",
    "Music",
    "Stocks",
    "Finance",
    "Fitness",
  ];
  return (
    <Base className=" container-fluid mt-5 pt-5">
      {/* <h1>hello home</h1> */}
      <div className="d-flex gap-2 ms-3 ">
        {Category.map((d, i) => {
          return (
            <p
              onClick={() => {
                SetCategorySelected(d);
              }}
              className={"border border-danger p-2 rounded"}
              style={{
                cursor: "pointer",
                fontSize: "14px",
                border:
                  "1px solid linear-gradient(180deg, #FFC700 0%, #FF0000 100%)",
              }}
              key={i}
            >
              {d}
            </p>
          );
        })}
      </div>
      <div>
        <div className="d-flex ms-4  flex-wrap gap-3">
          {/* by default all category */}
          {videos.length && categorySelected == "All"
            ? videos.map((videoInfo, i) => {
                return <VideoCard key={i} videoInfo={videoInfo} />;
              })
            : videos.length &&
              videos
                .filter((e) => {
                  return e.category == categorySelected;
                })
                .map((videoInfo, i) => {
                  return <VideoCard key={i} videoInfo={videoInfo} index={i} />;
                })}
        </div>
      </div>

      {/* {videos.length &&
        videos.map((d, i) => {
          return (
            <>
              <p>Video Title : {d.title}</p>
              <p>Video Description : {d.description}</p>
              {d.video_path ? (
                <video className="video-play" controls>
                  <source src={d.video_path} type="video/mp4" controls />
                  Your browser does not support the video tag
                </video>
              ) : (
                ""
              )}
            </>
          );
        })} */}
    </Base>
  );
};

export default Home;
