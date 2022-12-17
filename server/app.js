const express = require("express");
const app = express();
const path = require("path");
const axios = require("axios");

app.use(express.json({ limit: "50mb" }));

app.use("/dist", express.static(path.join(__dirname, "../dist")));
app.use("/static", express.static(path.join(__dirname, "../static")));

app.get("/", (req, res) =>
  res.sendFile(path.join(__dirname, "../static/index.html"))
);

const fetchURL =
  "https://safebrowsing.googleapis.com/v4/threatMatches:find?key=AIzaSyAUvj7mI0nFY3x1Tq4lWV-uWJ3A3BQTUcI";

app.post("/isThisSafe", async (req, res, next) => {
  try {
    const userURL = req.body.userURL;

    const body = {
      client: {
        clientId: "testing",
        clientVersion: "0.0.1",
      },
      threatInfo: {
        threatTypes: [
          "MALWARE",
          "SOCIAL_ENGINEERING",
          "UNWANTED_SOFTWARE",
          "MALICIOUS_BINARY",
        ],
        platformTypes: ["ANY_PLATFORM"],
        threatEntryTypes: ["URL"],
        threatEntries: [{ url: userURL }],
      },
    };

    const { data } = await axios.post(fetchURL, body, {
      headers: { "Content-Type": "application/json" },
    });
    res.send(data);
  } catch (error) {
    next(error);
  }
});

module.exports = app;
