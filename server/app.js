import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mysql from "mysql";
import bcrypt from "bcryptjs";
import bodyParser from "body-parser";
import session from "express-session";
import multer from "multer";
import path from "path";
import { redirect } from "react-router-dom";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { FunctionDeclarationSchemaType } from "@google/generative-ai";
//=================================SETUP=================================
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
//=====================================================================
//============================= GEMINI SETUP================================
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
let model = genAI.getGenerativeModel({
  model: "gemini-1.5-pro",
  generationConfig: {
    responseMimeType: "application/json",
    responseSchema: {
      type: FunctionDeclarationSchemaType.ARRAY,
      items: {
        type: FunctionDeclarationSchemaType.OBJECT,
        properties: {
          Id_Places: {
            type: FunctionDeclarationSchemaType.INTEGER,
          },
          Name: {
            type: FunctionDeclarationSchemaType.STRING,
          },
          Latitude: {
            type: FunctionDeclarationSchemaType.STRING,
          },
          Longtitude: {
            type: FunctionDeclarationSchemaType.STRING,
          },
        },
      },
    },
  },
});
// ======================================================================
//============================= CREDENTIAL ==============================
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
        name: user.Name,
      };

      if (user.Role === "Guide") {
        res
          .status(200)
          .json({ message: "Login successful", redirectUrl: "/dashboard" });
      } else if (user.Role === "Admin") {
        res.status(200).json({
          message: "Login successful",
          redirectUrl: "/Admin",
        });
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
//=========================================================
// =================== PLACES ALL LOGIC ===================
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
// ======= CRUD =======
// add place
app.post("/api/places", upload.single("image"), (req, res) => {
  if (!req.session.user) {
    return res.status(401).send("Not logged in");
  }

  const {
    name,
    price,
    Size,
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
    INSERT INTO places (name, AVG_Price,Size, Category, Longtitude, Latitude, Link, Description, Image, Id_User)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;
  db.query(
    query,
    [
      name,
      price,
      Size,
      Category,
      longitude, // pastikan urutannya sesuai
      latitude,
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
// get place by id
app.get("/api/get/places/:id", (req, res) => {
  const placeId = req.params.id;
  const query = "SELECT * FROM places WHERE Id_Places = ?";
  db.query(query, [placeId], (err, results) => {
    if (err) {
      return res.status(500).send(err);
    }
    if (results.length === 0) {
      return res.status(404).send("Place not found");
    }
    res.json(results[0]);
  });
});

// update place
app.put("/api/places/update/:id", upload.single("image"), (req, res) => {
  if (!req.session.user) {
    return res.status(401).send("Not logged in");
  }

  const placeId = req.params.id;
  const {
    Name,
    AVG_Price,
    Size,
    Category,
    Longtitude,
    Latitude,
    Link,
    Description,
    Img_old, // The old image path
  } = req.body;
  // If a new image is uploaded, use it; otherwise, use the old image
  const image = req.file ? `/uploads/${req.file.filename}` : Img_old;
  const userId = req.session.user.id;

  const query = `
    UPDATE places 
    SET name = ?, AVG_Price = ?,Size = ?, Category = ?, Latitude = ?, Longtitude = ?, Link = ?, Description = ?, Image = ?
    WHERE Id_Places = ? AND Id_User = ?
  `;
  db.query(
    query,
    [
      Name,
      AVG_Price,
      Size,
      Category,
      Latitude,
      Longtitude,
      Link,
      Description,
      image,
      placeId,
      userId,
    ],
    (err, results) => {
      if (err) {
        console.error(err);
        return res.status(500).send("Error updating place");
      }
      if (results.affectedRows === 0) {
        return res.status(404).send("Place not found or not authorized");
      }
      res
        .status(200)
        .json({ message: "Update successful", redirectUrl: "/dashboard" });
    }
  );
});
// delete place
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
//card logic main
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
// user fav card
app.get("/api/card/fav", (req, res) => {
  const userId = req.session.user.id;
  const query = `
    SELECT * 
    FROM favorite 
    INNER JOIN places USING (Id_Places) 
    WHERE favorite.Id_User = ?
  `;

  db.query(query, [userId], (err, results) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.json(results);
  });
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
// count all place
app.get("/api/totalplaces", (req, res) => {
  const query = "SELECT COUNT(*) as total FROM places";
  db.query(query, (err, results) => {
    if (err) {
      return res.status;
    }
    res.json(results[0]);
  });
});
//==========================================================================
// =============================== FAVORITE ================================

// total favorite place by user end point
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
// favorite place obtained by user end point
app.get("/api/FavPlaces", (req, res) => {
  if (!req.session.user) {
    return res.status(401).send("Not logged in");
  }

  const userId = req.session.user.id;
  const query = `
SELECT COUNT(*) AS total_favorites
FROM favorite
INNER JOIN places ON places.Id_Places = favorite.Id_Places
WHERE places.Id_User = ?;
`;

  db.query(query, [userId], (err, results) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.json(results[0]);
  });
});
// favorite place by user
app.get("/api/personal/Favplaces", (req, res) => {
  const userId = req.session.user.id;
  const query = `
    SELECT COUNT(*) AS total_favorites 
    FROM favorite 
    WHERE Id_User = ?;
  `;
  db.query(query, [userId], (err, results) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.json(results[0]);
  });
});
// Endpoint to get verify favorite status
app.get("/api/favorite/status/:placeId", (req, res) => {
  const { placeId } = req.params;
  const userId = req.session.user.id;
  const query =
    "SELECT COUNT(*) AS count FROM favorite WHERE Id_User = ? AND Id_Places = ?";
  db.query(query, [userId, placeId], (err, result) => {
    if (err) {
      return res.status(500).json({ error: "Failed to fetch favorite status" });
    }

    const isFavorited = result[0].count > 0;
    res.json({ isFavorited });
  });
});
// Endpoint to add a place to favorites
app.post("/api/add/favorites", (req, res) => {
  const { placeId } = req.body;
  const userId = req.session.user.id; // Assuming user ID is stored in the session
  if (!userId) {
    return res.status(401).json({ error: "User not logged in" });
  }

  const query = "INSERT INTO favorite (Id_User, Id_Places) VALUES (?, ?)";
  db.query(query, [userId, placeId], (err, result) => {
    if (err) {
      return res.status(500).json({ error: "Failed to add to favorites" });
    }
    res.json({ message: "Added to favorites" });
    redirect("/homecard");
  });
});
// Endpoint to remove a place from favorites
app.delete("/api/delete/favorites/:placeId", (req, res) => {
  const { placeId } = req.params;
  const userId = req.session.user.id;

  if (!userId) {
    return res.status(401).json({ error: "User not logged in" });
  }

  const query = "DELETE FROM favorite WHERE Id_User = ? AND Id_Places = ?";
  db.query(query, [userId, placeId], (err, result) => {
    if (err) {
      return res.status(500).json({ error: "Failed to remove from favorites" });
    }
    res.json({ message: "Removed from favorites" });
    redirect("/homecard");
  });
});

//========================= CRUD CONTACT ==========================
// Create (inssert) contact
app.post("/api/contact", (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).send("All fields are required.");
  }

  db.query(
    "INSERT INTO contact (Name, Email, Massage) VALUES (?, ?, ?)",
    [name, email, message],
    (err) => {
      if (err) {
        console.error("Error saving the message:", err);
        return res.status(500).send("Error saving the message");
      }
      console.log("Message received:", { name, email, message });
      res.status(200).send("Message saved successfully");
    }
  );
});
//================================================================
//========================== USER CRUD ===========================
// get all user
app.get("/api/users", (req, res) => {
  const query =
    "SELECT * FROM users WHERE Role != 'Admin' ORDER BY `users`.`Role` DESC";
  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.json(results);
  });
});
// count all user
app.get("/api/all/users", (req, res) => {
  const query = "SELECT COUNT(*) as total FROM users";
  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.json(results[0]);
  });
});
// delete user
app.delete("/api/users/delete/:id", (req, res) => {
  const userId = req.params.id;
  const query = "DELETE FROM users WHERE Id_User = ? AND Role != 'Admin'";
  db.query(query, [userId], (err, results) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.status(200).send("User deleted successfully");
  });
});
// count all user by role
app.get("/api/totalusers/:role", (req, res) => {
  const role = req.params.role;
  const query = "SELECT COUNT(*) as total FROM users WHERE Role = ?";
  db.query(query, [role], (err, results) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.json(results[0]);
  });
});
//update user role to guide when aproved by admin
app.put("/api/users/update/:id", (req, res) => {
  const userId = req.params.id;
  const query1 = "UPDATE users SET Role = 'Guide' WHERE Id_User = ?";
  db.query(query1, [userId], (err, results) => {
    if (err) {
      return res.status(500).send(err);
    }
    const query2 =
      "UPDATE registerguide SET Status = 'Approved' WHERE Id_User = ?";
    db.query(query2, [userId], (err, results) => {
      if (err) {
        return res.status(500).send(err);
      }
      res
        .status(200)
        .send("User role updated to Guide and status changed to Approved");
    });
  });
});
//delete register guide request when rejected by admin
app.delete("/api/users/deleterequest/:id", (req, res) => {
  const userId = req.params.id;
  const query = "DELETE FROM registerguide WHERE Id_User = ?";
  db.query(query, [userId], (err, results) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.status(200).send("User rejected successfully");
  });
});
//update user password by user and admin
app.put("/api/users/update/password/:id", (req, res) => {
  const userId = req.params.id;
  const { password } = req.body;
  bcrypt.hash(password, saltRounds, (err, hash) => {
    if (err) {
      return res.status(500).send("Server Error");
    }
    const query = "UPDATE users SET Password = ? WHERE Id_User = ?";
    db.query(query, [hash, userId], (err, results) => {
      if (err) {
        return res.status(500).send(err);
      }
      res.status(200).send("Password updated successfully");
    });
  });
});
// get all admin
app.get("/api/Admin", (req, res) => {
  const query = "SELECT * FROM users WHERE Role = 'Admin'";
  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.json(results);
  });
});
// guide request
app.post("/api/registerguide", (req, res) => {
  const { Alasan } = req.body;
  const idUser = req.session.user.id;
  const status = "Pending";
  const query =
    "INSERT INTO registerguide (Id_User, Alasan, Status) VALUES (?, ?, ?)";
  db.query(query, [idUser, Alasan, status], (err, results) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.status(201).send("Guide request submitted");
  });
});
// get all guide request
app.get("/api/GuideRequest", (req, res) => {
  const query =
    "SELECT * FROM registerguide INNER JOIN users using(Id_User) WHERE registerguide.Status = 'Pending'";
  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.json(results);
  });
});
// check pending guide request
app.get("/api/registerguide/check", (req, res) => {
  const userId = req.session.user.id;
  const query =
    "SELECT COUNT(*) as hasPendingRequest FROM registerguide WHERE Id_User = ? AND Status = 'Pending'";
  db.query(query, [userId], (err, results) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.json(results[0]);
  });
});
//=================================================================
//========================== Message CRUD =========================
// count all message
app.get("/api/messages", (req, res) => {
  const query = "SELECT COUNT(*) as total FROM contact";
  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.json(results[0]);
  });
});
// get all message
app.get("/api/contact", (req, res) => {
  const query = "SELECT * FROM contact";
  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.json(results);
  });
});
// delete message
app.delete("/api/contact/delete/:id", (req, res) => {
  const messageId = req.params.id;
  const query = "DELETE FROM contact WHERE Id_Contact = ?";
  db.query(query, [messageId], (err, results) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.status(200).send("Message deleted successfully");
  });
});
//=================================================================
//========================== GEMINI LOGIC ==========================
// search by gemini
app.get("/gemini", async (req, res) => {
  try {
    // Mengambil daftar tempat dari API lokal
    const response = await fetch("http://localhost:5000/card/up");
    const ListTempat = await response.json();

    // Ketentuan yang digunakan untuk filter tempat
    const ketentuan = {
      budget: req.query.budget,
      ukuran: req.query.ukuran,
      category: req.query.category,
    };

    // Membuat prompt untuk Google Generative AI
    const prompt = `
      Saya memiliki daftar tempat berikut: ${JSON.stringify(ListTempat)}.
      berikan tempat terbaik untuk saya berdasarkan ketentuan berikut:
      - Budget sekitar: ${ketentuan.budget}
      - Category: ${ketentuan.category}
      cari tempat yang sesuai dari daftar saya ataupun yang paling 
      mendekati sesuai dari ketentuan di atas.
    `;

    // Menghasilkan konten dengan Google Generative AI
    let result = await model.generateContent(prompt);
    let place = JSON.parse(result.response.text());

    // Mengirimkan hasilnya sebagai respons JSON
    res.json(place);
  } catch (error) {
    console.error("Error generating content:", error);
    res.status(500).json({ error: "Failed to generate content" });
  }
});
// add place by gemini
app.get("/api/gemini/add", async (req, res) => {
  const ketentuan = {
    budget: req.query.budget,
    ukuran: req.query.ukuran,
    category: req.query.category,
    lokasi: req.query.lokasi,
    kriteria: req.query.kriteria,
  };
  const prompt = `berikan saya 1 tempat terbaik dengan kriteria ${ketentuan.kriteria} untuk saya 
  sekitaran ${ketentuan.lokasi}, 
  dengan budget sekitar ${ketentuan.budget}, dan ukuran ${ketentuan.ukuran} 
  dengan kategori ${ketentuan.category}.`;
  // Menghasilkan konten dengan Google Generative AI
  let result = await model.generateContent(prompt);
  let place = JSON.parse(result.response.text());

  // Mengirimkan hasilnya sebagai respons JSON
  res.json(place);
});
//========================== SERVER RUNNING =======================
// check runing
const PORT = process.env.PORT || 5000;
app.get("/", (req, res) => {
  res.send("Server running with ExpressJS");
});
app.listen(PORT, () => {
  console.log(`Server running on port: http://localhost:${PORT}`);
});
