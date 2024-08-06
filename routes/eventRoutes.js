// src/routes/eventRoutes.js
const express = require("express");
const {
  getEvents,
  createEvent,
  deleteEvent,
  updateEvent,
} = require("../controllers/eventController");
const router = express.Router();

router.get("/events", getEvents);
router.post("/events", createEvent);
router.delete("/:id", deleteEvent);
router.put("/:id", updateEvent);

module.exports = router;
