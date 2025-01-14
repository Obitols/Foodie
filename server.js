const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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
app.delete('/food_menu/:id', (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM food_menu WHERE id = ?';
    db.query(query, [id], (err, results) => {
            res.send({ success: true, message: `Item deleted successfully!` });
    });
});

app.post("/api/products",upload.single("image"), (req, res) => {
    const { productName, productTitle, category, type, price } = req.body;
    const imagePath = req.file ? req.file.path : null;

    if (!productName || !productTitle || !category || !type || !price || isNaN(price)) {
        return res.status(400).json({ message: "All fields are required and price must be a number." });
    }

    const query = `
        INSERT INTO products (name, title, category, type, price, imagePath)
        VALUES (?, ?, ?, ?, ?, ?)
    `;
    db.query(query, [productName, productTitle, category, type, price, imagePath], (err, result) => {
        if (err) {
            console.error("Error inserting product:", err);
            return res.status(500).json({ message: "Failed to add product." });
        }
        res.status(201).json({ message: "Product added successfully!", productId: result.insertId });
    });
});
const port = 3000;
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
