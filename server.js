import express from "express";
import path from "path";
import axios from "axios";

const app = express();
const PORT = 3000; // Change port if needed


// Fix for __dirname not defined in CommonJS
const __dirname = path.resolve();


// Serve the index.html file
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});


app.get('/api/proxy', async (req, res) => {
    try {
        const response = await axios.get('https://zplay1.in/sports/api/v1/events/matches/inplay', {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
            }
        });
        res.json(response.data);
    } catch (error) {
        console.error('Error fetching API:', error.response ? error.response.data : error.message);
        res.status(500).json({ error: 'Failed to fetch API' });
    }
});


// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
