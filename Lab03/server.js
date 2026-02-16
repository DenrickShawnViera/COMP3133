require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

const Restaurant = require("./models/Restaurant");

const app = express();
app.use(express.json());

// mongoose
//   .connect(process.env.MONGODB_URI)
//   .then(() => console.log("MongoDB connected"))
//   .catch((err) => console.error("MongoDB connection error:", err));

mongoose
  .connect(process.env.MONGODB_URI)
  .then(async () => {
    console.log("MongoDB connected");
    console.log("DB name:", mongoose.connection.name);
    console.log("Collection name:", Restaurant.collection.name);

    const count = await Restaurant.countDocuments();
    console.log("Restaurants count:", count);
  })
  .catch((err) => console.error("MongoDB connection error:", err));



app.get("/restaurants", async (req, res) => {
  try {
    const sortOrder =
      req.query.sortBy === "DESC" ? -1 : 1;

    const restaurants = await Restaurant.find(
      {},
      {
        _id: 1,
        cuisine: 1,
        name: 1,
        city: 1,
        restaurant_id: 1
      }
    ).sort({ restaurant_id: sortOrder });

    res.json(restaurants);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});



app.get("/restaurants/cuisine/:cuisine", async (req, res) => {
  try {
    const cuisineParam = req.params.cuisine;

    const restaurants = await Restaurant.find({ cuisine: cuisineParam });
    res.json(restaurants);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/restaurants/Delicatessen", async (req, res) => {
    const restaurants = await Restaurant.find(
      {
        cuisine: "Delicatessen",
        city: { $ne: "Brooklyn" }
      },
      {
        _id: 0,
        cuisine: 1,
        name: 1,
        city: 1
      }
    ).sort({ name: 1 });

    res.json(restaurants);

});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
