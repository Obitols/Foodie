const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const multer = require("multer");
// const bodyParser = require('body-parser');

const app = express();
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());

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
            res.send('item submitted successfully')
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
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    db.query(query, [fname, lname, email, street, city, state, zipcode, contry, pnumber], (err, result) => {
        if (err) {
            console.error('Error uploading address:', err);
            return res.status(500).send('Failed to upload address');
        }
        res.send('Address submitted successfully');
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
// 
// Add or update item in cart
app.post('/cart', (req, res) => {
    const { itemId, name, price, quantity,image } = req.body;
    const sql = `
        INSERT INTO cart (itemId, name, price, quantity, total, image)
        VALUES (?, ?, ?, ?, ?, ?)
        ON DUPLICATE KEY UPDATE 
            quantity = quantity + VALUES(quantity),
            total = price * (quantity + VALUES(quantity))
    `;
    db.query(sql, [itemId, name, price, quantity, price * quantity, image], (err) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.json({ success: true });
    });
});

// Remove item from cart
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

const port = 3000;
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
