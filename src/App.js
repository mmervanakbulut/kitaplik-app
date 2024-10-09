import "./App.css";
import Navbar from "./components/Navbar.js";
import Default from "./Default.js";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Books from "./components/Books.js";
import AddAuthor from "./components/Operations/AddAuthor.js";
import AddPublisher from "./components/Operations/AddPublisher.js";
import AddBook from "./components/Operations/AddBook.js";

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
      <Navbar />
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
