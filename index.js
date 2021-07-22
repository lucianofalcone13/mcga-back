const express = require("express");
const api = require("./routes/api");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const { urlencoded, json } = require("body-parser");
const path = require("path");

require("dotenv").config();

const applyMiddlewares = () => {
  app.use(urlencoded({ extended: false }));
  app.use(cors());
  app.use(json());
  app.use("/api", api);
  app.use(express.static(path.join(__dirname, "dist")));
};

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

const startServer = () => {
  const { SERVER_PORT } = process.env;
  app.listen(SERVER_PORT, () => {
    console.log(`Server running at http://localhost:${SERVER_PORT}`);
  });
};

const connectToDb = () => {
  const { DB_URL } = process.env;
  mongoose
    .connect(DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
      console.log("DB successfully connected");
    })
    .catch((err) =>
      console.log("Error trying to connect to mongodb: " + err.message)
    );
};

try {
  startServer();
  applyMiddlewares();
  connectToDb();
} catch (error) {
  console.log(error.message);
}
