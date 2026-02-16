require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

const usersRoute = require("./routes/users");

const app = express();
app.use(express.json());

app.use("/users", usersRoute);

app.get("/", (req, res) => res.json({ ok: true }));

const PORT = process.env.PORT || 8081;

async function start() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("✅ MongoDB connected");
    app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
  } catch (err) {
    console.error("❌ MongoDB connection error:", err.message);
    process.exit(1);
  }
}

start();
