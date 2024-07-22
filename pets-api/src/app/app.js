const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

// Routes
const petsController = require("../controllers/pets.controller");
const { initDB } = require("../db/db.init");

const urlApiV1_Pets = "/api/v1/pets";
const corsOptions = {
  origin: "*",
  credentials: true,
};

const app = express();
//  Middlewares
app.use(express.json());
app.use(cors(corsOptions));
app.use(morgan("dev"));

initDB(true); // Initialize the database and necesaries tables. (true parameter) -> create pets table

app.set("API_PORT", process.env.PORT || 3001);

app.get("/", (req, res) => {
  const port = app.get("API_PORT");
  res.send(
    `Pets API url is ready in <a href="http://localhost:${port}/api/v1/pets">Rest API</a`
  );
});

// Pets url routers
app.use(urlApiV1_Pets, petsController);

module.exports = app;
