import React, { useState } from "react";
import Base from "../core/Base";
import { Navigate } from "react-router-dom";

import { signin, authenticate, isAutheticated } from "../auth/helper/index.js";
import logo from '../assets/svg/logo.svg'

const Signin = () => {
  const [values, setValues] = useState({
    email: "test1045@gmail.com",
    password: "12345",
    error: "",
    loading: false,
    didRedirect: false
  });

  const { email, password, error, loading, didRedirect } = values;
  const { user } = isAutheticated();

  const handleChange = name => event => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const onSubmit = event => {
    event.preventDefault();
    setValues({ ...values, error: false, loading: true });
    signin({ email, password })
      .then(data => {
        if (data.error) {
          setValues({ ...values, error: data.error, loading: false });
          console.log(data.error);
        } else {
          authenticate(data, () => {
            setValues({
              ...values,
              didRedirect: true
            });
          });
        }
      })
      .catch(console.log("signin request failed"));
  };

  const performRedirect = () => {
    if (didRedirect) {
      if (user && user.role === 1) {
        return <Navigate to="/admin/dashboard" />;
      } else {
        return <Navigate to="/user/dashboard" />;
      }
    }
    if (isAutheticated()) {
      return <Navigate to="/" />;
    }
  };

  const loadingMessage = () => {
    return (
      loading && (
        <div className="alert alert-info">
          <h2>Loading...</h2>
        </div>
      )
    );
  };

  const errorMessage = () => {
    return (
      <div className="">
        <div className="">
          <div
            className="alert alert-danger"
            style={{ display: error ? "" : "none" }}
          >
            {error}
          </div>
        </div>
      </div>
    );
  };

  const signInForm = () => {
    return (
      <div className="d-flex mt-3 justify-content-center  ">
        
        <div className="border rounded border-danger p-5">
        <div className="text-center mb-3">
            <img src={logo} style={{ width: "200px" }} className="img-fluid ms-6" alt="logo" />
          </div>
          {errorMessage()}
          <form>
            <div className="form-group mt-3">
              <label className="text-light">Email</label>
              <input
                onChange={handleChange("email")}
                value={email}
                className="form-control"
                type="email"
              />
            </div>
            
            <div className="form-group mt-3">
              <label className="text-light">Password</label>
              <input
                onChange={handleChange("password")}
                value={password}
                className="form-control"
                type="password"
              />
            </div>
            <div class="d-grid gap-2">
            <button onClick={onSubmit} style={{ background: 'linear-gradient(180deg, #FFC700 0%, #FF0000 100%)' }} className="btn btn-success btn-lg mt-3">
              SignIn
              </button>

            </div>
          </form>
        </div>
      </div>
    );
  };

  return (
    <div className='mb-5'>


      {loadingMessage()}
      
      {signInForm()}
      {performRedirect()}

      {/* <p className="text-white text-center">{JSON.stringify(values)}</p> */}
    </div >
  );
};

export default Signin;
