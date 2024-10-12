import "./App.css";
import Default from "./Default.js";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Books from "./components/Books.js";
import AddAuthor from "./components/Operations/AddAuthor.js";
import AddPublisher from "./components/Operations/AddPublisher.js";
import AddBook from "./components/Operations/AddBook.js";
import Navbar from "./components/Navbar.js";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Default />,
    },
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
  return (
    <div className="app">
      <div className="navbar-container">
        <Navbar />
      </div>
      <div className="content-container">
        <RouterProvider router={router} />
      </div>
    </div>
  );
}

export default App;
