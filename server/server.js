import express from 'express';
import mongoose from 'mongoose';
import userRoute from './routes/userRoutes.js';
import evenRoutes from "./routes/eventRoutes.js"
import cors from'cors'
import "./jobs/eventCleanup.js";
// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/GoFete", {
})
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.error("Error connecting to MongoDB:", error));
const app = express();    
// Middleware
app.use(express.json());
app.use(cors())
app.use(express.urlencoded({ extended: true }));

// Use the user route, prefixing all routes with '/user'
app.use('/user', userRoute);
app.use('/event',evenRoutes)
app.get('/',(req,res)=>{
res.send("Home ")
})
// Start the server
app.listen(3001, () => console.log("Server is running on port 3001"));
