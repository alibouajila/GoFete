import express from "express";
import authMiddleware from "../Middleware/authMiddleware.js";
import Event from "../models/event.js";

const router = express.Router();

// Only for organizers
router.post("/add", authMiddleware, async (req, res) => {
  try {
    const { title, description, date, location, time } = req.body;
    const organizer = req.user.userId; // Extract organizer ID from token
    const role = req.user.role; // Extract user ID and role
    if (role !== "organizer") {
      return res.status(403).json({ message: "Unauthorized: Only organizers can create events" });
    }
    if (!title || !description || !date || !location ||!time) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Create new event
    const event = new Event({
      title,
      description,
      date,
      location,
      organizer,
      time,
    });


    await event.save();

    res.status(201).json({ message: "Event added successfully", event });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.userId;
    const role = req.user.role;
    if (role !== "organizer") {
      return res.status(403).json({ message: "Unauthorized: Only organizers can delete events" });
    }
    // Find the event
    const event = await Event.findById(id);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    // Check if the logged-in user is the organizer
    if (event.organizer.toString() !== userId) {
      return res.status(403).json({ message: 'Unauthorized: Only the organizer can delete this event' });
    }

    // Delete the event
    await Event.findByIdAndDelete(id);
    res.status(200).json({ message: 'Event deleted successfully' });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});
// For users 
router.get("/all",authMiddleware, async (req, res) => {
  try {

    // Find all events 
    const events = await Event.find();

    res.status(200).json({ events });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});
router.get("/:id", authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const event = await Event.findById(id);

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    res.status(200).json(event);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});
export default router;
