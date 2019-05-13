const express = require("express");

const router = express.Router();

const db = require("../data/db.js");

router.get("/", (req, res) => {
  db.find()
    .then(response => {
      res.status(200).json({ data: response });
    })
    .catch(err => {
      console.log(err);
      res
        .status(500)
        .json({ error: "The information could not be retrieved." });
    });
});

router.get("/:id", (req, res) => {
  const id = req.params.id;
  db.findById(id)
    .then(response => {
      if (!response.length) {
        res
          .status(404)
          .json({ error: "The post with the specified ID does not exist." });
      }
      res.status(200).json({ data: response });
    })
    .catch(err => {
      console.log(err);
      res
        .status(500)
        .json({ error: "The post information could not be retrieved." });
    });
});

router.delete("/:id", (req, res) => {
  const id = req.params.id;
  db.remove(id)
    .then(response => {
      if (!response) {
        res
          .status(404)
          .json({ error: "The post with the specified ID does not exist. " });
      }
      res.status(204).json({ data: response });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: "The post could not be removed" });
    });
});

router.put("/:id", (req, res) => {
  const id = req.params.id;
  const { title, contents } = req.body;

  db.update(id, { title, contents })
    .then(response => {
      if (!response) {
        res
          .status(404)
          .json({ error: "The post with the specified ID does not exist." });
      } else if (title === undefined || contents === undefined) {
        res
          .status(400)
          .json({ error: "Please provide title and contents for the post." });
      } else {
        res.status(201).json({ data: response });
      }
    })
    .catch(err => {
      console.log(err);
      res
        .status(500)
        .json({ error: "The post information could not be modified." });
    });
});

router.post("/", (req, res) => {
  const { title, contents } = req.body;

  db.insert({ title, contents })
    .then(response => {
      console.log(response);
      if (!title || !contents) {
        res
          .status(400)
          .json({ error: "Please provide title and contents for the post." });
        return;
      } else {
        res.status(201).json({ data: response });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: "There was an error while saving the post to the database"
      });
    });
});

module.exports = router;
