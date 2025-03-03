import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import About from "./pages/About";
import User from "./pages/User";
import Organizer from "./pages/Organizer";
import EventDetails from "./pages/EventDetails";
function App() {
  return (
<Router>
      <Navbar />
      <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/Organizer" element={<Organizer />} />
      <Route path="/user" element={<User />} />
      <Route path="/event/:id" element={<EventDetails />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<h1>404 - Page Not Found</h1>} />
      </Routes>
    </Router>
  );
}

export default App;
