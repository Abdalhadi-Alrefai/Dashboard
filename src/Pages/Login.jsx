import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const sendData = (event) => {
    event.preventDefault();
    const data = {
      email,
      password,
    };

    fetch("https://vica.website/api/login", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((res) => {
        localStorage.setItem("token", "Bearer " + res.token);
        localStorage.setItem("first_name" , res.user.first_name)
        localStorage.setItem("last_name" , res.user.last_name)
        localStorage.setItem("profile_image" , res.user.profile_image_url)
        navigate("/dashboard");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="login">
      <h1>Sign In</h1>
      <p>Please enter your email and password to continue</p>
      <form onSubmit={sendData}>
        <div>
          <label htmlFor="Email">Email</label>
          <input
            type="email"
            id="email"
            placeholder="Email"
            onChange={(event) => setEmail(event.target.value)}
          />
        </div>
        <div>
          <label htmlFor="Password">Password</label>
          <input
            type="password"
            id="password"
            placeholder="********"
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        <div>
          <input type="submit" value="Sign In" />
        </div>
        <span>Don’t have an account?</span>
        <Link to="signup">Sign up</Link>
      </form>
    </div>
  );
};

export default Login;
