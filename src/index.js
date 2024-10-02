import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import Navbar from "./components/Navbar.js";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Books from "./components/Books.js";
import AddAuthor from "./components/Operations/AddAuthor.js";
import AddPublisher from "./components/Operations/AddPublisher.js";
import AddBook from "./components/Operations/AddBook.js";

const router = createBrowserRouter([
  {
    path: "/books",
    element: <Books />,
  },
  {
    path: "/addAuthor",
    element: <AddAuthor />,
  },
  {
    path: "/addPublisher",
    element: <AddPublisher />,
  },
  {
    path: "/addBook",
    element: <AddBook />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Navbar />
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
