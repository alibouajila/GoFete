import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import './organizer.css'
const Organizer = () => {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [events, setEvents] = useState([]);
  const [newEvent, setNewEvent] = useState({
    title: "",
    description: "",
    date: "",
    location: "",
    time: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    try {
      const decodedToken = jwtDecode(token);
      if (decodedToken.role === "organizer") {
        setIsAuthorized(true);
        fetchEvents();
      } else {
        navigate("/user");
      }
    } catch (error) {
      console.error("Invalid token or decoding failed", error);
      navigate("/login");
    }
  }, [navigate]);

  const fetchEvents = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:3001/user//my-events", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      setEvents(data.events);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  const handleAddEvent = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:3001/event/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newEvent),
      });

      const data = await response.json();
      if (response.ok) {
        alert("Event added successfully!");
        setNewEvent({ title: "", description: "", date: "", location: "", time: "" });
        fetchEvents();
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Error adding event:", error);
    }
  };

  const handleDeleteEvent = async (id) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`http://localhost:3001/event/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await response.json();
      if (response.ok) {
        alert("Event deleted successfully!");
        fetchEvents();
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Error deleting event:", error);
    }
  };

  if (!isAuthorized) {
    return null;
  }

  return (
    <div>
      <h1>Organizer Dashboard</h1>

      <h2>Add Event</h2>
      <form onSubmit={handleAddEvent}>
        <input
          type="text"
          placeholder="Title"
          value={newEvent.title}
          onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
          required
        />
        <textarea
          placeholder="Description"
          value={newEvent.description}
          onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
          required
        />
        <input
          type="date"
          value={newEvent.date}
          onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Location"
          value={newEvent.location}
          onChange={(e) => setNewEvent({ ...newEvent, location: e.target.value })}
          required
        />
        <input
          type="time"
          value={newEvent.time}
          onChange={(e) => setNewEvent({ ...newEvent, time: e.target.value })}
          required
        />
        <button type="submit">Add Event</button>
      </form>

      <h2>Your Events</h2>
      <ul>
        {events.length > 0 ? (
          events.map((event) => (
            <li key={event._id}>
              <strong>{event.title}</strong> - {event.date} at {event.time} in {event.location}
              <button onClick={() => handleDeleteEvent(event._id)}>Delete</button>
            </li>
          ))
        ) : (
          <p>No events added yet.</p>
        )}
      </ul>
    </div>
  );
};

export default Organizer;
