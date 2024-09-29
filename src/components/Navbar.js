import "./Navbar.css";

function Navbar() {
  /* Toggle between showing and hiding the navigation menu links when the user clicks on the hamburger menu / bar icon */
  // function myFunction() {
  //   var x = document.getElementById("myLinks");
  //   if (x.style.display === "block") {
  //     x.style.display = "none";
  //   } else {
  //     x.style.display = "block";
  //   }
  // }
  return (
    <div className="navbar">
      <ul>
        <li>
          <a href="books">Kitaplarım</a>
        </li>
        <li>
          <a href="addAuthor">Yazar Ekle</a>
        </li>
        <li>
          <a href="addBook">Kitap Ekle</a>
        </li>
        <li>
          <a href="addPublisher">Yayınevi Ekle</a>
        </li>
      </ul>
    </div>
  );
}

export default Navbar;
