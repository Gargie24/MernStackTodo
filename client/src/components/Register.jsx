import React from "react";
import { useState, useEffect } from "react";
import { register } from ".././services/api.js";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Header from "./partials/Header";
function Register() {
  const [form, setForm] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState(null);
  const navigation = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      return navigation("/");
    }
  }, []);
  const handleInputChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleSubmit = async () => {
    // console.log(form);
    const result = await register(form);
    console.log(result);

    if (result.status === 200) {
      if (result.data.status === 201) {
        setErrors(result.data.data);
        toast(result.data.message);
        return;
      }

      if (result.data.status === 200) {
        localStorage.setItem("user", JSON.stringify(result.data.data));
        navigation("/");
        return;
      }
      if (result.data.status === 202) {
        toast(result.data.message);
        return;
      }
    } else {
      toast("something went srong");
    }
  };

  return (
    <>
      <Header />
      <div>
        <div className="container">
          <ToastContainer />
          <div className="row justify-content-md-center mt-4">
            <div className="col-lg-5 card border-primary mb-3">
              <div className="card header h4 text-center">
                Register an account
              </div>
              <div className="card-body">
                <div className="form-group">
                  <label className=" col-form-label mt-4">Name</label>
                  <input
                    type="text"
                    name="name"
                    onChange={handleInputChange}
                    className="form-control"
                    placeholder="enter your name"
                  />

                  {errors?.name && (
                    <small id="emailHelp" className="form-text text-muted">
                      {errors.name.message}
                    </small>
                  )}
                </div>
                <div className="form-group">
                  <label className=" col-form-label mt-4">Username</label>
                  <input
                    type="text"
                    name="username"
                    onChange={handleInputChange}
                    className="form-control"
                    placeholder="enter your username"
                  />
                  {errors?.username && (
                    <small id="emailHelp" className="form-text text-muted">
                      {errors.username.message}
                    </small>
                  )}
                </div>

                <div className="form-group">
                  <label className=" col-form-label mt-4">Email</label>
                  <input
                    type="email"
                    name="email"
                    onChange={handleInputChange}
                    className="form-control"
                    placeholder="enter your email"
                  />
                  {errors?.email && (
                    <small id="emailHelp" className="form-text text-muted">
                      {errors.email.message}
                    </small>
                  )}
                </div>

                <div className="form-group">
                  <label className=" col-form-label mt-4">Password</label>
                  <input
                    type="password"
                    name="password"
                    onChange={handleInputChange}
                    className="form-control"
                    placeholder="enter your password"
                  />
                  {errors?.password && (
                    <small id="emailHelp" className="form-text text-danger">
                      {errors.password.message}
                    </small>
                  )}
                </div>
                <div className="row justfiy-content-md-center form-group mt-4">
                  <button
                    type="button"
                    onClick={handleSubmit}
                    className="col-sm-6 btn btn-outline-secondary center"
                  >
                    Register Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Register;
