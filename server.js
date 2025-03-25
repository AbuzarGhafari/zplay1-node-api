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
app.get("/api/sports", async (req, res) => {
  try {
    const response = await axios.get(`${BASE_URL}/sports/management/getSport`);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch sports data" });
  }
});

// 2. Get In-Play Matches
app.get("/api/inplay", async (req, res) => {
  try {
    const response = await axios.get(`${BASE_URL}/events/matches/inplay`);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch in-play matches" });
  }
});

// 3. Get Market Details by Event ID
app.get("/api/matchDetails/:eventId", async (req, res) => {
  try {
    const { eventId } = req.params;
    const response = await axios.get(`${BASE_URL}/events/matchDetails/${eventId}`);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch match details" });
  }
});

// 4. Get Matches by Sport ID
app.get("/api/matches/:sportId", async (req, res) => {
  try {
    const { sportId } = req.params;
    const response = await axios.get(`${BASE_URL}/events/matches/${sportId}`);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch matches by sport ID" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
