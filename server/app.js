// backend/server.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mysql from "mysql";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

db.connect((err) => {
  if (err) {
    console.error("Error connecting to the database:", err);
    return;
  }
  console.log("Connected to the database");
});

app.get("/items", (req, res) => {
  const query = "SELECT * FROM users";
  db.query(query, (err, results) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.json(results);
    }
  });
});
app.get("/card/:sort", (req, res) => {
  if (req.params.sort === "up") {
    const query = `SELECT * FROM places ORDER BY Price ASC`;
    db.query(query, (err, results) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.json(results);
      }
    });
  } else if (req.params.sort === "down") {
    const query = `SELECT * FROM places ORDER BY Price DESC`;
    db.query(query, (err, results) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.json(results);
      }
    });
  } else {
    res.status(500).send("Invalid sort parameter");
  }
});
app.post("/items", (req, res) => {
  const query = "INSERT INTO users (name) VALUES (?)";
  const values = [req.body.name];
  db.query(query, values, (err, results) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.json({ id: results.insertId, ...req.body });
    }
  });
});

app.put("/items/:id", (req, res) => {
  const query = "UPDATE users SET name = ? WHERE id = ?";
  const values = [req.body.name, req.params.id];
  db.query(query, values, (err, results) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.json({ id: req.params.id, ...req.body });
    }
  });
});

app.delete("/items/:id", (req, res) => {
  const query = "DELETE FROM users WHERE id = ?";
  const values = [req.params.id];
  db.query(query, values, (err, results) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.json({ message: "Item deleted" });
    }
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
