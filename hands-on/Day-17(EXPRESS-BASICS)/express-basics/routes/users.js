const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
  res.json({
    message: "Users route working",
    users: [
      {
        id: 1,
        name: "Preeti",
      },
      {
        id: 2,
        name: "Demo User",
      },
    ],
  });
});

router.get("/:id", (req, res) => {
  const { id } = req.params;

  res.json({
    message: "User details",
    userId: id,
  });
});

module.exports = router;