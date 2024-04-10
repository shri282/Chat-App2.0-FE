import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import userRouter from "./router/userRouter.js"

dotenv.config();
const PORT = process.env.PORT || 5000;
connectDB(process.env.MONGO_URI);
const app = express();
app.use(express.json());
app.use("/api/user", userRouter);

app.get("/", (req, res) => {
  res.send("hello world");
});

app.listen(PORT, () => {
  console.log(`server started on port localhost port ${PORT}....`);
});

