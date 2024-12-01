const express = require("express");
const cors = require("cors");
const axios = require("axios");
// require("dotenv").config();
//routes
const exchanges = require("./routes/index");
const app = express();

//middleware

app.use(express.json());
app.use(cors());

//source
app.use("/exchanges/", exchanges);

app.listen(5000, () => {
  console.log("server start at port 5000");
});
