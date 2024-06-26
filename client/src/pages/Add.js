import React, { useState, useEffect } from "react";
import { useNavigate, useParams, NavLink } from "react-router-dom";
import "./AddEdit.css";
import axios from "axios";
import { toast } from "react-toastify";

const initialState = {
  name: "",
  email: "",
  contact: "",
};

const AddEdit = () => {
  const [state, setState] = useState(initialState);

  const { name, email, contact } = state;

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !contact) {
      toast.error("Please provide value into each input field");
    } else {
      axios
        .post("http://localhost:5000/api/post", { name, email, contact })
        .then(() => {
          setState({ name: "", email: "", contact: "" });
        })
        .catch((err) => {
          toast.error(err.response.data);
        });
      toast.success("Contact added Sucessfully");
    }
    setTimeout(() => navigate("/"), 500);
  };

  return (
    <div style={{ marginTop: "100px" }}>
      <form
        style={{
          margin: "auto",
          padding: "15px",
          maxWidth: "400px",
          alignContent: "center",
        }}
        onSubmit={handleSubmit}
      >
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Your Name ..."
          value={name}
          onChange={handleInputChange}
        />

        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Your email ..."
          value={email}
          onChange={handleInputChange}
        />

        <label htmlFor="contact">Contact</label>
        <input
          type="number"
          id="contact"
          name="contact"
          placeholder="Your contact no..."
          value={contact}
          minLength={10}
          maxLength={15}
          onChange={handleInputChange}
        />

        <input type="submit" value="Save" />
        <NavLink to="/">
          <input type="button" value="Go Back" />
        </NavLink>
      </form>
    </div>
  );
};

export default AddEdit;
