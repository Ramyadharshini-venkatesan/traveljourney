const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();
app.use(cors());
app.use(express.json());

// Serve frontend
app.use(express.static(path.join(__dirname, "../frontend")));

let places = [];
let idCounter = 1;

// Get journeys
app.get("/places", (req, res) => {
  res.json(places);
});

// Add journey
app.post("/places", (req, res) => {
  const { name, description, image } = req.body;
  if (!name || !description) {
    return res.status(400).json({ error: "Name and description required" });
  }
  const newPlace = { id: idCounter++, name, description, image };
  places.push(newPlace);
  res.status(201).json(newPlace);
});

// Delete journey
app.delete("/places/:id", (req, res) => {
  const id = parseInt(req.params.id);
  places = places.filter(p => p.id !== id);
  res.json({ message: "Deleted successfully" });
});

const PORT = 3000;
app.listen(PORT, () => console.log(`✅ Server running at http://localhost:${PORT}`));
