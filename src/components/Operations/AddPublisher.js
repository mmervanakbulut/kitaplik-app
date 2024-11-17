import React, { useState, useEffect } from "react";
import axios from "axios";
import "./CssFiles/AddPublisher.css"; // Optional: CSS for styling the form
import { Box, Button, Container, TextField, Typography } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

const baseURL = "https://localhost:7168/api/Publisher"; // Update the endpoint if needed

export default function AddAuthor() {
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault(); // Formun sayfa yenilemeden çalışmasını sağlar
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
      setError("An error occurred while adding the publisher.");
    }
  };

  useEffect(() => {
    if (error || success) {
      const timer = setTimeout(() => {
        setError("");
        setSuccess(false);
      }, 2000); // Clear messages after 3 seconds

      return () => clearTimeout(timer); // Clean up timer on component unmount or re-render
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
        Add New Publisher
      </Typography>
      {error && <Typography className="error-message">{error}</Typography>}
      {success && (
        <Typography className="success-message">
          Publisher added successfully!
        </Typography>
      )}
      <Box
        component="form"
        sx={{ paddingBottom: "25px", textAlign: "center" }}
        onSubmit={handleSubmit}
      >
        <Box sx={{ paddingBottom: "25px" }}>
          {/* <label htmlFor="name">Publisher Name:</label> */}
          <TextField
            sx={{ paddingBottom: "20px" }}
            value={name}
            margin="normal"
            label="name"
            variant="standard"
            size="large"
            required
            onChange={(e) => setName(e.target.value)}
          ></TextField>
          {/* <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter author's name"
          /> */}
        </Box>
        <Button
          type="submit"
          variant="contained"
          color="success"
          size="medium"
          endIcon={<SendIcon />}
          sx={{ boxShadow: 10 }}
        >
          Add Publisher
        </Button>
      </Box>
    </Container>
  );
}
