import React from "react";
import { Link } from "react-router-dom";
import logo from '../assets/edited.png'
function Menu() {
  return (
    <div>
      <header className="p-3 mb-3">
        <div className="container-fluid">
          {/* Sidebar Menu */}
          <div
            className="offcanvas text-success offcanvas-start"
            tabIndex="-1"
            id="offcanvasWithBackdrop"
            aria-labelledby="offcanvasWithBackdropLabel"
          >
            <div className="offcanvas-header">
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
            </div>
          </div>
          {/* Header Content */}
          <div className="d-flex pt-3 align-items-center">
            <div
              className="hamburger "
              data-bs-toggle="offcanvas"
              data-bs-target="#offcanvasWithBackdrop"
              aria-controls="offcanvasWithBackdrop"
            >
              <i className="fas  fa-bars"></i>
            </div>
            <div>
              <img src={logo} style={{ width: "200px", marginLeft: "50px" }} className="img-fluid ms-6" alt="logo" />
            </div>

            {/* Search Input Content */}
            <div className="search-container">
              <input
                className="form-control form-control-sm input-search rounded border"
                type="text"
                placeholder="Search"
                aria-label="Search example"
              />
            </div>
            <button className="btn btn-lg rounded ms-auto">


              upload    &nbsp;   <i class="fas fa-upload "></i> </button>
          </div>
        </div>
      </header>
    </div>
  );
}

export default Menu;
