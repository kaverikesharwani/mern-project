// // server.js
// const express = require('express'); // import express
// const app = express();              // create an Express app

// // middleware to parse JSON bodies (not strictly needed now but good habit)
// app.use(express.json());

// // define a route (URL) for GET / which returns a simple message
// app.get('/', (req, res) => {
//   res.send('Hello Backend from Kaveri!');
// });

// // choose a port (5000 is common for dev)
// const PORT = process.env.PORT || 5000;

// // start the server and listen on the port
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
   

// server/server.js

const express = require('express');
const { v4: uuidv4 } = require('uuid'); // for unique IDs

const app = express();
app.use(express.json()); // to parse JSON data

// Temporary in-memory "database"
let items = [];

// ✅ READ - Get all items
app.get('/api/items', (req, res) => {
  res.status(200).json({ success: true, data: items });
});

// ✅ CREATE - Add new item
app.post('/api/items', (req, res) => {
  const { name, description } = req.body;

  if (!name) {
    return res.status(400).json({ success: false, message: 'name is required' });
  }

  const newItem = { id: uuidv4(), name, description: description || '' };
  items.push(newItem);

  res.status(201).json({ success: true, data: newItem });
});

// ✅ UPDATE - Update item by id
app.put('/api/items/:id', (req, res) => {
  const { id } = req.params;
  const { name, description } = req.body;

  const idx = items.findIndex(it => it.id === id);
  if (idx === -1) {
    return res.status(404).json({ success: false, message: 'Item not found' });
  }

  items[idx] = {
    ...items[idx],
    name: name ?? items[idx].name,
    description: description ?? items[idx].description,
  };

  res.status(200).json({ success: true, data: items[idx] });
});

// ✅ DELETE - Remove item by id
app.delete('/api/items/:id', (req, res) => {
  const { id } = req.params;

  const idx = items.findIndex(it => it.id === id);
  if (idx === -1) {
    return res.status(404).json({ success: false, message: 'Item not found' });
  }

  const deleted = items.splice(idx, 1)[0];
  res.status(200).json({ success: true, data: deleted });
});

// ✅ Start server
app.listen(5000, () => {
  console.log('✅ Server running on http://localhost:5000');
});
