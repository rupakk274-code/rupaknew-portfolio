const mysql = require('mysql2/promise');

// Create a connection pool to the MySQL database
// REPLACE 'YOUR_PASSWORD' with your actual local MySQL root password
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '12345678',
    database: 'portfolio_db',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

module.exports = pool;
