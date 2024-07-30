// backend/server.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mysql from "mysql";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
const saltRounds = 10;

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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
// ===== Middleware =====
// auth
// const authenticateJWT = (req, res, next) => {
//   const token = req.headers.authorization;
//   if (token) {
//     jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
//       if (err) {
//         return res.sendStatus(403);
//       }
//       req.user = user;
//       next();
//     });
//   } else {
//     res.sendStatus(401);
//   }
// };
// role-based authorization
// const authorizeRole = (roles) => {
//   return (req, res, next) => {
//     if (roles.includes(req.user.role)) {
//       next();
//     } else {
//       res.sendStatus(403);
//     }
//   };
// };
// // Protected route for admin
// app.get(
//   "/dashboard",
//   authenticateJWT,
//   authorizeRole(["Admin"], ["Guide"]),
//   (req, res) => {
//     res.redirect("/"); //redirect
//   }
// );

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
  const { email, password } = req.body;
  const query = "SELECT * FROM users WHERE Email = ?";
  db.query(query, [email], (err, results) => {
    if (err) {
      res.status(500).send("Server Error");
    } else if (results.length === 0) {
      res.status(404).send("User not found");
    } else {
      const user = results[0];
      if (password !== user.Password) {
        // Direct comparison without bcrypt
        res.status(401).send("Invalid Password");
      } else {
        const token = jwt.sign(
          { id: user.Id_User, role: user.Role },
          process.env.JWT_SECRET,
          { expiresIn: 86400 } // 24 hours
        );
        res.status(200).send({ token });
      }
    }
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
