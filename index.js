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
  app.use(express.static("dist"));
};

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

const startServer = () => {
  const { PORT } = process.env;
  app.listen(PORT || 5050, () => {
    console.log(`Server running at http://localhost:${PORT}`);
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
