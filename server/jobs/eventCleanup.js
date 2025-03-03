import cron from "node-cron";
import Event from "../models/event.js"; 

// Schedule task to run every day at midnight
cron.schedule("0 0 * * *", async () => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Normalize to YYYY-MM-DD (ignore time)

    // Delete events where the date is before today
    const result = await Event.deleteMany({
      date: { $lt: today } // Less than today
    });
  } catch (err) {
    console.error("Error deleting expired events:", err);
  }
});

export default cron;
