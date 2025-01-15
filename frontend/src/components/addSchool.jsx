import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import "./addSchool.css";

function AddSchool() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("address", data.address);
      formData.append("city", data.city);
      formData.append("state", data.state);
      formData.append("contact", data.contact);
      formData.append("email_id", data.email_id);
      formData.append("image", data.image[0]); 

      console.log("FormData content:", Array.from(formData.entries()));

      const response = await axios.post(
        "http://localhost:5000/api/schools",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      if (response.status === 200) {
        alert(response.data.message || "School added successfully!");
      } else {
        alert("Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error(
        "Error adding school:",
        error.response ? error.response.data : error.message
      );
      alert(
        error.response?.data?.error ||
          "Failed to add school. Please check the console for more details."
      );
    }
  };

  return (
    <div className="add-school-container">
      <h1 className="form-title">Add a New School</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="add-school-form">
        <label>School Name:</label>
        <input
          type="text"
          {...register("name", { required: "School name is required" })}
        />
        {errors.name && <p className="error-message">{errors.name.message}</p>}

        <label>Address:</label>
        <input
          type="text"
          {...register("address", { required: "Address is required" })}
        />
        {errors.address && (
          <p className="error-message">{errors.address.message}</p>
        )}

        <label>City:</label>
        <input
          type="text"
          {...register("city", { required: "City is required" })}
        />
        {errors.city && <p className="error-message">{errors.city.message}</p>}

        <label>State:</label>
        <input
          type="text"
          {...register("state", { required: "State is required" })}
        />
        {errors.state && (
          <p className="error-message">{errors.state.message}</p>
        )}

        <label>Contact Number:</label>
        <input
          type="text"
          {...register("contact", { required: "Contact is required" })}
        />
        {errors.contact && (
          <p className="error-message">{errors.contact.message}</p>
        )}

        <label>Email:</label>
        <input
          type="email"
          {...register("email_id", { required: "Email is required" })}
        />
        {errors.email_id && (
          <p className="error-message">{errors.email_id.message}</p>
        )}

        <label>Image:</label>
        <input
          type="file"
          {...register("image", { required: "Image is required" })}
          accept="image/*"
        />
        {errors.image && (
          <p className="error-message">{errors.image.message}</p>
        )}

        <button type="submit" className="submit-button">
          Add School
        </button>
        <button
          type="button"
          className="view-schools-button"
          onClick={() => (window.location.href = "/schools")}
        >
          View Schools
        </button>
      </form>
    </div>
  );
}

export default AddSchool;
