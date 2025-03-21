import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const SignUp = () => {
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password_confirmation, setPasswordConfirmation] = useState("");
  const [profile_image_url, setProfileImage] = useState(null);
  const navigate = useNavigate();

  const sendData = (event) => {
    event.preventDefault();
    const data = new FormData();
    data.append("first_name", first_name);
    data.append("last_name", last_name);
    data.append("user_name", first_name + last_name);
    data.append("email", email);
    data.append("password", password);
    data.append("password_confirmation", password_confirmation);
    data.append("profile_image", profile_image_url);
    fetch("https://vica.website/api/register", {
      method: "POST",
      headers: {
        Accept: "application/json",
      },
      body: data,
    })
      .then((res) => res.json())
      .then((res) => {
        localStorage.setItem("token", "Bearer " + res.data.token);
        localStorage.setItem("first_name", res.data.user.first_name);
        localStorage.setItem("last_name", res.data.user.last_name);
        localStorage.setItem("profile_image", res.data.user.profile_image_url);
        navigate("/dashboard");
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className="signup">
      <h1>Sign Up</h1>
      <p>Create a account to continue</p>
      <form onSubmit={sendData}>
        <div className="name">
          <div>
            <label htmlFor="First Name">First Name</label>
            <input
              type="text"
              id="first-name"
              placeholder="First Name"
              onChange={(event) => setFirstName(event.target.value)}
            />
          </div>
          <div>
            <label htmlFor="Last Name">Last Name</label>
            <input
              type="text"
              id="last-name"
              placeholder="Last Name"
              onChange={(event) => setLastName(event.target.value)}
            />
          </div>
        </div>
        <div>
          <label htmlFor="Email">Email</label>
          <input
            type="email"
            id="email"
            placeholder="Email"
            onChange={(event) => setEmail(event.target.value)}
          />
        </div>
        <div className="password">
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
            <label htmlFor="Confirm">Confirm</label>
            <input
              type="password"
              id="confirm"
              placeholder="********"
              onChange={(event) => setPasswordConfirmation(event.target.value)}
            />
          </div>
        </div>

        <div className="file-upload">
          <label htmlFor="profile-image">Profile Image</label>
          <label htmlFor="file" className="file-image">
            <img src="./assets/img/Upload icon.png" alt="Upload Icon" />
          </label>
          <input
            type="file"
            id="file"
            onChange={(event) => setProfileImage(event.target.files[0])}
          />
          <span className="file-name">
            {profile_image_url ? profile_image_url.name : ""}
          </span>
        </div>
        <div>
          <input type="submit" value="Sign Up" />
        </div>
        <span>Already have an account?</span>
        <Link to="/">Sign In</Link>
      </form>
    </div>
  );
};

export default SignUp;
