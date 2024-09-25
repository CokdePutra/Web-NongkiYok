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
import nodemailer from "nodemailer";
import Swal from "sweetalert2";
import e from "express";
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
  console.log("Connected to the database", db.config.database);
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

// Konfigurasi transporter untuk mengirim email
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER, // Email pengirim
    pass: process.env.EMAIL_PASS, // Password atau App password (jika menggunakan Gmail)
  },
});
// ============================== EMAIL TEST =============================
console.log("email user", process.env.EMAIL_USER);
console.log("Pass", process.env.EMAIL_PASS);
console.log("Host", process.env.EMAIL_HOST);
// let mailOptions = {
//   from: {
//     name: "Nongki YOK",
//     address: process.env.EMAIL_USER,
//   },
//   to: ["cokgdeputrawidnyana25@gmail.com", "gungnanda14@gmail.com"],
//   subject: "Test Email",
//   html: "<h1>Test email</h1><p>This is a test email</p>",
// };

// transporter.sendMail(mailOptions, (error, info) => {
//   if (error) {
//     console.log("Error sending email: ", error);
//   } else {
//     console.log("Email sent: " + info.response);
//   }
// });
// ============================== END EMAIL TEST =============================
//=====================================================================
//============================= GEMINI SETUP================================
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
// config model for get place by gemini
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
// config model for add place by gemini
let modeladd = genAI.getGenerativeModel({
  model: "gemini-1.5-pro",
  generationConfig: {
    responseMimeType: "application/json",
    responseSchema: {
      type: FunctionDeclarationSchemaType.ARRAY,
      items: {
        type: FunctionDeclarationSchemaType.OBJECT,
        properties: {
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
  const checkQuery = "SELECT * FROM users WHERE Email = ? OR Username = ?";
  db.query(checkQuery, [email, username], (err, results) => {
    if (err) {
      return res.status(500).send("Server Error");
    }
    // Jika email atau username sudah terdaftar
    if (results.length > 0) {
      const isEmailTaken = results.some((user) => user.Email === email);
      const isUsernameTaken = results.some(
        (user) => user.Username === username
      );

      if (isEmailTaken && isUsernameTaken) {
        return res
          .status(400)
          .json({ message: "Email dan Username sudah digunakan" });
      } else if (isEmailTaken) {
        return res.status(400).json({ message: "Email sudah digunakan" });
      } else if (isUsernameTaken) {
        return res.status(400).json({ message: "Username sudah digunakan" });
      }
    }
    // Membuat token verifikasi sederhana
    const verificationToken = Math.floor(
      100000 + Math.random() * 900000
    ).toString();

    bcrypt.hash(password, saltRounds, (err, hash) => {
      if (err) {
        return res.status(500).send("Server Error");
      }

      const query =
        "INSERT INTO users (Name, Email, Password, Role, Username, VerificationToken, IsVerified) VALUES (?, ?, ?, ?, ?, ?, ?)";

      db.query(
        query,
        [name, email, hash, role, username, verificationToken, false],
        (err, results) => {
          if (err) {
            console.log(err);
            return res.status(500).send("Error creating user");
          }

          // Mengirim email verifikasi
          let mailOptions = {
            from: {
              name: "Nongki YOK",
              address: process.env.EMAIL_USER,
            },
            to: email,
            subject: "Email Verification",
            html: `<!DOCTYPE html>
        <html lang="en">
        
        <head>
            <meta charset="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <meta http-equiv="X-UA-Compatible" content="ie=edge" />
            <title>Nongki-YOk</title>
        
            <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600&display=swap" rel="stylesheet" />
        </head>
        
        <body style="
              margin: 0;
              font-family: 'Poppins', sans-serif;
              background: #393E46;
              font-size: 14px;
            ">
            <div style="
                max-width: 680px;
                margin: 0 auto;
                padding: 45px 30px 60px;
                background: #393E46;
                background-repeat: no-repeat;
                background-size: 800px 452px;
                background-position: top center;
                font-size: 14px;
                color: #434343;
              ">
        
                <main>
                    <div style="
                    margin: 0;
                    margin-top: 70px;
                    padding: 92px 30px 115px;
                    background: #ffffffee;
                    border-radius: 30px;
                    text-align: center;
                  ">
                        <div style="width: 100%; max-width: 489px; margin: 0 auto;">
                            <h1 style="
                        margin: 0;
                        font-size: 24px;
                        font-weight: 500;
                        color: #1f1f1f;
                      ">
                                Your verification code
                            </h1>
                            <p style="
                        margin: 0;
                        margin-top: 17px;
                        font-size: 16px;
                        font-weight: 500;
                      ">
                                Hey ,${name}
                            </p>
                            <p style="
                        margin: 0;
                        margin-top: 17px;
                        font-weight: 500;
                        letter-spacing: 0.56px;
                      ">
                                Thank you for creating account in Nongki-Yok. Use the following OTP
                                to complete the procedure to change your email address. OTP is
                                valid for
                                <span style="font-weight: 600; color: #1f1f1f;">5 minutes</span>.
                                Do not share this code with anyone.
                            </p>
                            <p style="
                        margin: 0;
                        margin-top: 60px;
                        font-size: 25px;
                        font-weight: 600;
                        letter-spacing: 20px;
                        color: #ba3d4f;
                      ">
                        ${verificationToken}
                            </p>
                        </div>
                    </div>
        
                    <p style="
                    max-width: 400px;
                    margin: 0 auto;
                    margin-top: 90px;
                    text-align: center;
                    font-weight: 500;
                    color: #ffffff;
                  ">
                        Need help? Ask at
                        <a href="mailto:archisketch@gmail.com"
                            style="color: #FCBC36; text-decoration: none;">nongki-yok@gungnanda.com</a>
                        or visit our
                        <a href="http://localhost:5173/Contact" target="_blank"
                            style="color: #FCBC36; text-decoration: none;">Help Center</a>
                    </p>
                </main>
        
                <footer style="
                  width: 100%;
                  max-width: 490px;
                  margin: 20px auto 0;
                  text-align: center;
                  border-top: 1px solid #e6ebf1;
                ">
                    <p style="
                    margin: 0;
                    margin-top: 40px;
                    font-size: 16px;
                    font-weight: 600;
                    color: #FCBC36;
                  ">
                        Nongki-Yok
                    </p>
                    <p style="margin: 0; margin-top: 8px; color: #ffffff;">
                        Denpasar No666, Bali, Indonesia
                    </p>
                    <div style="margin: 0; margin-top: 16px;">
                        <a href="" target="_blank" style="display: inline-block;">
                            <img width="36px" alt="Facebook"
                                src="https://archisketch-resources.s3.ap-northeast-2.amazonaws.com/vrstyler/1661502815169_682499/email-template-icon-facebook" />
                        </a>
                        <a href="" target="_blank" style="display: inline-block; margin-left: 8px;">
                            <img width="36px" alt="Instagram"
                                src="https://archisketch-resources.s3.ap-northeast-2.amazonaws.com/vrstyler/1661504218208_684135/email-template-icon-instagram" /></a>
                        <a href="" target="_blank" style="display: inline-block; margin-left: 8px;">
                            <img width="36px" alt="Twitter"
                                src="https://archisketch-resources.s3.ap-northeast-2.amazonaws.com/vrstyler/1661503043040_372004/email-template-icon-twitter" />
                        </a>
                        <a href="" target="_blank" style="display: inline-block; margin-left: 8px;">
                            <img width="36px" alt="Youtube"
                                src="https://archisketch-resources.s3.ap-northeast-2.amazonaws.com/vrstyler/1661503195931_210869/email-template-icon-youtube" /></a>
                    </div>
                    <p style="margin: 0; margin-top: 16px; color: #434343;">
                        Copyright © 2024 Nongki Yok. All rights reserved.
                    </p>
                </footer>
            </div>
        </body>
        
        </html>`,
          };

          transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
              console.log(error);
              return res.status(500).send("Error sending verification email");
            }
            res.status(201).send("User registered. Please verify your email.");
          });
        }
      );
      app.post("/verify-email", (req, res) => {
        const { email, verificationToken } = req.body;

        const query =
          "SELECT * FROM users WHERE Email = ? AND VerificationToken = ?";
        db.query(query, [email, verificationToken], (err, results) => {
          if (err) {
            console.log(err);
            return res.status(500).send("Error verifying email");
          }

          if (results.length > 0) {
            const updateQuery =
              "UPDATE users SET IsVerified = true WHERE Email = ?";
            db.query(updateQuery, [email], (err, updateResults) => {
              if (err) {
                console.log(err);
                return res
                  .status(500)
                  .send("Error updating user verification status");
              }
              res.status(200).send("Email verified successfully");
            });
          } else {
            res.status(400).send("Invalid verification token");
          }
        });
      });
    });
  });
});
// email verification
app.post("/verify-email", (req, res) => {
  const { email, verificationToken } = req.body;

  const query = "SELECT * FROM users WHERE Email = ? AND VerificationToken = ?";
  db.query(query, [email, verificationToken], (err, results) => {
    if (err) {
      console.log(err);
      return res.status(500).send("Error verifying email");
    }

    if (results.length > 0) {
      const updateQuery = "UPDATE users SET IsVerified = true WHERE Email = ?";
      db.query(updateQuery, [email], (err, updateResults) => {
        if (err) {
          console.log(err);
          return res
            .status(500)
            .send("Error updating user verification status");
        }
        res.status(200).send("Email verified successfully");
      });
    } else {
      res.status(400).send("Invalid verification token");
    }
  });
});
// contact email send
app.post("/api/contact/reply/:id", async (req, res) => {
  const { id } = req.params;
  const { message } = req.body;
  const { reply } = req.body;
  try {
    // Query ke database untuk mendapatkan data pesan dari ID
    const query = "SELECT * FROM contact WHERE Id_Contact = ?";
    db.query(query, [id], (err, result) => {
      if (err) {
        console.error("Error fetching message:", err);
        return res.status(500).json({ message: "Database error" });
      }

      if (result.length === 0) {
        return res.status(404).json({ message: "Message not found" });
      }

      const messageData = result[0];
      const recipientEmail = messageData.Email; // Email penerima dari penanya

      // Konfigurasi email yang akan dikirim
      const mailOptions = {
        from: {
          name: "Nongki YOK",
          address: process.env.EMAIL_USER,
        },
        to: recipientEmail,
        subject: `Reply to ${messageData.Name} Message`,
        html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
  <p style="font-size: 16px; color: #333;">Dear <strong>${messageData.Name}</strong>,</p>

  <p style="font-size: 16px;">
    Thank you for reaching out to us. We truly value your engagement and appreciate the time you took to send us your message. Below is a summary of your message and our response:
  </p>

  <div style="border-top: 1px solid #ddd; border-bottom: 1px solid #ddd; padding: 10px 0; margin: 20px 0;">
    <p style="font-size: 16px;"><strong>Your Message:</strong></p>
    <blockquote style="margin: 10px 0; padding-left: 15px; border-left: 4px solid #f0a500; color: #555;">
      "${message}"
    </blockquote>

    <p style="font-size: 16px;"><strong>Our Reply:</strong></p>
    <blockquote style="margin: 10px 0; padding-left: 15px; border-left: 4px solid #1e90ff; color: #555;">
      "${reply}"
    </blockquote>
  </div>

  <p style="font-size: 16px;">
    If you have any further questions or need additional assistance, feel free to reach out again. We are always here to help!
  </p>

  <p style="font-size: 16px;">
    Warm regards,<br />
    <strong>The Nongki Yok Team</strong><br />
    <span style="font-style: italic; color: #666;">Find the best spots to hang out near you!</span>
  </p>
</div>
`,
      };

      // Mengirim email
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error("Error sending email:", error);
          return res.status(500).json({ message: "Error sending email" });
        } else {
          console.log("Email sent: " + info.response);
          return res.status(200).json({ message: "Reply sent successfully" });
        }
      });
    });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ message: "Server error" });
  }
});
// resend email verification
app.post("/resend-otp", (req, res) => {
  const { email } = req.body;

  // Cek apakah user sudah ada di database
  const query = "SELECT * FROM users WHERE Email = ?";
  db.query(query, [email], (err, results) => {
    if (err) {
      console.log(err);
      return res.status(500).send("Error mencari user");
    }

    if (results.length === 0) {
      return res.status(404).send("User tidak ditemukan");
    }

    const user = results[0];

    // Cek apakah user sudah terverifikasi
    if (user.IsVerified) {
      return res.status(400).send("Email sudah diverifikasi");
    }

    // Membuat OTP baru
    const newOTP = Math.floor(100000 + Math.random() * 900000).toString();

    // Update token verifikasi di database
    const updateQuery =
      "UPDATE users SET VerificationToken = ? WHERE Email = ?";
    db.query(updateQuery, [newOTP, email], (updateErr) => {
      if (updateErr) {
        console.log(updateErr);
        return res.status(500).send("Error memperbarui token verifikasi");
      }
      // Konfigurasi email yang akan dikirim
      const mailOptions = {
        from: {
          name: "Nongki YOK",
          address: process.env.EMAIL_USER,
        },
        to: email,
        subject: "Resend Email Verification",
        html: `
          <h1>Email Verification Code</h1>
          <p>Hi ${user.Name},</p>
          <p>Use the following verification code to verify your email:</p>
          <h2>${newOTP}</h2>
          <p>Code is valid for 5 minutes.</p>
        `,
        html: `<!DOCTYPE html>
        <html lang="en">
        
        <head>
            <meta charset="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <meta http-equiv="X-UA-Compatible" content="ie=edge" />
            <title>Nongki-YOk</title>
        
            <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600&display=swap" rel="stylesheet" />
        </head>
        
        <body style="
              margin: 0;
              font-family: 'Poppins', sans-serif;
              background: #393E46;
              font-size: 14px;
            ">
            <div style="
                max-width: 680px;
                margin: 0 auto;
                padding: 45px 30px 60px;
                background: #393E46;
                background-repeat: no-repeat;
                background-size: 800px 452px;
                background-position: top center;
                font-size: 14px;
                color: #434343;
              ">
        
                <main>
                    <div style="
                    margin: 0;
                    margin-top: 70px;
                    padding: 92px 30px 115px;
                    background: #ffffffee;
                    border-radius: 30px;
                    text-align: center;
                  ">
                        <div style="width: 100%; max-width: 489px; margin: 0 auto;">
                            <h1 style="
                        margin: 0;
                        font-size: 24px;
                        font-weight: 500;
                        color: #1f1f1f;
                      ">
                                Your verification code
                            </h1>
                            <p style="
                        margin: 0;
                        margin-top: 17px;
                        font-size: 16px;
                        font-weight: 500;
                      ">
                                Hey ,${user.Name}
                            </p>
                            <p style="
                        margin: 0;
                        margin-top: 17px;
                        font-weight: 500;
                        letter-spacing: 0.56px;
                      ">
                                Thank you for creating account in Nongki-Yok. Use the following OTP
                                to complete the procedure to change your email address. OTP is
                                valid for
                                <span style="font-weight: 600; color: #1f1f1f;">5 minutes</span>.
                                Do not share this code with anyone.
                            </p>
                            <p style="
                        margin: 0;
                        margin-top: 60px;
                        font-size: 25px;
                        font-weight: 600;
                        letter-spacing: 20px;
                        color: #ba3d4f;
                      ">
                      ${newOTP}
                            </p>
                        </div>
                    </div>
        
                    <p style="
                    max-width: 400px;
                    margin: 0 auto;
                    margin-top: 90px;
                    text-align: center;
                    font-weight: 500;
                    color: #ffffff;
                  ">
                        Need help? Ask at
                        <a href="mailto:archisketch@gmail.com"
                            style="color: #FCBC36; text-decoration: none;">nongki-yok@gungnanda.com</a>
                        or visit our
                        <a href="http://localhost:5173/Contact" target="_blank"
                            style="color: #FCBC36; text-decoration: none;">Help Center</a>
                    </p>
                </main>
        
                <footer style="
                  width: 100%;
                  max-width: 490px;
                  margin: 20px auto 0;
                  text-align: center;
                  border-top: 1px solid #e6ebf1;
                ">
                    <p style="
                    margin: 0;
                    margin-top: 40px;
                    font-size: 16px;
                    font-weight: 600;
                    color: #FCBC36;
                  ">
                        Nongki-Yok
                    </p>
                    <p style="margin: 0; margin-top: 8px; color: #ffffff;">
                        Denpasar No666, Bali, Indonesia
                    </p>
                    <div style="margin: 0; margin-top: 16px;">
                        <a href="" target="_blank" style="display: inline-block;">
                            <img width="36px" alt="Facebook"
                                src="https://archisketch-resources.s3.ap-northeast-2.amazonaws.com/vrstyler/1661502815169_682499/email-template-icon-facebook" />
                        </a>
                        <a href="" target="_blank" style="display: inline-block; margin-left: 8px;">
                            <img width="36px" alt="Instagram"
                                src="https://archisketch-resources.s3.ap-northeast-2.amazonaws.com/vrstyler/1661504218208_684135/email-template-icon-instagram" /></a>
                        <a href="" target="_blank" style="display: inline-block; margin-left: 8px;">
                            <img width="36px" alt="Twitter"
                                src="https://archisketch-resources.s3.ap-northeast-2.amazonaws.com/vrstyler/1661503043040_372004/email-template-icon-twitter" />
                        </a>
                        <a href="" target="_blank" style="display: inline-block; margin-left: 8px;">
                            <img width="36px" alt="Youtube"
                                src="https://archisketch-resources.s3.ap-northeast-2.amazonaws.com/vrstyler/1661503195931_210869/email-template-icon-youtube" /></a>
                    </div>
                    <p style="margin: 0; margin-top: 16px; color: #434343;">
                        Copyright © 2024 Nongki Yok. All rights reserved.
                    </p>
                </footer>
            </div>
        </body>
        
        </html>`,
      };

      // Mengirim email
      transporter.sendMail(mailOptions, (mailErr, info) => {
        if (mailErr) {
          console.log(mailErr);
          return res.status(500).send("Error mengirim email verifikasi ulang");
        }

        res.status(200).send("Kode verifikasi baru telah dikirim");
      });
    });
  });
});
// resend email verification
app.post("/resend-otp2", (req, res) => {
  const { email } = req.body;

  const query = "SELECT * FROM users WHERE Email = ?";
  db.query(query, [email], (err, results) => {
    if (err) {
      console.log(err);
      return res.status(500).send("Error mencari user");
    }

    if (results.length === 0) {
      return res.status(404).send("User tidak ditemukan");
    }

    const user = results[0];
    const newOTP = Math.floor(100000 + Math.random() * 900000).toString();

    // Update token verifikasi di database
    const updateQuery =
      "UPDATE users SET VerificationToken = ? WHERE Email = ?";
    db.query(updateQuery, [newOTP, email], (updateErr) => {
      if (updateErr) {
        console.log(updateErr);
        return res.status(500).send("Error memperbarui token verifikasi");
      }
      const mailOptions = {
        from: {
          name: "Nongki YOK",
          address: process.env.EMAIL_USER,
        },
        to: email,
        subject: "Reset Password Request",
        html: `
          <h1>Reset Password Request</h1>
          <p>Hi ${user.Name},</p>
          <p>Use the following verification code to verify your email for reseting password:</p>
          <h2>${newOTP}</h2>
          <p>Code is valid for 5 minutes.</p>
        `,
        html: `<!DOCTYPE html>
        <html lang="en">
        
        <head>
            <meta charset="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <meta http-equiv="X-UA-Compatible" content="ie=edge" />
            <title>Nongki-YOk</title>
        
            <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600&display=swap" rel="stylesheet" />
        </head>
        
        <body style="
              margin: 0;
              font-family: 'Poppins', sans-serif;
              background: #393E46;
              font-size: 14px;
            ">
            <div style="
                max-width: 680px;
                margin: 0 auto;
                padding: 45px 30px 60px;
                background: #393E46;
                background-repeat: no-repeat;
                background-size: 800px 452px;
                background-position: top center;
                font-size: 14px;
                color: #434343;
              ">
        
                <main>
                    <div style="
                    margin: 0;
                    margin-top: 70px;
                    padding: 92px 30px 115px;
                    background: #ffffffee;
                    border-radius: 30px;
                    text-align: center;
                  ">
                        <div style="width: 100%; max-width: 489px; margin: 0 auto;">
                            <h1 style="
                        margin: 0;
                        font-size: 24px;
                        font-weight: 500;
                        color: #1f1f1f;
                      ">
                                Your verification code
                            </h1>
                            <p style="
                        margin: 0;
                        margin-top: 17px;
                        font-size: 16px;
                        font-weight: 500;
                      ">
                                Hey ,${user.Name}
                            </p>
                            <p style="
                        margin: 0;
                        margin-top: 17px;
                        font-weight: 500;
                        letter-spacing: 0.56px;
                      ">
                                Thank you for using Nongki-Yok. Use the following OTP
                                to complete the procedure to reset your email address. OTP is
                                valid for
                                <span style="font-weight: 600; color: #1f1f1f;">5 minutes</span>.
                                Do not share this code with anyone.
                            </p>
                            <p style="
                        margin: 0;
                        margin-top: 60px;
                        font-size: 25px;
                        font-weight: 600;
                        letter-spacing: 20px;
                        color: #ba3d4f;
                      ">
                      ${newOTP}
                            </p>
                        </div>
                    </div>
        
                    <p style="
                    max-width: 400px;
                    margin: 0 auto;
                    margin-top: 90px;
                    text-align: center;
                    font-weight: 500;
                    color: #ffffff;
                  ">
                        Need help? Ask at
                        <a href="mailto:archisketch@gmail.com"
                            style="color: #FCBC36; text-decoration: none;">nongki-yok@gungnanda.com</a>
                        or visit our
                        <a href="http://localhost:5173/Contact" target="_blank"
                            style="color: #FCBC36; text-decoration: none;">Help Center</a>
                    </p>
                </main>
        
                <footer style="
                  width: 100%;
                  max-width: 490px;
                  margin: 20px auto 0;
                  text-align: center;
                  border-top: 1px solid #e6ebf1;
                ">
                    <p style="
                    margin: 0;
                    margin-top: 40px;
                    font-size: 16px;
                    font-weight: 600;
                    color: #FCBC36;
                  ">
                        Nongki-Yok
                    </p>
                    <p style="margin: 0; margin-top: 8px; color: #ffffff;">
                        Denpasar No666, Bali, Indonesia
                    </p>
                    <div style="margin: 0; margin-top: 16px;">
                        <a href="" target="_blank" style="display: inline-block;">
                            <img width="36px" alt="Facebook"
                                src="https://archisketch-resources.s3.ap-northeast-2.amazonaws.com/vrstyler/1661502815169_682499/email-template-icon-facebook" />
                        </a>
                        <a href="" target="_blank" style="display: inline-block; margin-left: 8px;">
                            <img width="36px" alt="Instagram"
                                src="https://archisketch-resources.s3.ap-northeast-2.amazonaws.com/vrstyler/1661504218208_684135/email-template-icon-instagram" /></a>
                        <a href="" target="_blank" style="display: inline-block; margin-left: 8px;">
                            <img width="36px" alt="Twitter"
                                src="https://archisketch-resources.s3.ap-northeast-2.amazonaws.com/vrstyler/1661503043040_372004/email-template-icon-twitter" />
                        </a>
                        <a href="" target="_blank" style="display: inline-block; margin-left: 8px;">
                            <img width="36px" alt="Youtube"
                                src="https://archisketch-resources.s3.ap-northeast-2.amazonaws.com/vrstyler/1661503195931_210869/email-template-icon-youtube" /></a>
                    </div>
                    <p style="margin: 0; margin-top: 16px; color: #434343;">
                        Copyright © 2024 Nongki Yok. All rights reserved.
                    </p>
                </footer>
            </div>
        </body>
        
        </html>`,
      };

      // Mengirim email
      transporter.sendMail(mailOptions, (mailErr, info) => {
        if (mailErr) {
          console.log(mailErr);
          return res.status(500).send("Error mengirim email verifikasi ulang");
        }

        res.status(200).send("Kode verifikasi baru telah dikirim");
      });
    });
  });
});
// forgot password
app.post("/verify-reset-otp", (req, res) => {
  const { email, otp, newPassword } = req.body;

  // Query untuk cek email dan otp
  const query = "SELECT * FROM users WHERE email = ? AND VerificationToken = ?";
  db.query(query, [email, otp], async (err, results) => {
    if (err) {
      console.log(err);
      return res.status(500).send("Error verifying OTP");
    }
    if (results.length > 0) {
      try {
        const hashedPassword = await bcrypt.hash(newPassword, saltRounds);
        // Update password di database
        const updateQuery = "UPDATE users SET password = ? WHERE email = ?";
        db.query(updateQuery, [hashedPassword, email], (err, updateResults) => {
          if (err) {
            console.log(err);
            return res.status(500).send("Error updating user password");
          }
          res.status(200).send("Password updated successfully");
        });
      } catch (error) {
        console.error(error);
        res.status(500).send("Error hashing password");
      }
    } else {
      res.status(400).send("Invalid OTP");
    }
  });
});
// LOGIN
app.post("/login", (req, res) => {
  const { username, password } = req.body;
  const query = "SELECT * FROM users WHERE Username = ?";
  db.query(query, [username], (err, results) => {
    if (err) return res.status(500).send("Server Error");
    if (results.length === 0) return res.status(401).send("User not found");
    console.log("IsVerified", results[0].IsVerified);
    const user = results[0];
    if (!user.IsVerified) {
      return res.status(403).json({
        message: "Email not verified",
        verifyUrl: `${process.env.FRONTEND_URL}/verify-email/${user.Email}`,
      });
    }
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

  const image = req.file ? `/uploads/${req.file.filename}` : "";
  const userId = req.session.user.id;

  // Check if a place with the same name already exists
  const checkQuery = `SELECT * FROM places WHERE name = ?`;
  db.query(checkQuery, [name], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Error checking for existing place");
    }

    if (results.length > 0) {
      // Place with the same name already exists
      return res.status(409).send("Place with the same name already exists");
    }

    // No duplicate found, proceed with the insertion
    const insertQuery = `
      INSERT INTO places (name, AVG_Price, Size, Category, Longtitude, Latitude, Link, Description, Image, Id_User)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    db.query(
      insertQuery,
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
  const sortOrder = req.params.sort;
  const size = req.query.size; // Ambil query parameter 'size' dari request
  const category = req.query.category; // Ambil query parameter 'category' dari request
  console.log(
    "sort by",
    req.params.sort,
    "size",
    req.query.size,
    "category",
    req.query.category
  );
  let query = "SELECT * FROM places";
  let queryParams = [];

  // Cek apakah ada filter size dan category
  if (size || category) {
    query += " WHERE";

    if (size) {
      query += " Size = ?";
      queryParams.push(size);
    }

    if (category) {
      if (size) query += " AND"; // Tambahkan 'AND' jika size sudah ada
      query += " Category = ?";
      queryParams.push(category);
    }
  }

  // Sorting berdasarkan parameter yang diterima
  switch (sortOrder) {
    case "up":
      query += " ORDER BY AVG_Price DESC";
      break;
    case "down":
      query += " ORDER BY AVG_Price ASC";
      break;
    case "name-az":
      query += " ORDER BY Name ASC";
      break;
    case "name-za":
      query += " ORDER BY Name DESC";
      break;
    default:
      return res.status(500).send("Invalid sort parameter");
  }

  // Eksekusi query
  db.query(query, queryParams, (err, results) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.json(results);
    }
  });
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
// search places by name
app.get("/card/search/:query?", (req, res) => {
  const searchQuery = req.params.query || ""; // Ambil query, jika tidak ada jadikan string kosong
  console.log("search query", searchQuery);

  // Jika searchQuery kosong, ambil semua tempat
  if (searchQuery.trim() === "") {
    const query = "SELECT * FROM places";
    // Query ke database untuk semua tempat
    db.query(query, (err, results) => {
      if (err) {
        console.error("Database error:", err);
        return res.status(500).json({ message: "Internal server error" });
      }
      // Kirim semua data tempat
      res.json(results);
    });
  } else {
    // Query ke database berdasarkan pencarian
    const query = "SELECT * FROM places WHERE Name LIKE ?";
    db.query(query, [`%${searchQuery}%`], (err, results) => {
      if (err) {
        console.error("Database error:", err);
        return res.status(500).json({ message: "Internal server error" });
      }

      // Jika tidak ada hasil yang ditemukan
      if (results.length === 0) {
        return res.status(404).json({ message: "No places found" });
      }

      // Kirim hasil pencarian
      res.json(results);
    });
  }
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
  let result = await modeladd.generateContent(prompt);
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
