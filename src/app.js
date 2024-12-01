const express = require("express");
const cors = require("cors");
const path = require("path");
const config = require("./config");
const router = require("./routes");
const errorMiddleware = require("./middlewares/error.middleware");
require("./config/database");

const app = express();
app.use(cors());
app.use(express.json());

const publicPath = path.join(__dirname, "../public");
app.use(express.static(publicPath));

app.use("/api", router);

app.use(errorMiddleware);

app.listen(config.port, () => {
  console.log(`Application is running on http://localhost:${config.port}`);
});
