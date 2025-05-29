// Express.js Route Example (Node.js Backend)
const express = require("express");
const router = express.Router();
const Doctor = require("../models/Doctor");

router.get("/search", async (req, res) => {
  const { query } = req.query;
  if (!query) return res.status(400).json({ message: "Query required" });

  try {
    const results = await Doctor.find({
      $or: [
        { firstName: new RegExp(query, "i") },
        { lastName: new RegExp(query, "i") },
        { specialization: new RegExp(query, "i") },
        { city: new RegExp(query, "i") },
      ],
    }).limit(10);

    res.status(200).json(results);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
