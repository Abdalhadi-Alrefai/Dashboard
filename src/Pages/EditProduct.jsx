import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const EditProduct = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);
  const [inputedData, setInputedData] = useState("");
  const navigate = useNavigate();
  const params = useParams();
  useEffect(() => {
    axios
      .get(`https://vica.website/api/items/${params.id}`, {
        headers: {
          Accept: "application/json",
          Authorization: localStorage.getItem("token"),
        },
      })
      .then((res) => {
        setName(res.data.name);
        setPrice(res.data.price);
        setInputedData(res.data);
      })
      .catch((err) => console.log(err));
  }, []);
  const sendData = (event) => {
    event.preventDefault();
    axios
      .post(
        `https://vica.website/api/items/${params.id}`,
        {
          name,
          price,
          image,
          _method: "PUT",
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
      <h1>Edit Product</h1>
      <form onSubmit={sendData} className="form">
        <div className="input-item">
          <div>
            <label htmlFor="Product Name">Product Name</label>
            <input
              type="text"
              id="name"
              placeholder="Product Name"
              onChange={(event) => setName(event.target.value)}
              defaultValue={inputedData?.name}
            />
          </div>
          <div>
            <label htmlFor="Price">Price</label>
            <input
              type="text"
              id="Price"
              placeholder="Price"
              onChange={(event) => setPrice(event.target.value)}
              defaultValue={inputedData?.price}
            />
          </div>
          <div>
            <input type="submit" value="Save" />
          </div>
        </div>
        <div className="input-file">
          <label htmlFor="file">
            {!inputedData.image_url && (
              <img
                className="upload-image"
                src="/assets/img/Upload-icon.svg"
                alt="Upload Icon"
              />
            )}

            {inputedData.image_url && (
              <img
                className="inputed-image"
                src={inputedData?.image_url}
                alt=""
              />
            )}
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

export default EditProduct;
