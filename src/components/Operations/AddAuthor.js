import "./CssFiles/AddAuthor.css";

export default function AddAuthor() {
  return (
    <div className="grid-container">
      <label for="name">Name (3 to 20 characters):</label>
      <input
        type="text"
        id="name"
        name="name"
        required
        minlength="3"
        maxlength="20"
        size="10"
      />
    </div>
  );
}
