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

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
