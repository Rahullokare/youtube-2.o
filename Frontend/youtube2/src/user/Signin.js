import React, { useState } from "react";
import classes from '../assets/styles/signup.module.css'
import logo from '../assets/edited.png'
import { API } from '../backend.js'
import { useForm } from "react-hook-form";
import { Navigate, useNavigate, Link } from 'react-router-dom'
import axios from 'axios'
function SignIn() {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const onSubmit = data => {
    console.log(data);
    axios.post(`${API}/signin`, {
      email: data.email,
      password: data.password
    }).then((response) => {
      console.log(response.data)
      localStorage.setItem('auth_token', response.data.token)
      navigate("/")
    }).catch((err) => {
      if (err.response.data) {

        console.log(err.response.data.err)
        setError(err.response.data.err)
      }


    })
  }
  return (
    <div className={classes.signupContainer}>
      <div className="text-center">

        <form onSubmit={handleSubmit(onSubmit)} className="text-dark">
          <div className="text-center">
            <img className='img-fluid mb-4 ' style={{ width: "300px" }} src={logo} alt="logo" />
          </div>
          {/* second row */}

          <div className="form-floating mb-3">
            <input
              type="email"
              className="form-control"
              id="floatingInput"
              placeholder="name@example.com"
              {...register("email", { required: true })}
            />
            <label htmlFor="floatingInput">Email address</label>
          </div>
          {errors.email && <span className='text-danger'>This field is required</span>}

          <div className="form-floating mb-3">
            <input
              type="password"
              className="form-control"
              id="floatingPassword"
              placeholder="Password"
              {...register("password", { required: true })}
            />
            <label htmlFor="floatingPassword">Password</label>
          </div>
          {errors.password && <span className='text-danger'>This field is required</span>}
          <div className="text-white mb-3">Not a user? &nbsp;
            <Link to='/signup'>
              signup
            </Link>
          </div>
          {error ? <p className="text-danger"> {error}</p> : ""}
          <div className="d-grid gap-2">
            <button type="submit" className="btn btn-primary btn-lg p-2 rounded d-block">Sign in</button>
          </div>

        </form>
      </div >
    </div >
  );
}

export default SignIn;
