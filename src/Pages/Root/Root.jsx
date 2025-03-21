import { RiDashboard3Line } from "react-icons/ri";
import "./Root.css";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { RxDashboard } from "react-icons/rx";
import { CgLogOff } from "react-icons/cg";
import { useEffect, useState } from "react";

const Root = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [logouted, setLogOuted] = useState(false);
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [profile_image_url, setProfileImage] = useState(null);
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
    } else {
      setFirstName(localStorage.getItem("first_name" || "user"));
      setLastName(localStorage.getItem("last_name" || ""));
      setProfileImage(
        localStorage.getItem("profile_image" || "/assets/img/user_6994618.png")
      );
    }
  }, [navigate]);
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/");
    }
  }, []);

  const viewTitle = () => {
    if (location.pathname == "/dashboard") {
      return "Products";
    }
    if (location.pathname == "/dashboard/product/addproduct") {
      return "Products / Add ";
    }
    if (location.pathname.includes("/dashboard/product/editproduct")) {
      return "Products / Edit ";
    }
  };
  const logOut = () => {
    fetch("https://vica.website/api/logout", {
      method: "POST",
      headers: {
        Accept: "application/json",
        AUTHORIZATION: localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        localStorage.removeItem("token");
        navigate("/");
      })
      .catch((err) => console.log(err));
  };
  return (
    <>
      <div className="sidebar">
        <h1>
          <span>Dash</span>Stack
        </h1>
        <div className="sideitem">
          <div className="items">
            <ul>
              <li>
                <i>
                  <RiDashboard3Line />
                </i>
                Dashboard
              </li>
              <motion.li whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <i>
                  <RxDashboard />
                </i>
                <Link to="/dashboard">Products</Link>
              </motion.li>
            </ul>
          </div>
          <div className="btn">
            <motion.button
              onClick={() => setLogOuted(true)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <i>
                <CgLogOff />
              </i>
              Logout
            </motion.button>
          </div>
        </div>
      </div>
      <div className="nav">
        <div className="logo">
          <h1>{viewTitle()}</h1>
        </div>
        <div className="user">
          <div className="img">
            <img src={profile_image_url} alt="profile" />
          </div>
          <div className="info">
            <h3>
              {first_name} {last_name}
            </h3>
            <p>Admin</p>
          </div>
        </div>
      </div>
      {logouted && (
        <div className="logoutsure">
          <div className="form">
            <h1>Are you sure you want to Logout?</h1>
            <div className="sure">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={logOut}
              >
                Yes
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setLogOuted(false)}
              >
                No
              </motion.button>
            </div>
          </div>
        </div>
      )}

      <div className="child">
        <Outlet />
      </div>
    </>
  );
};

export default Root;
