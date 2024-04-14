import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import userRouter from "./router/userRouter.js";
import chatRouter from "./router/chatRouter.js";
import cors from "cors";

dotenv.config();
const PORT = process.env.PORT || 5000;
connectDB(process.env.MONGO_URI);
const app = express();
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("hello world");
});

app.use("/api/users", userRouter);
app.use("/api/chats", chatRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.use((error, req, res, next) => {
  res.status(500).json({ message: error.message });
});



app.listen(PORT, () => {
  console.log(`server started on port localhost port ${PORT}....`);
});

