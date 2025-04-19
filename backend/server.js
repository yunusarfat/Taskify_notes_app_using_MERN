const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const authRoutes = require("./routes/auth");
const todoRoutes=require("./routes/todo")

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/todo",todoRoutes);
const PORT = process.env.PORT || 5000;
app.get("/", (req, res) => {
  res.send("IT IS OK");
});
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => console.error(err));
