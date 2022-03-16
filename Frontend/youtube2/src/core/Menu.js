import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from '../assets/svg/logo.svg'
import axios from 'axios'
import { API } from "../backend";
import { signout, isAutheticated } from "../auth/helper";
// import { CloudUpload } from "@mui/icons-material";
function Menu() {
  const navigate = useNavigate()
  //   const [user, setUser] = useState([])
  //  const userInfo =  JSON.parse(localStorage.getItem('auth_token') )

  //  const getUser = ()=>{
  //   axios.get(`${API}/user/${userInfo.user._id}`).then((response)=>{
  //    console.log(response.data)
  //    setUser(response)
  //   }).catch(err=>console.log(err))
  //  }
  //  useEffect(() => {
  //   getUser()
  //  }, [])
  const { user } = isAutheticated()

  return (
    <div className="shadow-lg">
      <header className="p-3 mb-3 me-3">
        <div className="container-fluid">
          {/* Sidebar Menu */}
          <div
            className="offcanvas text-success offcanvas-start"
            tabIndex="-1"
            id="offcanvasWithBackdrop"
            aria-labelledby="offcanvasWithBackdropLabel"
          >
            <div className="offcanvas-header ">
              <i
                className="fas fa-2x fa-bars"
                data-bs-dismiss="offcanvas"
                aria-label="Close"
              ></i>
            </div>
            <div className="offcanvas-body">
              <p>
                <Link to="/" className="nav-link px-2 link-white">
                  Home
                </Link>
              </p>
              <p>
                <Link to="/Explore" className="nav-link px-2 link-white">
                  Explore
                </Link>
              </p>
              <p>
                <Link to="/Subscriptions" className="nav-link px-2 link-white">
                  Subscriptions
                </Link>
              </p>
              <p>
                <Link to="/SaveVideos" className="nav-link px-2 ">
                  SaveVideos
                </Link>
              </p>
              <p>
                <Link to="/VideoView" className="nav-link px-2 ">
                  VideoView
                </Link>
              </p>
              <div className="mb-3">
              {isAutheticated() &&
                <Link to="/Profile" >
                   <img src="https://i.pravatar.cc/30" className="rounded-circle" alt="profile" /> &nbsp;&nbsp;
                  <p className="btn px-2 ">
                    {isAutheticated() && user.name}
                  </p>
                </Link >
              }
              </div>
              <p>
                <button onClick={() => {
                  signout(() => {
                    navigate('/')
                  })
                }} 
                className="btn btn-danger"
                style={{backgroundColor:'#dc3545'}}
                >
                  Logout
                </button>
              </p>
            </div>
          </div>
          {/* Header Content */}
          <div className="d-flex fixed-top pb-4 ps-4 shadow-lg bg-dark  pt-3 align-items-center ">
            <div
              className="hamburger "
              data-bs-toggle="offcanvas"
              data-bs-target="#offcanvasWithBackdrop"
              aria-controls="offcanvasWithBackdrop"
            >
              <i className="fas  fa-bars"></i>
            </div>
            <div onClick={()=> navigate('/')}>
              <img src={logo} style={{ height: "74px", marginLeft: "50px" }} className="img-fluid ms-6" alt="logo" />
            </div>

            {/* Search Input Cont ent */}
            <div className="search-container">
              <div class="input-group">
                <input type="search" class="form-control rounded" placeholder="Search" aria-label="Search" aria-describedby="search-addon" />
                <button type="button" class="btn btn-outline-primary">search</button>
              </div>
            </div>
            {/* upload */}
            <button className="btn  rounded ms-auto">
              upload    &nbsp;   <i class="fas fa-upload "></i>
            </button>
            {/* username */}
            <div className="d-flex ms-3 pe-5 gap-2 align-items-center">
              <img src="https://i.pravatar.cc/30" className="rounded-circle" alt="profile" />
              <div className="align-self-center"> 
              <p>{isAutheticated() && user.name}</p>
              </div>
            </div>
          </div>
        </div>

      </header>
    </div>
  );
}

export default Menu;
