const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());

app.get("/health", (req, res) => {
  res.status(200).json({ status: "healthy" });
});

app.get("/status", (req, res) => {
  res.status(200).json({
    uptime: process.uptime(),
    timestamp: new Date()
  });
});

app.post("/process", (req, res) => {
  res.status(200).json({
    message: "Processing completed",
    payload: req.body
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`App running on port ${PORT}`);
});
