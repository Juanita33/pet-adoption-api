const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const swaggerUi = require("swagger-ui-express");

const adoptionRouter = require("./routes/adoption.router");
const swaggerSpec = require("./config/swagger");
const notFoundHandler = require("./middlewares/notFoundHandler");
const errorHandler = require("./middlewares/errorHandler");
const userRouter = require("./routes/user.router");

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.status(200).json({
    status: "success",
    message: "Pet Adoption API is running"
  });
});

app.use("/api/adoptions", adoptionRouter);
app.use("/api/users", userRouter);
app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(notFoundHandler);
app.use(errorHandler);

module.exports = app;