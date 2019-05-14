const port = 8000;
const express = require("express");
const server = express();
const cors = require("cors");

//Builtin MiddleWare
server.use(express.json());

//Third Party MiddleWare
server.use(cors());

// Importing Post Router Express Router
const postRoutes = require("./Posts/postRoutes.js");

// Using Posts Router
server.use("/api/posts/", postRoutes);

server.use("/", (req, res) => {
  res.status(200).send("Hello from express");
});

server.listen(port, () => {
  console.log(`Server Listening on Port:${port}`);
});
