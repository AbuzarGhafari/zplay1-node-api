import express from "express";
import axios from "axios";
import cors from "cors";
import dotenv from "dotenv";
import puppeteer from "puppeteer";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const BASE_URL = "https://zplay1.in/sports/api/v1";

app.use(cors());


const scrapeData = async () => {
  const browser = await puppeteer.launch({ headless: "new" });
  const page = await browser.newPage();
  
  await page.setUserAgent(
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36"
  );

  await page.goto("https://zplay1.in/sports/api/v1/events/matches/inplay", {
    waitUntil: "networkidle2",
  });

  const data = await page.content();
  console.log(data);

  await browser.close();
};

const fetchInPlayMatches = async () => {
  try {
    const response = await axios.get("https://zplay1.in/sports/api/v1/events/matches/inplay", {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36",
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
        "Referer": "https://zplay1.in/",
        "Origin": "https://zplay1.in/",
      }
    });
    console.log(response.data);
    return response;
  } catch (error) {
    console.error("Error:", error.response?.data || error.message);
  }
};

app.get("/api/scrape", async (req, res) => {
  try {
    const response = await scrapeData();
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch scrape data" });
  }
});


app.get("/api/play-matches", async (req, res) => {
  try {
    const response = await fetchInPlayMatches();
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch play-matches" });
  }
});

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
