import React, { useState } from "react";
import classes from '../assets/styles/signup.module.css'
import logo from '../assets/edited.png'
import { API } from '../backend.js'
import { useForm } from "react-hook-form";
import { Navigate, useNavigate, Link } from 'react-router-dom'
import axios from 'axios'
function Signup() {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const [error, setError] = useState('');

  const navigate = useNavigate();
  const onSubmit = data => {
    console.log(data);
    axios.post(`${API}/signup`, {
      name: data.firstname,
      lastname: data.lastname,
      email: data.email,
      password: data.password
    }).then((response) => {

      // if (response.error) {
      //   setError(response.error)
      //   console.log(response.error)
      // } else {
      //   navigate("/")

      // }
      navigate("/signin")

    }).catch((err) => {
      if (err.response.data) {

        console.log(err.response.data.err)
        setError(err.response.data.err)
      }


      // setError(err.response.data.err)
    })
  }
  return (
    <div className={classes.signupContainer}>
      <div className="">

        <form onSubmit={handleSubmit(onSubmit)} className="text-dark">
          <div className="text-center">
            <img className='img-fluid mb-4 ' style={{ width: "300px" }} src={logo} alt="logo" />
          </div>
          {/* first row */}
          <div className='row'>
            <div className='col-6'>
              <div className="form-floating mb-3">
                <input
                  type="text"
                  className="form-control border-primary"
                  id="floatingInput"
                  placeholder="name@example.com"
                  style={errors ? { border: "1px solid red" } : ""}
                  {...register("firstname", { required: true })}
                />
                <label htmlFor="floatingInput">First Name</label>
              </div>
              {errors.firstname && <span className='text-danger'>This field is required</span>}
            </div>
            <div className='col-6'>
              <div className="form-floating mb-3">
                <input
                  type="text"
                  className="form-control"
                  id="floatingInput"
                  placeholder="name@example.com"
                  {...register("lastname", { required: true })}
                />
                <label htmlFor="floatingInput">Last Name</label>
              </div>
              {errors.lastname && <span className='text-danger'>This field is required</span>}
            </div>
          </div>
          {/* second row */}
          <div className='row'>
            <div className='col-6'>
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
            </div>
            <div className='col-6'>

              <div className="form-floating">
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
            </div>

          </div>
          <div className="text-white mb-3">Already a user? &nbsp;
            <Link to='/signin'>
              signin
            </Link>
          </div>
          {error && <p className="text-danger"> {error}</p>}
          <div className="d-grid gap-2">
            <button type="submit" className="btn  btn-lg p-2 rounded d-block">Signup</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;
