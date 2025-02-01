const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const multer = require("multer");
const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");
const bodyParser = require('body-parser');

const app = express();
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

const db = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: 'Thalapathy@3720',
  database: 'Demo'
});

db.connect((err) => {
  if (err) throw err;
  console.log('Database connected!');
});

const transporter = nodemailer.createTransport(
  {
    secure: true,
    host: 'smtp.gmail.com',
    port: 465,//587 and false,465
    auth: {
      user: 'edvinlokesh@gmail.com',
      pass: 'lywu bmpx sptz wbup'
    }
  }
);

transporter.verify((error, success) => {
  if (error) {
    console.error("SMTP connection error:", error);
  } else {
    console.log("SMTP is working fine!");
  }
});

app.get('/food_menu', (req, res) => {
  query = ` SELECT * FROM food_menu`;
  db.query(query, (err, results) => {
    res.json(results);
  });
});

app.get('/address', (req, res) => {
  query = ` SELECT * FROM address`;
  db.query(query, (err, results) => {
    res.json(results);
  });
});

app.delete('/food_menu/:id', (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM food_menu WHERE id = ?';
  db.query(query, [id], (err, results) => {
    res.send({ success: true, message: `Item deleted successfully!` });
  });
});

app.post("/food_menu", upload.single("image"), (req, res) => {
  const { category, productName, type, productTitle, price } = req.body;
  const image = req.file.buffer;

  const query = `
        INSERT INTO food_menu (meal_type, name, category, title, price, image)
        VALUES (?, ?, ?, ?, ?, ?)
    `;
  db.query(query, [category, productName, type, productTitle, price, image], (err, result) => {
    if (err) {
      console.error('Error uploading image:', err);
      return res.status(500).send('Failed to upload image');
    }
    res.send('Product Uploded successfully!')
  });
});

app.get('/food_menu/:id', (req, res) => {
  const sql = `SELECT image FROM food_menu WHERE id = ?`;
  db.query(sql, [req.params.id], (err, result) => {
    if (err || result.length === 0) {
      res.status(404).send('Image not found');
    } else {
      res.setHeader('Content-Type', 'image/jpeg');
      res.send(result[0].image);
    }
  });
});

app.use(upload.none());
app.post("/address", (req, res) => {
  const { fname, lname, email, street, city, state, zipcode, contry, pnumber } = req.body;
  const query = `
        INSERT INTO address (fname, lname, email, street, city, state, zipcode, contry, pnumber)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
  db.query(query, [fname, lname, email, street, city, state, zipcode, contry, pnumber], (err, result) => {
    if (err) {
      console.error('Error uploading address:', err);
      return res.status(500).send('Failed to upload address');
    }
    res.json({ success: true });
  });
});

app.get('/cart', (req, res) => {
  const sql = 'SELECT * FROM cart';
  db.query(sql, (err, results) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.json(results);
  });
});

app.post('/cart', (req, res) => {
  const { itemId, name, price, quantity } = req.body;
  const getImageQuery = `SELECT image FROM food_menu WHERE id = ?`;
  db.query(getImageQuery, [itemId], (err, result) => {
    if (err || result.length === 0) {
      return res.status(404).send('Product not found or image missing');
    }
    const image = result[0].image;
    const sql = `
        INSERT INTO cart (itemId, name, price, quantity, total, image)
        VALUES (?, ?, ?, ?, ?, ?)
        ON DUPLICATE KEY UPDATE 
            quantity = quantity + VALUES(quantity),
            total = price * quantity
    `;
    db.query(sql, [itemId, name, price, quantity, price * quantity, image], (err) => {
      if (err) {
        return res.status(500).send(err);
      }
      res.json({ success: true });
    });
  });
});

app.delete('/cart/:itemId', (req, res) => {
  const { itemId } = req.params;
  const sql = 'DELETE FROM cart WHERE itemId = ?';
  db.query(sql, [itemId], (err) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.json({ success: true });
  });
});

app.get('/cart/:id', (req, res) => {
  const sql = `SELECT image FROM cart WHERE id = ?`;
  db.query(sql, [req.params.id], (err, result) => {
    if (err || result.length === 0) {
      res.status(404).send('Image not found');
    } else {
      res.setHeader('Content-Type', 'image/jpeg');
      res.send(result[0].image);
    }
  });
});

app.post('/order', (req, res) => {
  const { itemsp, finalprice, totalQuantity } = req.body;
  db.query(
    'INSERT INTO orders (items, total_price, total_quantity, status) VALUES (?, ?, ?, ?)',
    [itemsp, finalprice, totalQuantity, 'food processing'],
    (err, result) => {
      if (err) throw err;
      db.query('DELETE FROM cart', (clearErr) => {
        if (clearErr) throw clearErr;
        res.json({ success: true });
      });
    }
  );
});

app.get('/orders', (req, res) => {
  db.query('SELECT * FROM orders', (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

app.put('/orders/:orderId', async (req, res) => {
  const { orderId } = req.params;
  const { status } = req.body;
  const sql = 'UPDATE orders SET status = ? WHERE id = ?';
  db.query(sql, [status, orderId], (err) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.json({ success: true });
  });
});

app.post('/signup', (req, res) => {
  const { name, pass, uemail } = req.body;

  const sql1 = "SELECT * FROM users WHERE username = ?";
  db.query(sql1, [name], (err, results) => {
    if (err) return res.status(500).json({ message: "Database error." });

    if (results.length > 0) { res.json("user already exist!");}

    else {
      bcrypt.hash(pass, 10, (err, hashedPassword) => {
        if (err) return res.status(500).json({ message: "Error hashing password." });

        const sql = "INSERT INTO users (username, password, email) VALUES (?, ?, ?)";
        db.query(sql, [name, hashedPassword, uemail], (err) => {
          if (err) return res.status(500).json({ message: "Database error." });
          res.json({ success: true });
        });
      });
    }
  });
});

app.post("/login", (req, res) => {
  const { username, password } = req.body;

  const sql = "SELECT * FROM users WHERE username = ?";
  db.query(sql, [username], (err, results) => {
    if (err) return res.status(500).json({ message: "Database error." });

    if (results.length > 0) {
      bcrypt.compare(password, results[0].password, (err, isMatch) => {
        if (err) return res.status(500).json({ message: "Error comparing passwords." });

        isMatch
          ? res.json("Login successful!")
          : res.json("Invalid password.");
      });
    } else {
      res.json("User not found");
    }
  });
});

app.post("/forgot-password", (req, res) => {
  const { username } = req.body;
  const otp = Math.floor(100000 + Math.random() * 900000);
  const sql = "SELECT * FROM users WHERE username = ?";
  db.query(sql, [username], (err, results) => {
    if (err) return res.status(500).json({ message: "Server error", error: err });

    if (results.length > 0) {
      const user = results[0];

      const updateSql = "UPDATE users SET otp = ?, otp_timestamp = NOW() WHERE username = ?";
      db.query(updateSql, [otp, username], (err, result) => {
        if (err) return res.status(500).json({ message: "Error updating OTP", error: err });

        const mailOptions = {
          from: "edvinlokesh@gmail.com",
          to: user.email,
          subject: "Your OTP for Password Reset",
          text: `Your OTP is: ${otp}`
        };

        transporter.sendMail(mailOptions, (err, info) => {
          if (err) {
            console.error(err);
            return res.status(500).json({ message: "Error sending OTP email", error: err });
          }
          res.json(username);
        });
      });
    } else {
      res.json("User not found!");
    }
  });
});

app.post("/verify-otp", (req, res) => {
  const { username, otp } = req.body;
  const sql = "SELECT * FROM users WHERE username = ?";
  db.query(sql, [username], (err, results) => {
    if (err) throw err;
    const user = results[0];
    if (user.otp === otp && new Date() - new Date(user.otp_timestamp) < 300000) {
      if (err) throw err;
      const updateSql = "UPDATE users SET otp = NULL WHERE username = ?";
      db.query(updateSql, [username], (err, result) => {
        if (err) throw err;
        res.json("sucess");
      });
    }
    else {
      res.json("Invalid OTP or OTP expired.");
    }

  });
});

app.post("/reset-password", (req, res) => {
  const { username, newPassword, confirmPassword } = req.body;

  const sql = "SELECT * FROM users WHERE username = ?";
  db.query(sql, [username], (err, results) => {
    if (err) return res.status(500).json({ message: "Database error." });

    if (results.length > 0) {
      bcrypt.hash(newPassword, 10, (err, hashedPassword) => {
        if (err) return res.status(500).json({ message: "Error hashing password." });

        const updateSql = "UPDATE users SET password = ? WHERE username = ?";
        db.query(updateSql, [hashedPassword, username], (err) => {
          if (err) return res.status(500).json("Error updating password.");
          res.json("successfully");
        });
      });
    } else {
      res.json("User not found.");
    }
  });
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
