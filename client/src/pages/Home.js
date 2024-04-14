import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import "./Home.css";
import { toast } from "react-toastify";
import axios from "axios";

const Home = () => {
  const [data, setData] = useState([]);

  const loadData = async () => {
    const response = await axios.get("http://localhost:5000/api/get");
    console.log(response);
    setData(response.data);
  };

  useEffect(() => {
    loadData();
  }, []);

  const deleteContact = (id) => {
    console.log("id is " + id);
    if (
      window.confirm("Are You Sure That you wanted to delete that contact ? ")
    ) {
      axios.delete(`http://localhost:5000/api/remove/${id}`);
      toast.success("contact deleted successfully");
      setTimeout(() => loadData(), 500);
    }
  };
  return (
    <div style={{ marginTop: "150px" }}>
      <NavLink to="/addContact">
        <button className="btn btn-contact">Add Contact</button>
      </NavLink>
      <table className="styled-table">
        <thead>
          <tr>
            <th style={{ textAlign: "center" }}>No.</th>
            <th style={{ textAlign: "center" }}>Name</th>
            <th style={{ textAlign: "center" }}>Email</th>
            <th style={{ textAlign: "center" }}>Contact</th>
            <th style={{ textAlign: "center" }}>Action</th>
          </tr>
        </thead>

        <tbody>
          {data.map((item, index) => {
            return (
              <tr key={item.id}>
                <th scope="row">{index + 1}</th>
                <td>{item.name}</td>
                <td>{item.email}</td>
                <td>{item.contact}</td>
                <td>
                  <NavLink to={`update/${item.id}`}>
                    <button className="btn btn-edit">Edit</button>
                  </NavLink>
                  <button
                    className="btn btn-delete"
                    onClick={() => deleteContact(item.id)}
                  >
                    Delete
                  </button>
                  <NavLink to={`view/${item.id}`}>
                    <button className="btn btn-view">View</button>
                  </NavLink>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Home;
