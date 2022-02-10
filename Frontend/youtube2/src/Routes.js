import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Explore from "./videos/Explore";
import Home from "./core/Home";
import Subscriptions from "./user/Subscriptions";
import Signin from "./user/Signin";
import Signup from "./user/Signup";
import SaveVideos from "./videos/SaveVideos";
import VideoView from "./videos/VideoView";

const MainRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/Explore" element={<Explore />}></Route>
        <Route path="/Signin" element={<Signin />}></Route>
        <Route path="/Signup" element={<Signup />}></Route>
        <Route path="/Subscriptions" element={<Subscriptions />}></Route>
        <Route path="/SaveVideos" element={<SaveVideos />}></Route>
        <Route path="/VideoView" element={<VideoView />}></Route>
        {/* for 404 route */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
};

export default MainRoutes;
