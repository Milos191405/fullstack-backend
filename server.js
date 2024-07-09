import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import userRoutes from "./routes/userRoutes.js";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(express.json({ limit: "50mb", extended: true }));
app.use(cors());
dotenv.config();

app.use("/", userRoutes); //here we write route callback function

mongoose
  .connect(process.env.CONNECTION_URL)
  .then(() => {
    app.listen(PORT, () => {
      console.log("Database connected and server running on port: ", PORT);
    });
  })
  .catch((error) => console.log(error));
