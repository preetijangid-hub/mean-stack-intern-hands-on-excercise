const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
  res.json({
    message: "Tasks route working",
    tasks: [
      {
        id: 1,
        title: "Learn Express",
        completed: false,
      },
      {
        id: 2,
        title: "Practice REST API",
        completed: false,
      },
    ],
  });
});

router.get("/:id", (req, res) => {
  const { id } = req.params;

  res.json({
    message: "Task details",
    taskId: id,
  });
});

module.exports = router;