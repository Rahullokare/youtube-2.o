import React, { useEffect, useState } from "react";
import { API } from "../backend";
import VideoCard from "../videos/VideoCard";
import Base from "./Base";
import axios from 'axios'
const Home = () => {
  const [thumbnail, setThumbnail] = useState({})
  useEffect(() => {

  }, []);
  const thumbnailHandler = () => {
    axios.get(`${API}/thumbnail/getAll`)
      .then((response) => {
        setThumbnail(response.data)
      })
      .catch((error) => {
        console.log(error)
      })
  }


  return (
    <Base className=" container-fluid mt-5">
      <h1>hello home</h1>
      {/* {thumbnailHandler()} */}

    </Base>
  );
};

export default Home;
