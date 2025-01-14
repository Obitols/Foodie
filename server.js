const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const multer = require("multer");
const bodyParser = require('body-parser');

const app = express();
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
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
            res.status(500).send('Failed to upload image');
        } else {
        }
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
const port = 3000;
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
