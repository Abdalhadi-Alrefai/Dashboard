import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Root from "./Root/Root";

const AddProduct = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);
  const navigate = useNavigate();
  const sendData = (event) => {
    event.preventDefault();
    axios
      .post(
        "https://vica.website/api/items",
        {
          name,
          price,
          image,
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: localStorage.getItem("token"),
          },
        }
      )
      .then((res) => {
        console.log(res.data);
        navigate("/dashboard");
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className="products">
      <h1>Add Product</h1>
      <form onSubmit={sendData} className="form">
        <div className="input-item">
          <div>
            <label htmlFor="Product Name">Product Name</label>
            <input
              type="text"
              id="name"
              placeholder="Product Name"
              onChange={(event) => setName(event.target.value)}
            />
          </div>
          <div>
            <label htmlFor="Price">Price</label>
            <input
              type="text"
              id="Price"
              placeholder="Price"
              onChange={(event) => setPrice(event.target.value)}
            />
          </div>
          <div>
            <input type="submit" value="Save" />
          </div>
        </div>
        <div className="input-file">
          <label htmlFor="file">
            <img src="/assets/img/Upload-icon.svg" alt="Upload Icon" />
          </label>
          <input
            type="file"
            id="file"
            onChange={(event) => setImage(event.target.files[0])}
          />
          <span className="file-name">{image ? image.name : ""}</span>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
