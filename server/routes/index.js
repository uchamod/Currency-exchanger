const express = require("express");
const axios = require("axios");
const exchangeRouter = express.Router();

// require("dotenv").config();

//get currency names
exchangeRouter.get("/names", async (request, response) => {
  const getUri = `https://openexchangerates.org/api/currencies.json?app_id=67727b901b0f42f2b949e19f882d1f6c`;
  try {
    const names = await axios.get(getUri);
    return response.json(names.data);
  } catch (err) {
    console.log(err);
    response.status(500).json({ error: "An error occurred" });
  }
});

//get target amount
exchangeRouter.get("/amount", async (request, response) => {
  const { date, sourceCurrency, targetCurrency, sourceAmount } = request.query;
  const getUri = `https://openexchangerates.org/api/historical/${date}.json?app_id=67727b901b0f42f2b949e19f882d1f6c`;
  try {
    const exchangeRates = await axios.get(getUri);
    const allData = exchangeRates.data;
    if (!allData || exchangeRates.status != 200) {
      throw new Error("Unable to fetch exchange rates");
    }
    //get the rates
    const ratings = allData.rates;
    const targetRate = ratings[targetCurrency];
    const sourceRate = ratings[sourceCurrency];
    //calculate the amount
    const targetAmount = (targetRate / sourceRate) * sourceAmount;

    return response.json(targetAmount);
  } catch (err) {
    console.log(err);
    response.status(500).json({ error: "An error occurred" });
  }
});
module.exports = exchangeRouter;
