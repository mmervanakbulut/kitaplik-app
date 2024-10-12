import "./CssFiles/Navbar.css";

function Navbar() {
  return (
    <div className="navbar-container">
      <nav className="navbar">
        <ul className="navbar-tabs">
          <li>
            <a href="/">Ana Sayfa</a>
          </li>
          <li>
            <a href="books">Kitaplarım</a>
          </li>
          <li>
            <a href="addBook">Kitap Ekle</a>
          </li>
          <li>
            <a href="addAuthor">Yazar Ekle</a>
          </li>
          <li>
            <a href="addPublisher">Yayınevi Ekle</a>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Navbar;
