import React, { useEffect, useState } from "react";
import { API } from "../backend";
import Base from "../core/Base";
import classes from '../assets/styles/explore.module.css'
import axios from 'axios'
function Explore() {
  const [channels, setChannels] = useState([])


  const fetchChannels = () => {
    axios.get(`${API}/channels`)
      .then((response) => {
        console.log(response.data)
        setChannels(response.data)
      }).catch((err) => {
        console.log(err)
      })
  }
  useEffect(() => {
    fetchChannels()

  }, []);

  return (
    <Base>
      {/* {fetchChannels()} */}
      <h1 className="mb-4">Explore More</h1>

      <div className={`container ${classes.containerExplore}`}>
        {
          channels.length &&
          channels.map((d, i) => {
            return (

              <div class="card" style={{ width: "14rem", height: '10rem' }} key={i}>
                {/* <img src="" class="card-img-top" alt="..." /> */}
                <div class="card-body">
                  <h5 class="card-title">{d.channel_name}</h5>
                  <p class="card-text">{d.channel_description}</p>
                  <a href="#" class="btn btn-primary" style={{ position: 'absolute', top: '100px' }}>Subscribe</a>
                </div>
              </div>

            )
          })
        }
      </div>

      {console.log(channels, "channeles")}
    </Base>
  );
}

export default Explore;
