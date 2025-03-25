import express from "express";
import axios from "axios";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const BASE_URL = "https://zplay1.in/sports/api/v1";

app.use(cors());



// 1. Get Sport List

app.get("/api/test", async (req, res) => {
  try {
    // Step 1: Register the domain by calling site-status-version API
    const resigter = await axios.get(`https://zplay1.in/api/site-status-version?domain=http://141.136.42.134/`);

    console.log(resigter);
    
    // Step 2: Call the actual sports API
    const response = await axios.get(`${BASE_URL}/sports/management/getSport`);

    // Step 3: Send JSON response to the client
    res.json(response.data);
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ error: "Failed to fetch sports data" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
