const express = require("express");
const cors = require("cors");
const axios = require("axios");
const path = require("path");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.get("/", (req, res) => {
  res.send("Sweet Home 1!");
});

app.get("/data", async (req, res) => {
  try {
    const imageUrl = "https://i.ibb.co/b6prY8f/Rectangle-2-4.png";
    const response = await axios.get(imageUrl, { responseType: "arraybuffer" });
    res.setHeader("Content-Type", "image/png");
    res.send(Buffer.from(response.data, "binary"));
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/image", (req, res) => {
  const svgContent = `
  <svg xmlns="http://www.w3.org/2000/svg" width="114.2" height="20">
    <linearGradient id="b" x2="0" y2="100%">
        <stop offset="0" stop-color="#bbb" stop-opacity=".1"/>
        <stop offset="1" stop-opacity=".1"/>
    </linearGradient>
    <mask id="a">
        <rect width="114.2" height="20" rx="3" fill="#fff"/>
    </mask>
    <g mask="url(#a)">
        <rect width="81.2" height="20" fill="#555"/>
        <rect x="81.2" width="33" height="20" fill="#0e75b6"/>
        <rect width="114.2" height="20" fill="url(#b)"/>
    </g>
    <g fill="#fff" text-anchor="middle" font-family="DejaVu Sans,Verdana,Geneva,sans-serif" font-size="11">
        <text x="41.6" y="15" fill="#010101" fill-opacity=".3">Unique viewer</text>
        <text x="41.6" y="14">Unique viewer</text>
        <text x="96.7" y="15" fill="#010101" fill-opacity=".3">642</text>
        <text x="96.7" y="14">642</text>
    </g>
  </svg>
  `;

  // Set the proper Content-Type header
  res.setHeader("Content-Type", "image/svg+xml");

  // Send the SVG content directly
  res.send(svgContent);
});

app.listen(port, () => {
  console.log(`http://localhost:${port}/`);
});
