import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mysql from "mysql";
import bcrypt from "bcryptjs";
import bodyParser from "body-parser";
import session from "express-session";

dotenv.config();

const app = express();
const saltRounds = 10;

// Configure CORS
const corsOptions = {
  origin: "http://localhost:5173", // Set this to your frontend URL
  credentials: true, // This is important to allow sending credentials (cookies, etc.)
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  session({
    secret: "AM68r517aCiyJxbixQkgUTVY9ofxKh2HxpKBqu4D1jI=", // Gantilah 'your-secret-key' dengan kunci rahasia yang lebih kuat
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
      res.status(201).send("User registered");
    });
  });
});

// LOGIN
app.post("/login", (req, res) => {
  const { username, password } = req.body;
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

// Route untuk mendapatkan data session
app.get("/api/session", (req, res) => {
  if (!req.session.user) {
    return res.status(401).send("Not logged in");
  }
  res.json(req.session.user);
});

// check runing
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
