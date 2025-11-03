import React, { useEffect, useState } from "react";

function App() {
  const [items, setItems] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  // Fetch all items
  useEffect(() => {
    fetch("http://localhost:5000/api/items")
      .then((res) => res.json())
      .then((data) => setItems(data.data))
      .catch((err) => console.error(err));
  }, []);

  // Add new item
  const addItem = async () => {
    const res = await fetch("http://localhost:5000/api/items", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, description }),
    });
    const data = await res.json();
    setItems([...items, data.data]);
    setName("");
    setDescription("");
  };

  // Delete item
  const deleteItem = async (id) => {
    await fetch(`http://localhost:5000/api/items/${id}`, { method: "DELETE" });
    setItems(items.filter((item) => item._id !== id));
  };

  return (
    <div style={{ padding: "20px", maxWidth: "500px", margin: "auto" }}>
      <h2>📦 My MongoDB Items</h2>

      <input
        type="text"
        placeholder="Item name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button onClick={addItem}>Add</button>

      <ul>
        {items.map((item) => (
          <li key={item._id}>
            <b>{item.name}</b> - {item.description}
            <button onClick={() => deleteItem(item._id)}>❌</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
