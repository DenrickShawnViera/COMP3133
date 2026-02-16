const express = require("express");
const User = require("../models/User");

const router = express.Router();

// POST http://localhost:8081/users
router.post("/", async (req, res) => {
  try {
    const created = await User.create(req.body);
    return res.status(201).json(created);
  } catch (err) {
    // Handle mongoose validation nicely
    if (err.name === "ValidationError") {
      const errors = Object.values(err.errors).map((e) => e.message);
      return res.status(400).json({ message: "Validation error", errors });
    }

    // Handle duplicate email (unique)
    if (err.code === 11000) {
      return res.status(400).json({
        message: "Validation error",
        errors: ["Email must be unique."],
      });
    }

    return res.status(500).json({ message: "Server error", error: err.message });
  }
});

module.exports = router;
