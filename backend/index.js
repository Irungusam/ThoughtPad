import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import notesRoutes from "./routes/notes.routes.js";
import { connectDB } from "./config/db.config.js";

import rateLimiter from "./middleware/rateLimiter.middleware.js";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000;

//middleware
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);
app.use(express.json());
app.use(rateLimiter);

app.use("/api/notes", notesRoutes);

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on PORT: ${PORT}`);
  });
});
