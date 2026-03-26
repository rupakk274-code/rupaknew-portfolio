const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const db = require('./db');

const app = express();
const PORT = 5001;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Main Contact Endpoint
app.post('/contact', async (req, res) => {
    const { name, email, message } = req.body;

    // Validation (White box testing: handle edge cases for input)
    if (!name || !email || !message) {
        return res.status(400).json({ error: 'All fields are required.' });
    }

    try {
        // Securely inserting using parameterized queries format protecting against SQL injection
        const query = 'INSERT INTO contacts (name, email, message) VALUES (?, ?, ?)';
        await db.execute(query, [name, email, message]);
        
        // Return success response to the frontend client
        res.status(200).json({ message: 'Message sent successfully!' });
    } catch (err) {
        console.error('Database insertion error:', err);
        res.status(500).json({ error: 'Failed to send message.' });
    }
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
