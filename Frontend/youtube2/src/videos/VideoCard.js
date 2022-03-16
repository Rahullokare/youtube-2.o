import React, { useEffect, useState } from "react";
import { API } from "../backend.js";
import thubmnaila from "../assets/coding.jpg";
import classes from "./VideoCard.module.css";
import { Link } from "react-router-dom";
const VideoCard = ({i}) => {
  const [user, setUser] = useState({});

  // useEffect(() => {
  //   fetch(`${API}/api/user/${props.thumbnails.userId}`)
  //     .then((response) => response.json())
  //     .then((data) => setUser(data.user));
  // }, []);

  return (
    <div className={classes.Videocard}>
      <img src='https://picsum.photos/200/300' className="card-img-top img-fluid" />
      <div className="card-body">
        <div className={classes.videInfo}>
          <img src={`https://picsum.photos/seed/${i}/20/30`} className="rounded-circle img-fluid" />
          <div>
            <p className="text-muted">Video Title is here</p>
            <p className="text-muted">Deveolpers_Choice</p>
            <div className="d-flex gap-3">
              <p className={`${classes.views} text-muted fs-6`}>2.4M views</p>
              <p className={`${classes.views} text-muted fs-6`}>Streamed 1 month ago</p>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoCard;
