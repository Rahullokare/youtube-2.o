import React, { useEffect, useState } from "react";
import { API } from "../backend";
import Base from "../core/Base";
import classes from "../assets/styles/explore.module.css";
import axios from "axios";
function Explore() {
  const [channels, setChannels] = useState([]);

  const fetchChannels = () => {
    axios
      .get(`${API}/channels`)
      .then((response) => {
        console.log(response.data);
        setChannels(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    fetchChannels();
  }, []);
  const truncatingString = (str, n) => {
    if (str.length >= n) {
      return str.slice(0, n).concat("...");
    } else {
      return str;
    }
  };

  return (
    <Base>
      {/* {fetchChannels()} */}
      <div className="pt-5 mt-5">
        <h1 className="mb-4 ">Explore More Channels</h1>

        <div className={`container ${classes.containerExplore}`}>
          {channels.length &&
            channels.map((d, i) => {
              return (
                <div
                  class="card"
                  style={{ width: "19rem", height: "12rem" }}
                  key={i}
                >
                  {/* <img src="" class="card-img-top" alt="..." /> */}
                  <div class="card-body">
                    <img
                      src="https://i.pravatar.cc/30"
                      className="rounded-circle"
                      alt="profile"
                    />

                    <h5 class="card-title">{d.channel_name}</h5>
                    <p class="card-text">
                      {truncatingString(d.channel_description, 30)}
                    </p>
                    <a href="#" class="btn btn-primary">
                      Subscribe
                    </a>
                  </div>
                </div>
              );
            })}
        </div>

        {console.log(channels, "channeles")}
      </div>
    </Base>
  );
}

export default Explore;
