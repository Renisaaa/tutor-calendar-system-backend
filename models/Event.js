const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  participants: { type: [String], required: false },
  date: { type: String, required: true },
  time: { type: String, required: true },
  duration: { type: Number, required: true },
  sessionNotes: { type: String },
  googleEventId: { type: String },
});

const Event = mongoose.model("Event", eventSchema);

module.exports = Event;
