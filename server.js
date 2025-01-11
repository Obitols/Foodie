const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: 'Thalapathy@3720',
    database: 'Demo'
});

db.connect(err => {
    if (err) {
        console.error('DB Connection Error:', err);
    } else {
        console.log('Connected to MySQL!');
    }
});

app.get('/api/food_menu', (req, res) => {
    db.query('SELECT * FROM food_menu', (err, results) => {
            res.json(results);
    });
});

app.delete('/api/food_menu/:id', (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM food_menu WHERE id = ?';
    res.send({ success: true, message: `Item deleted successfully!` });
});

app.listen(3005, () => {
    console.log('Server running at http://localhost:3005');
});
