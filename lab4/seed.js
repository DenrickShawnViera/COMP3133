require("dotenv").config();
const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");
const User = require("./models/User");

async function run() {
  await mongoose.connect(process.env.MONGODB_URI);

  const filePath = path.join(__dirname, "UsersData.json");
  const raw = fs.readFileSync(filePath, "utf-8");
  const data = JSON.parse(raw);

  // Transform into our schema shape
  const docs = data.map((u) => ({
    name: u.name,
    username: u.username,
    email: u.email,
    address: {
      street: u.address.street,
      suite: u.address.suite,
      city: u.address.city,
      zipcode: u.address.zipcode,
    },
    phone: u.phone,
    website: u.website,
  }));

  await User.deleteMany({});
  await User.insertMany(docs, { ordered: false });

  console.log(`✅ Seeded ${docs.length} users`);
  await mongoose.disconnect();
}

run().catch((e) => {
  console.error("❌ Seed failed:", e.message);
  process.exit(1);
});
