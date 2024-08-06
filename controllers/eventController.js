const Event = require("../models/Event");
const User = require("../models/User");

const getEvents = async (req, res) => {
  try {
    // Assuming req.userId is set by an authentication middleware
    const userId = req.query.userId;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    // Find events only for the authenticated user
    const events = await Event.find({ user: userId });

    console.log(events);

    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create Event
const createEvent = async (req, res) => {
  const {
    user,
    title,
    description,
    participants,
    date,
    time,
    duration,
    sessionNotes,
  } = req.body;

  if (!title || !description || !participants || !date || !time || !duration) {
    return res.status(400).json({ message: "Please fill all required fields" });
  }

  const currentUser = await User.findById(user._id);

  console.log(currentUser);

  const newEvent = new Event({
    user: currentUser,
    title,
    description,
    participants,
    date,
    time,
    duration,
    sessionNotes,
  });
  //* add to the database
  try {
    // const event = await Event.create({
    //   ...req.body,
    // });
    const event = await newEvent.save();
    res.status(200).json({ result: event, status: "success" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
};

//* Update Event
const updateEvent = async (req, res) => {
  const { id } = req.params;
  const {
    title,
    description,
    participants,
    date,
    time,
    duration,
    sessionNotes,
  } = req.body;

  if (!title || !description || !participants || !date || !time || !duration) {
    return res.status(400).json({ message: "Please fill all required fields" });
  }

  try {
    const updatedEvent = await Event.findByIdAndUpdate(
      id,
      {
        title,
        description,
        participants,
        date,
        time,
        duration,
        sessionNotes,
      },
      { new: true }
    );

    if (!updatedEvent) {
      return res.status(404).json({ message: "Event not found" });
    }

    res.status(200).json({ result: updatedEvent, status: "success" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

//* Delete Event
const deleteEvent = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedEvent = await Event.findByIdAndDelete(id);
    if (!deletedEvent) {
      return res.status(404).json({ message: "Event not found" });
    }

    res.status(200).json({ result: deletedEvent, status: "success" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getEvents, createEvent, updateEvent, deleteEvent };
