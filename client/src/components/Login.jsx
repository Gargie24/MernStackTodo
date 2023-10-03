import React from "react";
import { useState, useEffect } from "react";
import { login } from ".././services/api.js";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import Header from "./partials/Header";
import "react-toastify/dist/ReactToastify.css";
function Login() {
  const [form, setForm] = useState({
    username: "",
    password: "",
  });
  const navigation = useNavigate();
  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      return navigation("/");
    }
  }, []);

  const [errors, setErrors] = useState(null);
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  <ToastContainer />;
  const handleSubmit = async () => {
    console.log(form);
    const result = await login(form);
    console.log("form", result);
    setErrors(null);

    if (result.status === 200) {
      if (result.data.status === 200) {
        localStorage.setItem("user", JSON.stringify(result.data.data));
        navigation("/");

        return;
      }
      if (result.data.status === 200) {
        setErrors(result.data.data);
        return;
      }

      if (result.data.status == 202) {
        toast(result.data.message);
        return;
      }
    }
  };

  return (
    <>
      <Header />
      <div className="container">
        <div className="row justify-content-center mt-4">
          <div className="col-lg-5 card border-primary mt-4">
            <div className="card-header"></div>
            <div className="card-body">
              <h4 className="card-title">Login Now</h4>
              <div className="form-group">
                <label htmlFor="exampleInputEmail1" className="form-label mt-4">
                  Email or username
                </label>
                <input
                  type="email"
                  onChange={handleChange}
                  name="username"
                  className="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  placeholder="Enter email or username"
                />
                {errors?.username && (
                  <small id="emailHelp" className="form-text text-muted">
                    {errors.username.message}
                  </small>
                )}
              </div>
              <div className="form-group">
                <label htmlFor="exampleInputEmail1" className="form-label mt-4">
                  password
                </label>
                <input
                  type="password"
                  onChange={handleChange}
                  name="password"
                  className="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  placeholder="Enter your password"
                />
                {errors?.password && (
                  <small id="emailHelp" className="form-text text-muted">
                    {errors.password.message}
                  </small>
                )}
              </div>
              <button
                type="button"
                onClick={handleSubmit}
                className="btn btn-primary mt-4"
              >
                Login
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
