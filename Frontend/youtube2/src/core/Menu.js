import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/svg/logo.svg";
import axios from "axios";
import { API } from "../backend";
import { signout, isAutheticated } from "../auth/helper";
import { useForm } from "react-hook-form";
import { BeatLoader } from "react-spinners";
import swal from "sweetalert";

// import { CloudUpload } from "@mui/icons-material";
function Menu() {
  const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState();
  const [preview, setPreview] = useState();
  const [loading, setLoading] = useState(true);
  // user channel created or note
  const [IsuserChannelCreated, setIsuserChannelCreated] = useState(false);

  // create vide info
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [category, setCategory] = useState("");
  const [error, setError] = useState("");
  const [file, setFile] = useState(null);
  const [thumbnail, setThumbnail] = useState(null);

  //user info
  const [profile, setProfile] = useState("");

  const { token, user } = isAutheticated();

  const createVideo = (e) => {
    e.preventDefault();
    setLoading(true);
    // console.log(data);
    if (title && desc && category && file) {
      setError("");
      const video = new FormData();

      video.append("title", title);
      video.append("description", desc);
      video.append("category", category);
      video.append("video", file);
      // video.append("thumb", thumbnail);

      console.log(video);

      // for (var key of bodyFormData.entries()) {
      //   console.log(key[0] + ", " + key[1], "bodyFormData");
      // }
      axios
        .post(`${API}/video/create/${user._id}`, video, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          console.log(response.data, "video");
          setLoading(false);
          swal(
            "Yaaaaaaaay!",
            `Your Video ${response.data.vid.title} Uploaded SucessFully!`,
            "success"
          );
        })
        .catch((err) => {
          swal("Ooops!", `${err.response.data.error}`, "warning");
          console.log(err.response.data);
        });
    } else {
      setError("All Fields Are Required...");
    }
  };
  // create a preview as a side effect, whenever selected file is changed
  useEffect(() => {
    if (!selectedFile) {
      setPreview(undefined);
      return;
    }

    const objectUrl = URL.createObjectURL(selectedFile);
    setPreview(objectUrl);

    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile]);

  const onSelectFile = (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFile(undefined);
      return;
    }

    // I've kept this example simple by using the first image instead of multiple
    setSelectedFile(e.target.files[0]);
  };
  const UserChannelCreatedChecker = () => {
    if (isAutheticated()) {
      axios
        .get(`${API}/finduserchannels/${user._id}`)
        .then((res) => {
          console.log(res.data, "sdsd");
          setIsuserChannelCreated(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  const userInfoFetcher = () => {
    if (isAutheticated()) {
      axios
        .get(`${API}/user/${user._id}`)
        .then((res) => {
          console.log(res.data, "profile");
          setProfile(res.data.profilePhoto);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  useEffect(() => {
    userInfoFetcher();
    UserChannelCreatedChecker();
  }, []);

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
              {/* <p>
                <Link to="/VideoView" className="nav-link px-2 ">
                  VideoView
                </Link>
              </p> */}
              <div className="mb-3">
                {isAutheticated() && (
                  <Link to="/Profile">
                    <img
                      src={
                        profile
                          ? `http://localhost:8000/${profile}`
                          : "https://i.pravatar.cc/30"
                      }
                      style={{ height: "28px", width: "28px" }}
                      className="rounded-circle img-fluid"
                      alt="profile"
                    />{" "}
                    &nbsp;&nbsp;
                    <p className="btn px-2 ">{isAutheticated() && user.name}</p>
                  </Link>
                )}
              </div>
              {isAutheticated() && (
                <p>
                  <button
                    onClick={() => {
                      signout(() => {
                        navigate("/");
                      });
                    }}
                    className="btn btn-danger"
                    style={{ backgroundColor: "#dc3545 !important" }}
                  >
                    <i class="fa-solid fa-arrow-right-from-bracket"></i> Logout
                  </button>
                </p>
              )}
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
            <div onClick={() => navigate("/")}>
              <img
                src={logo}
                style={{ height: "74px", marginLeft: "50px" }}
                className="img-fluid ms-6"
                alt="logo"
              />
            </div>

            {/* Search Input Cont ent */}
            <div className="search-container">
              <div class="input-group">
                <input
                  type="search"
                  class="form-control rounded"
                  placeholder="Search"
                  aria-label="Search"
                  aria-describedby="search-addon"
                />
                <button type="button" class="btn btn-outline-primary">
                  search
                </button>
              </div>
            </div>
            {/* upload */}
            {isAutheticated() && IsuserChannelCreated.length ? (
              <button
                className="btn  rounded ms-auto"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
                data-bs-whatever="@mdo"
                style={{ fontSize: "14px" }}
              >
                upload &nbsp; <i class="fas fa-upload "></i>
              </button>
            ) : (
              ""
            )}
            {isAutheticated() ? (
              ""
            ) : (
              <button
                className="btn  rounded ms-auto"
                onClick={() => navigate("/signin")}
              >
                Sign in &nbsp;
              </button>
            )}

            {/* username */}

            <Link
              to="/profile/"
              Link
              className="d-flex  ms-auto me-5  gap-2 align-items-center"
            >
              {isAutheticated() && (
                <>
                  <img
                    src={
                      profile
                        ? `http://localhost:8000/${profile}`
                        : "https://i.pravatar.cc/30"
                    }
                    style={{ height: "28px", width: "28px" }}
                    className="rounded-circle img-fluid"
                    alt="profile"
                  />
                  <div className="align-self-center">
                    <p>{isAutheticated() && user.name}</p>
                  </div>
                </>
              )}
            </Link>
          </div>
          {/* upload video popup */}
          <div
            className="modal fade"
            id="exampleModal"
            tabindex="-1"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog modal-fullscreen-xxl-down">
              <div className="modal-content">
                <div className="modal-header text-black">
                  <h5 className="modal-title" id="exampleModalLabel">
                    Upload Video
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>

                <div className="modal-body text-black">
                  <form onSubmit={createVideo}>
                    <div className="mb-3">
                      <label for="recipient-name" className="col-form-label">
                        Video Title
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="recipient-name"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        // {...register("title", { required: true })}
                      />
                      {/* {errors.title && (
                        <span className="text-danger">
                          This field is required
                        </span>
                      )} */}
                    </div>
                    <div className="mb-3">
                      <label for="message-text" className="col-form-label">
                        Video Description
                      </label>
                      <textarea
                        className="form-control"
                        id="message-text"
                        value={desc}
                        onChange={(e) => setDesc(e.target.value)}
                        // {...register("description", { required: true })}
                      ></textarea>
                      {/* {errors.description && (
                        <span className="text-danger">
                          This field is required
                        </span>
                      )} */}
                    </div>
                    <div className="mb-3">
                      <label for="message-text" className="col-form-label">
                        Video Category
                      </label>
                      <select
                        class="form-select"
                        aria-label="Default select example"
                        onChange={(e) => setCategory(e.target.value)}
                      >
                        <option selected>Open this select menu</option>
                        <option value="Entertainment">Entertainment</option>
                        <option value="Education">Education</option>
                        <option value="Programming">Programming</option>
                        <option value="Music">Music</option>
                        <option value="Stocks">Stocks</option>
                        <option value="Finance">Finance</option>
                        <option value="Fitness">Fitness</option>
                      </select>
                    </div>
                    <div className="mb-3">
                      <div class="mb-3">
                        <label for="formFile" class="form-label">
                          Upload Video
                        </label>
                        <input
                          class="form-control"
                          type="file"
                          id="formFile"
                          onChange={(e) => {
                            setFile(e.target.files[0]);
                          }}
                          // {...register("video", {
                          //   required: true,
                          // })}
                          accept="video/mp4,video/x-m4v,video/*"
                        />
                        {/* {errors.video && (
                          <span className="text-danger">
                            This field is required
                          </span>
                        )} */}
                      </div>
                      {selectedFile && (
                        <video width="400" controls>
                          <source src={preview} />
                        </video>
                      )}
                    </div>
                    {/* <button type="submit" className="btn btn-primary">
                      Upload Video
                    </button> */}

                    {/* THUMBANAIL */}
                    <div className="mb-3">
                      <div class="mb-3">
                        <label for="formFile" class="form-label">
                          Upload Thumbnail
                        </label>
                        <input
                          class="form-control"
                          type="file"
                          id="formFile"
                          onChange={(e) => setThumbnail(e.target.files[0])}
                          // {...register("video", {
                          //   required: true,
                          // })}
                          accept=".png, .jpeg, .jpg"
                        />
                        {/* {errors.video && (
                          <span className="text-danger">
                            This field is required
                          </span>
                        )} */}
                      </div>
                      {/* {selectedFile && (
                        <video width="400" controls>
                          <source src={preview} />
                        </video>
                      )} */}
                    </div>
                    {error && <p className="text-danger">{error}</p>}
                    <button type="submit" className="btn btn-primary">
                      Upload Video
                    </button>
                  </form>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-bs-dismiss="modal"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
          {/* upload video popup */}
        </div>
      </header>
    </div>
  );
}

export default Menu;
