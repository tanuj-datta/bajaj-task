const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// Root URL route
app.get('/', (req, res) => {
    res.send('Backend API is working');
});

app.post('/bfhl', (req, res) => {
    const { data } = req.body;
    const numbers = data.filter(item => !isNaN(item));
    const alphabets = data.filter(item => isNaN(item));
    const highestAlphabet = alphabets.sort().reverse()[0];

    res.json({
        is_success: true,
        user_id: "your_fullname_ddmmyyyy",
        email: "your_email@college.com",
        roll_number: "your_roll_number",
        numbers,
        alphabets,
        highest_alphabet: highestAlphabet ? [highestAlphabet] : []
    });
});

app.get('/bfhl', (req, res) => {
    res.json({ operation_code: 1 });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
