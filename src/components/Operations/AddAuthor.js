import React, { useState, useEffect } from "react";
import axios from "axios";
import "./CssFiles/AddAuthor.css"; // Optional: CSS for styling the form
import { Box, Button, Container, TextField, Typography } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

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

  useEffect(() => {
    if (error || success) {
      const timer = setTimeout(() => {
        setError("");
        setSuccess(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [error, success]);

  return (
    <Container
      maxWidth="xs"
      sx={{
        boxShadow: 3,
        margin: "25px auto",
        borderRadius: "8px",
      }}
    >
      <Typography
        sx={{
          typography: "h5",
          fontWeight: "bold",
          textAlign: "center",
          padding: "25px 10px 30px 10px",
        }}
      >
        Add New Author
      </Typography>
      {error && <Typography className="error-message">{error}</Typography>}
      {success && (
        <Typography className="success-message">
          Author added successfully!
        </Typography>
      )}
      <Box
        component="form"
        sx={{ padding: "25px", textAlign: "center" }}
        onSubmit={handleSubmit}
      >
        <Box sx={{ paddingBottom: "25px" }}>
          {/* <label htmlFor="name">Author Name:</label> */}
          {/* <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter author's name"
          /> */}
          <TextField
            value={name}
            label="name"
            variant="standard"
            size="large"
            required
            onChange={(e) => setName(e.target.value)}
          ></TextField>
        </Box>
        <Box>
          {/* <label htmlFor="surname">Author Surname:</label> */}
          {/* <input
            type="text"
            id="surname"
            value={surname}
            onChange={(e) => setSurname(e.target.value)}
            placeholder="Enter author's surname"
          /> */}
          <TextField
            value={surname}
            label="surname"
            variant="standard"
            size="large"
            required
            onChange={(e) => setSurname(e.target.value)}
          ></TextField>
        </Box>
        {/* <button type="submit">Add Author</button> */}
        <Button
          type="submit"
          variant="contained"
          color="success"
          size="medium"
          endIcon={<SendIcon />}
          sx={{ boxShadow: 10, marginTop: "25px" }}
        >
          Add Author
        </Button>
      </Box>
    </Container>
  );
}
