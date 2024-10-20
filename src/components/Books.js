import React, { useState, useEffect } from "react";
import axios from "axios";
import "./CssFiles/Books.css";

const baseURL = "https://localhost:7168/api/Book";

export default function Books() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(baseURL);
        setBooks(response.data); // Change this to response.data to access the books
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, []);

  if (!books.length) return <p>No books available</p>;

  return (
    <div className="book-list">
      <table>
        {/* Table Header */}
        <thead>
          <tr>
            <th>#</th>
            <th>Kitap Adı</th>
            <th>Kitap Türü</th>
            <th>Sayfa Sayısı</th>
            <th>Yazar Adı - Soyadı</th>
            <th>Yayınevi</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book, index) => (
            <tr
              key={book.id}
              className={index % 2 === 0 ? "even-row" : "odd-row"}
            >
              <td>{index + 1}</td>
              <td>{book.title}</td>
              <td>{book.description}</td>
              <td>{book.pageNumber}</td>
              <td>
                {book.authorsName} {book.authorsSurname}
              </td>
              <td>{book.publisherName}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
