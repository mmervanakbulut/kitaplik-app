import React, { useState, useEffect } from "react";
import axios from "axios";
import "./CssFiles/AddBook.css"; // Optional: CSS for styling the form
import {
  Box,
  Button,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

const baseURL = "https://localhost:7168/api/Book";
const authorsURL = "https://localhost:7168/api/Author";
const publishersURL = "https://localhost:7168/api/Publisher";

export default function AddBook() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [pageNumber, setPageNumber] = useState("");
  const [authorId, setAuthorId] = useState("");
  const [publisherId, setPublisherId] = useState("");
  const [authors, setAuthors] = useState([]);
  const [publishers, setPublishers] = useState([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    // Fetch authors and publishers for selection
    const fetchAuthorsAndPublishers = async () => {
      try {
        const authorsResponse = await axios.get(authorsURL);
        setAuthors(authorsResponse.data);

        const publishersResponse = await axios.get(publishersURL);
        setPublishers(publishersResponse.data);
      } catch (err) {
        console.log(err);
        setError("Error fetching authors or publishers.");
      }
    };
    fetchAuthorsAndPublishers();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(""); // Clear previous errors
    setSuccess(false); // Reset success status

    if (!title || !description || !pageNumber || !authorId || !publisherId) {
      setError("All fields are required.");
      return;
    }

    try {
      const response = await axios.post(baseURL, {
        title: title,
        description: description,
        pageNumber: parseInt(pageNumber, 10), // Ensure the page number is a number
        authorId: parseInt(authorId, 10), // Ensure authorId is numeric
        publisherId: parseInt(publisherId, 10), // Ensure publisherId is numeric
      });
      if (response.status === 200) {
        setSuccess(true); // If book is added successfully
        setTitle(""); // Clear the title field
        setDescription(""); // Clear the description field
        setPageNumber(""); // Clear the page number field
        setAuthorId(""); // Clear the authorId selection
        setPublisherId(""); // Clear the publisherId selection
      }
    } catch (err) {
      console.log(err);
      setError("An error occurred while adding the book.");
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
          padding: "25px 10px 5px 10px",
        }}
      >
        Add New Book
      </Typography>
      {error && <Typography className="error-message">{error}</Typography>}
      {success && (
        <Typography className="success-message">
          Book added successfully!
        </Typography>
      )}
      <Box
        component="form"
        sx={{ padding: "25px", textAlign: "center" }}
        onSubmit={handleSubmit}
      >
        <Box sx={{ paddingBottom: "10px" }}>
          {/* <label htmlFor="title">Book Title:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter book title"
          /> */}
          <TextField
            value={title}
            label="title"
            variant="standard"
            size="large"
            required
            onChange={(e) => setTitle(e.target.value)}
          ></TextField>
        </Box>
        <Box sx={{ paddingBottom: "10px" }}>
          {/* <label htmlFor="description">Description:</label>
          <input
            type="text"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter description"
          /> */}
          <TextField
            value={description}
            label="description"
            variant="standard"
            size="large"
            required
            onChange={(e) => setDescription(e.target.value)}
          ></TextField>
        </Box>
        <Box sx={{ paddingBottom: "10px" }}>
          {/* <label htmlFor="pageNumber">Page Number:</label>
          <input
            type="number"
            id="pageNumber"
            value={pageNumber}
            onChange={(e) => setPageNumber(e.target.value)}
            placeholder="Enter page number"
            min="1"
          /> */}
          <TextField
            value={pageNumber}
            label="pageNumber"
            variant="standard"
            size="large"
            required
            onChange={(e) => setPageNumber(e.target.value)}
          ></TextField>
        </Box>
        <Box>
          {/* <label htmlFor="author">Author:</label>
          <select
            id="author"
            value={authorId}
            onChange={(e) => setAuthorId(e.target.value)}
          >
            <option value="">Select an author</option>
            {authors.map((author) => (
              <option key={author.id} value={author.id}>
                {author.name} {author.surname}
              </option>
            ))}
          </select> */}
          <FormControl required variant="standard" sx={{ m: 1, minWidth: 182 }}>
            <InputLabel id="author-input-id">Author</InputLabel>
            <Select
              labelId="author-input-id"
              label="Author"
              value={authorId}
              id="author"
              onChange={(e) => setAuthorId(e.target.value)}
            >
              <MenuItem value="">
                <em>Select an author</em>
              </MenuItem>
              {authors.map((author) => (
                <MenuItem key={author.id} value={author.id}>
                  {author.name} {author.surname}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
        <Box>
          {/* <label htmlFor="publisher">Publisher:</label>
          <select
            id="publisher"
            value={publisherId}
            onChange={(e) => setPublisherId(e.target.value)}
          >
            <option value="">Select a publisher</option>
            {publishers.map((publisher) => (
              <option key={publisher.id} value={publisher.id}>
                {publisher.name}
              </option>
            ))}
          </select> */}
          <FormControl required variant="standard" sx={{ m: 1, minWidth: 182 }}>
            <InputLabel id="publisher-input-id">Publisher</InputLabel>
            <Select
              labelId="publisher-input-id"
              label="Publisher"
              value={publisherId}
              id="publisher"
              onChange={(e) => setPublisherId(e.target.value)}
            >
              <MenuItem value="">
                <em>Select a publisher</em>
              </MenuItem>
              {publishers.map((publisher) => (
                <MenuItem key={publisher.id} value={publisher.id}>
                  {publisher.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
        {/* <button type="submit">Add Book</button> */}
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
