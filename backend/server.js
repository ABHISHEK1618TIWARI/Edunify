const express = require("express");
const mysql = require("mysql");
const multer = require("multer");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use("/schoolImages", express.static("schoolImages"));
// MySQL Connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "235623",
  database: "edunify",
});

db.connect((err) => {
  if (err) throw err;
  console.log("MySQL Connected...");
});

// Multer Configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, "schoolImages");
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + file.originalname;
    cb(null, uniqueSuffix);
  },
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const allowedTypes = ["image/jpeg", "image/png"];
    if (!allowedTypes.includes(file.mimetype)) {
      return cb(new Error("Only image files are allowed."));
    }
    cb(null, true);
  },
});

// Add School API
app.post("/api/schools", upload.single("image"), (req, res) => {
  const { name, address, city, state, contact, email_id } = req.body;
  const image = req.file ? `${req.file.filename}` : null;

  if (!name || !address || !city || !state || !contact || !email_id || !image) {
    return res
      .status(400)
      .json({ error: "All fields including an image are required." });
  }

  const sql =
    "INSERT INTO schools (name, address, city, state, contact, image, email_id) VALUES (?, ?, ?, ?, ?, ?, ?)";
  db.query(
    sql,
    [name, address, city, state, contact, image, email_id],
    (err, result) => {
      if (err) {
        console.error("Error adding school:", err);
        return res
          .status(500)
          .json({ error: "Failed to add school", details: err });
      }
      res
        .status(200)
        .json({ message: "School added successfully!", data: res.body });
    }
  );
});

// Get Schools API
app.get("/api/schools", (req, res) => {
  const sql = `
    SELECT 
      id, 
      name, 
      address, 
      city, 
      CONCAT('/schoolImages/', image) AS image 
    FROM schools
  `;
  db.query(sql, (err, result) => {
    if (err) {
      console.error("Error fetching schools:", err);
      return res
        .status(500)
        .json({ error: "Failed to fetch schools", details: err });
    }
    res.json(result);
  });
});
app.use("/schoolImages", express.static(path.join(__dirname, "schoolImages")));

app.get("/images/:imageId");

// Start Server
app.listen(5000, () => {
  console.log("Server started on port 5000");
});
