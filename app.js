const express = require('express');
const app = express();

app.use(express.json());

let tasks = [];

const user = {
    username: "admin",
    password: "admin123"
};

app.get('/health', (req, res) => {
    res.status(200).json({ status: 'UP' });
});

app.post('/login', (req, res) => {

    const { username, password } = req.body;

    if (
        username === user.username &&
        password === user.password
    ) {
        return res.status(200).json({
            message: "Login successful"
        });
    }

    return res.status(401).json({
        message: "Invalid credentials"
    });
});

app.get('/tasks', (req, res) => {
    res.json(tasks);
});

app.post('/tasks', (req, res) => {
    tasks.push(req.body);
    res.status(201).json(req.body);
});

module.exports = app;