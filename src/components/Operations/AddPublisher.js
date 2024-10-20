import React, { useState } from "react";
import axios from "axios";
import "./CssFiles/AddPublisher.css"; // Optional: CSS for styling the form

const baseURL = "https://localhost:7168/api/Publisher"; // Update the endpoint if needed

export default function AddAuthor() {
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(""); // Clear previous errors
    setSuccess(false); // Reset success status

    if (!name) {
      setError("Name are required.");
      return;
    }

    try {
      const response = await axios.post(baseURL, {
        name: name, // Using 'name' as per your DB field
      });
      if (response.status === 200) {
        setSuccess(true); // If author is added successfully
        setName(""); // Clear the name field
      }
    } catch (err) {
      console.log(err);
      setError("An error occurred while adding the author.");
    }
  };

  return (
    <div className="add-publisher-form">
      <h2>Add New Publisher</h2>
      {error && <p className="error-message">{error}</p>}
      {success && (
        <p className="success-message">Publisher added successfully!</p>
      )}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Publisher Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter author's name"
          />
        </div>
        <button type="submit">Add Publisher</button>
      </form>
    </div>
  );
}
