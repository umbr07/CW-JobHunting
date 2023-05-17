const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { PrismaClient } = require("@prisma/client");
const router = require("./router/index");
var bodyParser = require("body-parser");
const errorMiddleware = require("./middlewares/error-middleware");
const https = require("https"); //
const fs = require("fs"); //
const WebSocket = require("ws");

const prisma = new PrismaClient();
const server = express();

const corsOptions = {
  origin: "https://localhost:3000", //
};

server.use(express.json());
server.use(cookieParser());
server.use(cors(corsOptions));
server.use("/api", router);
server.use(bodyParser.urlencoded({ extended: false }));
server.use(bodyParser.json());
server.use(errorMiddleware);

const sslOptions = {
  key: fs.readFileSync("localhost.decrypted.key"), // Укажите путь к вашему приватному ключу
  cert: fs.readFileSync("localhost.crt"), // Укажите путь к вашему SSL-сертификату
};

const wss = new WebSocket.Server({ port: 5001 });

const start = async () => {
  try {
    https.createServer(sslOptions, server).listen(5000, () => {
      console.log("Server running at https://localhost:5000");

      wss.on("connection", (ws) => {
        console.log("Новое подключение WebSocket");

        // Отправка времени каждую секунду
        const interval = setInterval(() => {
          ws.send(new Date().toLocaleTimeString());
        }, 1000);

        // Обработка закрытия соединения WebSocket
        ws.on("close", () => {
          console.log("WebSocket соединение закрыто");
          clearInterval(interval);
        });
      });
    });
  } catch (e) {
    console.log(e);
  }
};

start();
