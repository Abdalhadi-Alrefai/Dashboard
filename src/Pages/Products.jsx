import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Products = () => {
  const [items, setItems] = useState([]);
  const [updatedProducts, setUpdatedProducts] = useState(true);
  const [deleted, setDeleted] = useState(false);
  useEffect(() => {
    axios
      .get("https://vica.website/api/items", {
        headers: {
          Accept: "application/json",
          AUTHORIZATION: localStorage.getItem("token"),
        },
      })
      .then((res) => setItems(res.data))
      .catch((err) => console.log(err));
  }, [updatedProducts]);

  const deleteProduct = (id) => {
    axios
      .delete(`https://vica.website/api/items/${id}`, {
        headers: {
          Accept: "application/json",
          Authorization: localStorage.getItem("token"),
        },
      })
      .then((res) => {
        setUpdatedProducts(!updatedProducts);
        setDeleted(false);
        console.log(res);
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className="products">
      <div className="sec-1">
        <h1>Manage Products</h1>
        <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
          <i>
            <FaPlus />
          </i>
          <Link to="/dashboard/product/addproduct">Add Product</Link>
        </motion.button>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th>#</th>
            <th>Product Name</th>
            <th>Price</th>
            <th>Image</th>
            <th>Action</th>
          </tr>
        </thead>
        {items.length == 0 && (
          <tbody>
            <tr className="not-found">
              <td colSpan="5">{items ? "not products found" : ""}</td>
            </tr>
          </tbody>
        )}

        <tbody>
          {items.map((item, index) => {
            return (
              <>
                <tr key={index}>
                  <td>{item.id}</td>
                  <td>{item.name}</td>
                  <td>{item.price}</td>
                  <td>
                    <img src={item.image_url} alt="product-image" />
                  </td>
                  <td>
                    <motion.button
                      className="btn1"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Link to={`/dashboard/product/editproduct/${item.id}`}>
                        <img
                          src="./assets/img/pencil-write.svg"
                          alt="edit-icon"
                        />
                      </Link>
                    </motion.button>
                    <motion.button
                      className="btn2"
                      onClick={() => setDeleted(true)}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <img src="./assets/img/bin.svg" alt="delete-icon" />
                    </motion.button>
                  </td>
                </tr>
                {deleted && (
                  <div className="logoutsure">
                    <div className="form">
                      <h1>Are you sure you want to delete the product?</h1>
                      <div className="sure">
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => deleteProduct(item.id)}
                        >
                          Yes
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => setDeleted(false)}
                        >
                          No
                        </motion.button>
                      </div>
                    </div>
                  </div>
                )}
              </>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Products;
