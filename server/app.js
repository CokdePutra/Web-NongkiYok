// backend/server.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mysql from "mysql";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import bodyParser from "body-parser";
import session from "express-session";

const saltRounds = 10;

dotenv.config();
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  session({
    secret: "AKJHKJ13231!09949398kjSS", // Gantilah 'your-secret-key' dengan kunci rahasia yang lebih kuat
    resave: false, // Apakah session akan disimpan kembali walaupun tidak ada perubahan
    saveUninitialized: true, // Apakah session baru yang belum diinisialisasi akan disimpan
    cookie: { secure: false }, // Gunakan secure: true saat menggunakan HTTPS
  })
);
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

// check koneksi
db.connect((err) => {
  if (err) {
    console.error("Error connecting to the database:", err);
    return;
  }
  console.log("Connected to the database");
});

// REGISTER
app.post("/register", (req, res) => {
  const { name, email, password, role, username } = req.body;

  // Hash the password before storing it in the database
  bcrypt.hash(password, saltRounds, (err, hash) => {
    if (err) {
      return res.status(500).send("Server Error");
    }

    const query =
      "INSERT INTO users (Name, Email, Password, Role, Username) VALUES (?, ?, ?, ?, ?)";
    db.query(query, [name, email, hash, role, username], (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).send("Error creating user");
      }
      console.log("succes");
      res.status(201).send("User registered");
    });
  });
});

// LOGIN
app.post("/login", (req, res) => {
  const { username, password } = req.body;
  console.log(username, password);
  const query = "SELECT * FROM users WHERE Username = ?";
  db.query(query, [username], (err, results) => {
    if (err) return res.status(500).send("Server Error");
    if (results.length === 0) return res.status(401).send("User not found");

    const user = results[0];
    bcrypt.compare(password, user.Password, (err, result) => {
      if (err) return res.status(500).send("Server Error");
      if (!result) return res.status(401).send("Invalid password");

      // Store user info in session
      req.session.user = {
        id: user.Id_User,
        email: user.Email,
        username: user.Username,
        role: user.Role,
      };
      ``;

      // Redirect based on user role
      if (user.Role === "guide") {
        res
          .status(200)
          .json({ message: "Login successful", redirectUrl: "/dashboard" });
      } else {
        res.status(200).json({ message: "Login successful", redirectUrl: "/" });
      }
    });
  });
});

//===== LOGIC =====
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
    console.log("sort harga naik");
    const query = `SELECT * FROM places ORDER BY AVG_Price ASC`;
    db.query(query, (err, results) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.json(results);
      }
    });
  } else if (req.params.sort === "down") {
    console.log("sort harga turun");
    const query = `SELECT * FROM places ORDER BY AVG_Price DESC`;
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

// check runing
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

app.get("/some-protected-route", (req, res) => {
  if (!req.session.user) {
    return res.status(401).send("Not authorized");
  }

  // Access user session data
  res.send(`Hello, ${user.username}! Your email is ${user.email}`);
});

app.get("/session", (req, res) => {
  const user = req.session.user;
  console.log(user);
  res.json(user);
});
