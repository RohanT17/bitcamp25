const express = require('express');
const cors = require('cors'); // Import the cors package

const app = express();

// Define the CORS options
const corsOptions = {
    credentials: true,
    origin: ['http://localhost:3000', 'http://localhost:80'], // Whitelist the domains you want to allow
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allow only specific methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Allow specific headers
};

app.use(cors(corsOptions)); // Use the cors middleware with your options

// Your route handlers and other middleware go here
app.get('/', (req, res) => {
    // res.send('Hello from the backend!');
});

app.listen(4040, () => {
    console.log('Server is running on http://localhost:4040');
});
