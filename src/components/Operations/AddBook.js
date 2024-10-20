import React, { useState, useEffect } from "react";
import axios from "axios";
import "./CssFiles/AddBook.css"; // Optional: CSS for styling the form

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

  return (
    <div className="add-book-form">
      <h2>Add New Book</h2>
      {error && <p className="error-message">{error}</p>}
      {success && <p className="success-message">Book added successfully!</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Book Title:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter book title"
          />
        </div>
        <div>
          <label htmlFor="description">Description:</label>
          <input
            type="text"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter description"
          />
        </div>
        <div>
          <label htmlFor="pageNumber">Page Number:</label>
          <input
            type="number"
            id="pageNumber"
            value={pageNumber}
            onChange={(e) => setPageNumber(e.target.value)}
            placeholder="Enter page number"
            min="1"
          />
        </div>
        <div>
          <label htmlFor="author">Author:</label>
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
          </select>
        </div>
        <div>
          <label htmlFor="publisher">Publisher:</label>
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
          </select>
        </div>
        <button type="submit">Add Book</button>
      </form>
    </div>
  );
}
