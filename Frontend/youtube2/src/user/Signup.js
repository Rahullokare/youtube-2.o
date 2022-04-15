import React, { useState } from "react";
import classes from "../assets/styles/signup.module.css";
import logo from "../assets/svg/logo.svg";
import play from "../assets/svg/play.svg";

import { API } from "../backend.js";
import { useForm } from "react-hook-form";
import { Navigate, useNavigate, Link } from "react-router-dom";
import axios from "axios";
function Signup() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const [name, setName] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [file, setFile] = useState(null);

  const [error, setError] = useState("");

  const navigate = useNavigate();
  const onSubmit = (e) => {
    e.preventDefault();

    const profilePhoto = new FormData();

    profilePhoto.append("name", name);
    profilePhoto.append("lastname", lastname);
    profilePhoto.append("email", email);
    profilePhoto.append("password", password);
    profilePhoto.append("profilePhoto", file);
    console.log(file, "data.file");
    // for (var key of profilePhoto.entries()) {
    //   console.log(key[0] + ", " + key[1], "profilePhoto");
    // }
    axios
      .post(`${API}/signup`, profilePhoto, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        // if (response.error) {
        //   setError(response.error)
        //   console.log(response.error)
        // } else {
        //   navigate("/")

        // }
        navigate("/signin");
      })
      .catch((err) => {
        if (err.response.data) {
          console.log(err.response.data.err);
          setError(err.response.data.err);
        }

        // setError(err.response.data.err)
      });
  };
  return (
    <div className="d-flex justify-content-between p-2 me-5">
      <div className="text-center ps-4 pt-5 mx-auto">
        <img
          className="img-fluid mb-4 "
          style={{ height: "600px" }}
          src={play}
          alt="logo"
        />
      </div>
      <div className="border rounded border-danger p-5 ">
        <form onSubmit={onSubmit} className="text-dark">
          <div className="text-center">
            <img
              className="img-fluid mb-4 "
              style={{ height: "220px" }}
              src={logo}
              alt="logo"
            />
          </div>
          {/* first row */}
          <div className="row mt-4">
            <div className="col-6">
              <div className="form-floating mb-3">
                <input
                  type="text"
                  className="form-control border-primary"
                  id="floatingInput"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  // style={errors ? { border: "1px solid red" } : ""}
                  // {...register("name", { required: true })}
                />
                <label htmlFor="floatingInput">First Name</label>
              </div>
              {/* {errors.name && (
                <span className="text-danger">This field is required</span>
              )} */}
            </div>
            <div className="col-6">
              <div className="form-floating mb-3">
                <input
                  type="text"
                  className="form-control"
                  id="floatingInput"
                  value={lastname}
                  onChange={(e) => setLastname(e.target.value)}
                  // {...register("lastname", { required: true })}
                />
                <label htmlFor="floatingInput">Last Name</label>
              </div>
              {/* {errors.lastname && (
                <span className="text-danger">This field is required</span>
              )} */}
            </div>
          </div>
          {/* second row */}
          <div className="row">
            <div className="col-6">
              <div className="form-floating ">
                <input
                  type="email"
                  className="form-control"
                  id="floatingInput"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  // {...register("email", { required: true })}
                />
                <label htmlFor="floatingInput">Email address</label>
              </div>
              {errors.email && (
                <span className="text-danger">This field is required</span>
              )}
            </div>
            <div className="col-6">
              <div className="form-floating">
                <input
                  type="password"
                  className="form-control"
                  id="floatingPassword"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  // {...register("password", { required: true })}
                />
                <label htmlFor="floatingPassword">Password</label>
              </div>
              {errors.password && (
                <span className="text-danger">This field is required</span>
              )}
            </div>
          </div>
          <div class="mb-3">
            <label for="formFileSm" class="form-label">
              Small file input example
            </label>
            <input
              class="form-control form-control-sm"
              id="formFileSm"
              type="file"
              onChange={(e) => {
                setFile(e.target.files[0]);
              }}
              accept=".png, .jpeg, .jpg"
              // {...register("profilePhoto", { required: true })}
            />
            {errors.profilePhoto && (
              <span className="text-danger">This field is required</span>
            )}
          </div>
          <div className="text-white mb-3">
            Already a user? &nbsp;
            <Link to="/signin">signin</Link>
          </div>
          {error && <p className="text-danger"> {error}</p>}
          <div className="d-grid gap-2">
            <button
              type="submit"
              style={{
                background: "linear-gradient(180deg, #FFC700 0%, #FF0000 100%)",
              }}
              className="btn  btn-lg p-2 rounded d-block"
            >
              Signup
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;
