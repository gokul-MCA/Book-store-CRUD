import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import booksRoute from './routes/booksRoute.js';
import dotenv from 'dotenv';

dotenv.config();

// Check if critical environment variables are present
if (!process.env.mongoDBURL || !process.env.PORT) {
  console.error('Missing required environment variables: mongoDBURL or PORT');
  process.exit(1); // Exit if crucial environment variables are missing
}


const app = express();

// Middleware for parsing request body
app.use(express.json());

// Middleware for handling CORS policy
// Option 1: Allow All Origins with Default of cors(*)
// app.use(cors())
// Option 2: Allow Custom Origins
app.use(
  cors({
    origin: ['http://localhost:5173',],
    methods: ['GET', 'POST', 'DELETE', 'PUT', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);



app.get("/", (req, res) => {
  console.log(req);
  res.status(234).send("GET Request called");
});

app.use('/books', booksRoute);

mongoose
  .connect(process.env.mongoDBURL)
  .then(() => {
    console.log("App connected to database");
    app.listen(process.env.PORT, () => {
      console.log(`App is listening to port: ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
