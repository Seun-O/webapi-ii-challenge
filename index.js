const express = require("express");
const server = express();
const port = 8000;

const cors = require("cors");

server.use(express.json());
server.use(cors());

const postRoutes = require("./Posts/postRoutes.js");

server.use("/api/posts/", postRoutes);

server.listen(port, () => {
  console.log(`Server Listening on Port:${port}`);
});
