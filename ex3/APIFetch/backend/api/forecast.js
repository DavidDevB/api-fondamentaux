const express = require("express");
const path = require("path");
const cors = require("cors");

require("dotenv").config({ path: path.resolve(__dirname, "../.env") });

const apiKey = process.env.API_KEY;
const app = express();
app.use(cors());
const PORT = process.env.PORT || 3000;

app.get("/weather", async (req, res) => {
  const { lat, lon } = req.query;

  if (!apiKey) {
    return res.status(500).json({ error: "Clé API manquante. Vérifie le fichier .env dans backend/.env" });
  }

  if (!lat || !lon) {
    return res.status(400).json({ error: "lat et lon sont requis" });
  }

  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}`,
    );

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json(data);
    }

    return res.json(data);
  } catch (error) {
    return res.status(500).json({
      error: "Erreur lors de l'appel à OpenWeatherMap",
      details: error.message,
    });
  }
});

app.listen(PORT, () => {
  console.log(`Serveur lancé sur http://localhost:${PORT}`);
});
