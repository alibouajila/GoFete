import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const User = () => {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    } else {
      try {
        const decodedToken = jwtDecode(token);
        if (decodedToken.role === "user") {
          setIsAuthorized(true);
          fetchEvents();
        } else {
          navigate("/organizer");
        }
      } catch (error) {
        console.error("Invalid token or decoding failed", error);
        navigate("/login");
      }
    }
  }, [navigate]);

  const fetchEvents = async () => {
    try {
      const response = await fetch("http://localhost:3001/event/all", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (!response.ok) throw new Error("Failed to fetch events");

      const data = await response.json();
      setEvents(data.events);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  if (!isAuthorized) return null;

  return (
    <div>
      <h1 className="title">All Events</h1>
      <ul>
        {events.map((event) => (
          <li key={event._id}>
            <button className="eventt" onClick={() => navigate(`/event/${event._id}`)}>
            {event.title}
            </button>
            <span>
    {new Date(event.date).toLocaleDateString()} &nbsp;|&nbsp; 
    {new Date(event.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} &nbsp;&nbsp; 
    at {event.location} &nbsp;&nbsp; 

  </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default User;
