import React, { useEffect, useState } from "react";
import Base from "../core/Base";
import { signout, isAutheticated } from "../auth/helper";
import axios from "axios";
import { Link, Outlet, NavLink } from "react-router-dom";
import { API } from "../backend";
function Profile() {
  const { user } = isAutheticated();
  const [userInfo, setUserInfo] = useState([]);
  const [profilePic, setProfilePic] = useState([]);
  const getUser = () => {
    axios
      .get(`${API}/user/${user._id}`)
      .then((response) => {
        setUserInfo(response.data.lastname);
        console.log(userInfo, "response.data");
        setProfilePic(response.data.profilePhoto);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getUser();
  }, []);
  return (
    <Base>
      <div className="mt-5 pt-5">
        <div className="bg-dark rounded pl-5 pr-5 pt-5 shadow-lg">
          <div className="d-flex ms-3 pe-5 gap-2 align-items-center">
            <img
              style={{ height: "65px", width: "65px" }}
              src={profilePic ? `http://localhost:8000/${profilePic}` : ""}
              className="rounded-circle"
              alt="profile"
            />
            <div className="align-self-center">
              <p>
                {isAutheticated() && user.name} &nbsp;
                {isAutheticated() && userInfo}
              </p>
              <p className="text-muted">No subscribers</p>
            </div>
          </div>
          <div>
            <ul className=" d-flex mt-5" style={{ listStyle: "none" }}>
              {/* <li className="nav-item">
                <NavLink
                  to="/profile/Home"
                  className={(navData) =>
                    navData.isActive ? "activeLink nav-link " : "nav-link "
                  }
                  aria-current="page"
                  href="#"
                >
                  Home
                </NavLink>
              </li>{" "} */}
              <li className="nav-item">
                <NavLink
                  to="/profile/Videos"
                  className={(navData) =>
                    navData.isActive ? "activeLink nav-link " : "nav-link "
                  }
                  aria-current="page"
                  href="#"
                >
                  Videos
                </NavLink>
              </li>{" "}
              {/* <li className="nav-item">
                <NavLink
                  to="/profile/Playlist"
                  className={(navData) =>
                    navData.isActive ? "activeLink nav-link " : "nav-link "
                  }
                  aria-current="page"
                  href="#"
                >
                  Playlist
                </NavLink>
              </li>{" "} */}
              <li className="nav-item">
                <NavLink
                  to="/profile/Channel"
                  className={(navData) =>
                    navData.isActive ? "activeLink nav-link " : "nav-link "
                  }
                  aria-current="page"
                  href="#"
                >
                  Channel
                </NavLink>
              </li>{" "}
              <li className="nav-item">
                <NavLink
                  to="/profile/About"
                  className={(navData) =>
                    navData.isActive ? "activeLink nav-link " : "nav-link "
                  }
                  aria-current="page"
                  href="#"
                >
                  About
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
        <Outlet />
      </div>
    </Base>
  );
}

export default Profile;
