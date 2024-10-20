import React, { useState } from "react";
import axios from "axios";
import "./CssFiles/AddAuthor.css"; // Optional: CSS for styling the form

const baseURL = "https://localhost:7168/api/Author"; // Update the endpoint if needed

export default function AddAuthor() {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(""); // Clear previous errors
    setSuccess(false); // Reset success status

    if (!name || !surname) {
      setError("Name and Surname are required.");
      return;
    }

    try {
      const response = await axios.post(baseURL, {
        name: name, // Using 'name' as per your DB field
        surname: surname, // Using 'surname' as per your DB field
      });
      if (response.status === 200) {
        setSuccess(true); // If author is added successfully
        setName("");
        setSurname("");
      }
    } catch (err) {
      console.log(err);
      setError("An error occurred while adding the author.");
    }
  };

  return (
    <div className="add-author-form">
      <h2>Add New Author</h2>
      {error && <p className="error-message">{error}</p>}
      {success && <p className="success-message">Author added successfully!</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Author Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter author's name"
          />
        </div>
        <div>
          <label htmlFor="surname">Author Surname:</label>
          <input
            type="text"
            id="surname"
            value={surname}
            onChange={(e) => setSurname(e.target.value)}
            placeholder="Enter author's surname"
          />
        </div>
        <button type="submit">Add Author</button>
      </form>
    </div>
  );
}
