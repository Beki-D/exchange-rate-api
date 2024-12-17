const express = require("express");
const axios = require("axios");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(cors());

// Simple GET route to test the server is running
app.get("/", (req, res) => {
  res.send(
    "Server is running. Use POST /get-exchange-rates to fetch exchange rates."
  );
});

app.post("/get-exchange-rates", async (req, res) => {
  try {
    const response = await axios.get(
      "https://v6.exchangerate-api.com/v6/1bc1070da910cea0f4b2f58b/latest/USD"
    );
    const rates = response.data.conversion_rates;

    const selectedRates = [
      { currency: "USD", rate: rates.ETB },
      { currency: "CNY", rate: rates.ETB / rates.CNY },
      { currency: "GBP", rate: rates.ETB / rates.GBP },
      { currency: "EUR", rate: rates.ETB / rates.EUR },
      { currency: "AED", rate: rates.ETB / rates.AED },
      { currency: "KWD", rate: rates.ETB / rates.KWD },
      { currency: "CAD", rate: rates.ETB / rates.CAD },
      { currency: "SAR", rate: rates.ETB / rates.SAR },
      { currency: "JPY", rate: rates.ETB / rates.JPY },
      { currency: "CHF", rate: rates.ETB / rates.CHF },
    ];

    res.json({
      base: response.data.base_code,
      rates: selectedRates,
    });
  } catch (error) {
    console.error("Error fetching exchange rates:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = app;
