import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import Loader from "../Components/Loader";
import { showFailureToaster } from "../utils/toaster";
import Error from "../Components/Error";
import { auth } from "../services/authService";

const LoginScreen = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (auth.getCurrentUserDetails()) navigate("/");
  }, [user]);

  const handleChange = (e) => {
    setUser((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { error } = auth.loginSchema.validate(user);
    if (error) return showFailureToaster(error.message);

    try {
      const isLogin = await auth.login({ ...user });
      if (isLogin) navigate("/");

      // setUser({ name: "", email: "", password: "", userType: "" });
    } catch (error) {}
  };

  function myFunction() {
    let x = document.getElementById("password-field");
    if (x.type === "password") x.type = "text";
    else x.type = "password";
  }

  return (
    <div className="loginScreen">
      <form className="col-md-5 form" onSubmit={handleSubmit}>
        <div className="custom-form bg-white rounded">
          <h2>Login:</h2>
          <input
            name="email"
            type="email"
            className="form-control input"
            placeholder="Enter Email"
            onChange={handleChange}
            autoComplete="email"
            required
          ></input>
          <br />
          <input
            id="password-field"
            name="password"
            type="password"
            className="form-control input"
            placeholder="Enter Password"
            onChange={handleChange}
            autoComplete="password"
            required
          ></input>
          <br />
          <input type="checkbox" onClick={myFunction} />
          Show Password
          <br />
          <button className="btn btn-primary m-3" type="submit">
            Log In
          </button>
          <button className="btn btn-primary m-3">
            <Link to="/register" className="link">
              Register
            </Link>
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginScreen;