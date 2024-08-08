import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mysql from "mysql";
import bcrypt from "bcryptjs";
import bodyParser from "body-parser";
import session from "express-session";
import multer from "multer";
import path from "path";

dotenv.config();

const app = express();
const saltRounds = 10;

// Configure CORS
const corsOptions = {
  origin: process.env.FRONTEND_URL, // Set this to your frontend URL
  credentials: true, // This is important to allow sending credentials (cookies, etc.)
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  session({
    secret: process.env.JWT_SECRET, // Gantilah 'your-secret-key' dengan kunci rahasia yang lebih kuat
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

// Multer storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

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

      if (user.Role === "Guide") {
        res
          .status(200)
          .json({ message: "Login successful", redirectUrl: "/dashboard" });
      } else {
        res.status(200).json({ message: "Login successful", redirectUrl: "/" });
      }
    });
  });
});

// LOGOUT
app.post("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).send("Failed to logout");
    }
    res.status(200).send("Logout successful");
  });
});

// Route untuk mendapatkan data session
app.get("/api/session", (req, res) => {
  if (!req.session.user) {
    return res.status(401).send("Not logged in");
  }
  res.json(req.session.user);
});

// Endpoint untuk mengambil data lokasi
app.get("/api/locations", (req, res) => {
  const query = "SELECT * FROM places";
  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.json(results);
  });
});

// Endpoint untuk input tempat baru
app.post("/api/places", upload.single("image"), (req, res) => {
  if (!req.session.user) {
    return res.status(401).send("Not logged in");
  }

  const {
    name,
    price,
    Category,
    longitude,
    latitude,
    googleMapsLink,
    description,
  } = req.body;

  console.log(req.body);
  console.log("==========");
  const image = req.file ? `/uploads/${req.file.filename}` : "";
  const userId = req.session.user.id;

  const query = `
    INSERT INTO places (name, AVG_Price,Category, Longtitude, Latitude, Link, Description, Image, Id_User)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;
  db.query(
    query,
    [
      name,
      price,
      Category,
      longitude, // pastikan urutannya sesuai
      latitude, // pastikan urutannya sesuai
      googleMapsLink,
      description,
      image,
      userId,
    ],
    (err, results) => {
      if (err) {
        console.error(err);
        return res.status(500).send("Error adding place");
      }
      res.status(201).send("Place added successfully");
    }
  );
});

app.delete("/api/places/delete/:id", (req, res) => {
  if (!req.session.user) {
    return res.status(401).send("Not logged in");
  }

  const placeId = req.params.id;
  const userId = req.session.user.id;

  // Ensure the user is the owner of the place before deleting
  const query = "DELETE FROM places WHERE Id_Places = ? AND Id_User = ?";

  db.query(query, [placeId, userId], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Error deleting place");
    }
    if (results.affectedRows === 0) {
      return res.status(404).send("Place not found or not authorized");
    }
    res
      .status(200)
      .json({ message: "Delete successful", redirectUrl: "/dashboard" });
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
    const query = `SELECT * FROM places ORDER BY AVG_Price DESC`;
    db.query(query, (err, results) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.json(results);
      }
    });
  } else if (req.params.sort === "down") {
    console.log("sort harga turun");
    const query = `SELECT * FROM places ORDER BY AVG_Price ASC`;
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

// guide end point
app.get("/api/places", (req, res) => {
  if (!req.session.user) {
    return res.status(401).send("Not logged in");
  }

  const userId = req.session.user.id;
  const query = "SELECT * FROM places WHERE Id_User = ?";

  db.query(query, [userId], (err, results) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.json(results);
  });
});

// favorite place end point
app.get("/api/AllPlaces", (req, res) => {
  if (!req.session.user) {
    return res.status(401).send("Not logged in");
  }

  const userId = req.session.user.id;
  const query = "SELECT COUNT(*) as total FROM places where Id_User = ?";

  db.query(query, [userId], (err, results) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.json(results[0]);
  });
});

// favorite place end point
app.get("/api/FavPlaces", (req, res) => {
  if (!req.session.user) {
    return res.status(401).send("Not logged in");
  }

  const userId = req.session.user.id;
  const query =
    "SELECT SUM((SELECT COUNT(*) FROM favorite WHERE Id_Places = places.Id_Places)) AS total_favorites FROM places WHERE EXISTS (SELECT 1 FROM favorite WHERE Id_Places = places.Id_Places AND Id_User = ?);";
  db.query(query, [userId], (err, results) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.json(results[0]);
  });
});

// check runing
const PORT = process.env.PORT || 5000;
app.get("/", (req, res) => {
  res.send("Server running with ExpressJS");
});
app.listen(PORT, () => {
  console.log(`Server running on port: http://localhost:${PORT}`);
});
