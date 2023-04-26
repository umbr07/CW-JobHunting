const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { PrismaClient } = require("@prisma/client");
const router = require("./router/index");
var bodyParser = require("body-parser");
const errorMiddleware = require("./middlewares/error-middleware");

const prisma = new PrismaClient();
const server = express();

const corsOptions = {
  origin: "http://localhost:3000",
  credentials: "true",
};

server.use(express.json());
server.use(cookieParser());
server.use(cors(corsOptions));
server.use("/api", router);
server.use(bodyParser.urlencoded({ extended: false }));
server.use(bodyParser.json());
server.use(errorMiddleware);

const start = async () => {
  try {
    server.listen(5000, () => {
      console.log("Server running at localhost:5000");
    });
  } catch (e) {
    console.log(e);
  }
};

start();
