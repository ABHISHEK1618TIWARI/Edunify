import React, { useState, useEffect } from "react";
import axios from "axios";
import "./showSchools.css";
import { schoolImage } from "../imageString";

function ShowSchools() {
  const [schools, setSchools] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSchools = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/schools");
        setSchools(response.data);
      } catch (error) {
        console.error("Error fetching schools:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSchools();
  }, []);

  if (loading) {
    return <p className="loading">Loading schools...</p>;
  }

  return (
    <div className="school-container">
      <header className="header">
        <h1 className="title">Explore Schools</h1>
      </header>
      <div className="school-list">
        {schools.length === 0 ? (
          <p className="no-schools">No schools available.</p>
        ) : (
          schools.map((school) => (
            <div key={school.id} className="school-card">
              <img
                src={`http://localhost:5000${school.image}` }
                alt={school.name}
                className="school-image"
                onError={(e) => {
                  e.target.src = schoolImage;
                }}
              />
              <div className="school-details">
                <h3 className="school-name">{school.name}</h3>
                <p className="school-address">{school.address}</p>
                <p className="school-city">{school.city}</p>
              </div>
            </div>
          ))
        )}
      </div>
      <footer className="footer">
        <button
          className="back-button"
          onClick={() => (window.location.href = "/")}
        >
          Add More Schools
        </button>
      </footer>
    </div>
  );
}

export default ShowSchools;
