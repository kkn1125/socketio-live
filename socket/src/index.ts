import http from "http";
import express from "express";
import { Server } from "socket.io";

const server = http.createServer();
const io = new Server(server, {
  path: "/",
});

io.on("connection", (client) => {
  client.on("test", (data) => {
    /* … */
    console.log(data.call());
  });
  client.on("disconnect", () => {
    /* … */
  });
});

io.on("test", (data) => {
  console.log(data);
});

server.listen(4000, () => {
  console.log("listening on port", 4000);
});
