import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Explore from "./videos/Explore";
import Home from "./core/Home";
import Subscriptions from "./user/Subscriptions";
import Signin from "./user/Signin";
import Signup from "./user/Signup";
import Profile from "./user/Profile";
import SaveVideos from "./videos/SaveVideos";
import VideoView from "./videos/VideoView";
import ProfileHome from "./user/ProfileHome";
import ProfileVideos from "./user/ProfileVideos";
import ProfilePlayList from "./user/ProfilePlayList";
import ProfileChannel from "./user/ProfileChannel";
import ProfileAbout from "./user/ProfileAbout";
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
        <Route path="/VideoView/:videoId" element={<VideoView />}></Route>
        <Route path="/profile/*" element={<Profile />}>
          <Route path="Home" element={<ProfileHome />}></Route>
          <Route path="Videos" element={<ProfileVideos />}></Route>
          <Route path="Playlist" element={<ProfilePlayList />}></Route>
          <Route path="channel" element={<ProfileChannel />}></Route>
          <Route path="About" element={<ProfileAbout />}></Route>
        </Route>
        {/* for 404 route */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
};

export default MainRoutes;
