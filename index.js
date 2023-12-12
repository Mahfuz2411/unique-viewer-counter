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
    <svg xmlns="http://www.w3.org/2000/svg" height="100" width="100" style="margin: 0; padding: 0;">
      <text>
        <tspan x="0" y="20">Hello</tspan>
      </text>
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
