const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const multer = require("multer");
const bcrypt = require("bcryptjs");
const bodyParser = require('body-parser');

const app = express();
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(bodyParser.urlencoded({ extended: true }));
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

app.post("/food_menu",upload.single("image"), (req, res) => {
    const { category, productName, type, productTitle,  price } = req.body;
    const image = req.file.buffer;

    const query = `
        INSERT INTO food_menu (meal_type, name, category, title, price, image)
        VALUES (?, ?, ?, ?, ?, ?)
    `;
    db.query(query, [ category, productName, type, productTitle, price, image], (err, result) => {
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
    const { name, pass, email } = req.body;
    if (!name || !pass || !email) return res.status(400).json({ message: "All fields are required." });

    bcrypt.hash(pass, 10, (err, hashedPassword) => {
        if (err) return res.status(500).json({ message: "Error hashing password." });
    
        const sql = "INSERT INTO users (username, password, email) VALUES (?, ?, ?)";
        db.query(sql, [name, hashedPassword, email], (err) => {
          if (err) return res.status(500).json({ message: "Database error." });
          res.json({ message: "User registered successfully!" });
        });
      });
});

app.post("/login", (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) return res.status(400).json({ message: "All fields are required." });
  
    const sql = "SELECT * FROM users WHERE username = ?";
    db.query(sql, [username], (err, results) => {
      if (err) return res.status(500).json({ message: "Database error." });
  
      if (results.length > 0) {
        bcrypt.compare(password, results[0].password, (err, isMatch) => {
          if (err) return res.status(500).json({ message: "Error comparing passwords." });
  
          isMatch
            ? res.json({ message: "Login successful!" })
            : res.status(400).json({ message: "Invalid credentials." });
        });
      } else {
        res.status(400).json({ message: "User not found." });
      }
    });
  });

  app.post("/forgot_password", (req, res) => {
    const { usname, newPassword, confirmPassword } = req.body;
    if (!usname || !newPassword || !confirmPassword) {
      return res.status(400).json({ message: "All fields are required." });
    }
  
    if (newPassword !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match." });
    }
  
    const sql = "SELECT * FROM users WHERE username = ?";
    db.query(sql, [usname], (err, results) => {
      if (err) return res.status(500).json({ message: "Database error." });
  
      if (results.length > 0) {
         bcrypt.hash(newPassword, 10, (err, hashedPassword) => {
            if (err) return res.status(500).json({ message: "Error hashing password." });
  
            const updateSql = "UPDATE users SET password = ? WHERE username = ?";
            db.query(updateSql, [hashedPassword, usname], (err) => {
              if (err) return res.status(500).json({ message: "Error updating password." });
              res.json({ message: "Password reset successfully!" });
            });
          });
      } else {
        res.status(400).json({ message: "User not found." });
      }
    });
  });
const port = 3000;
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
