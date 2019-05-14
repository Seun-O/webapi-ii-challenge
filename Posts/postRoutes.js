const express = require("express");

const router = express.Router();

const db = require("../data/db.js");

router.get("/", async (req, res) => {
  try {
    const data = await db.find();
    res.status(200).json({ data });
  } catch (err) {
    res
      .status(500)
      .json({ err, message: "The information could not be retrieved." });
  }
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const data = await db.findById(id);
    if (!data.length) {
      res
        .status(404)
        .json({ error: "The post with the specified ID does not exist." });
    }
    res.status(200).json({ data });
  } catch (err) {
    res
      .status(500)
      .json({ err, error: "The post information could not be retrieved." });
  }
});

router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const data = await db.remove(id);
    if (!data) {
      res
        .status(404)
        .json({ error: "The post with the specified ID does not exist. " });
    }
    res.status(204).json({ data });
  } catch (err) {
    res.status(500).json({ error: "The post could not be removed" });
  }
});

router.put("/:id", async (req, res) => {
  const id = req.params.id;
  const { title, contents } = req.body;

  try {
    const data = await db.update(id, { title, contents });
    if (!data) {
      res
        .status(404)
        .json({ error: "The post with the specified ID does not exist." });
    } else if (title === undefined || contents === undefined) {
      res
        .status(400)
        .json({ error: "Please provide title and contents for the post." });
    } else {
      res.status(201).json({ data });
    }
  } catch (err) {
    res
      .status(500)
      .json({ error: "The post information could not be modified." });
  }
});

router.post("/", async (req, res) => {
  const { title, contents } = req.body;

  try {
    const data = await db.insert({ title, contents });
    if (!title || !contents) {
      res
        .status(400)
        .json({ error: "Please provide title and contents for the post." });
      return;
    } else {
      res.status(201).json({ data });
    }
  } catch (err) {
    res.status(500).json({
      error: "There was an error while saving the post to the database"
    });
  }
});

module.exports = router;
