const mongoose = require("mongoose");

const zipRegex = /^\d{5}-\d{4}$/;               // 12345-1234
const phoneRegex = /^\d-\d{3}-\d{3}-\d{4}$/;    // 1-123-123-1234
const cityRegex = /^[A-Za-z ]+$/;               // alphabets + space
const urlRegex = /^https?:\/\/.+/i;             // http or https

const AddressSchema = new mongoose.Schema(
  {
    street: { type: String, required: true, trim: true },
    suite: { type: String, required: true, trim: true },
    city: {
      type: String,
      required: true,
      trim: true,
      validate: {
        validator: (v) => cityRegex.test(v),
        message: "City must contain only alphabets and spaces.",
      },
    },
    zipcode: {
      type: String,
      required: true,
      validate: {
        validator: (v) => zipRegex.test(v),
        message: "Zipcode must match DDDDD-DDDD (e.g., 12345-1234).",
      },
    },
  },
  { _id: false }
);

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },

    username: {
      type: String,
      required: true,
      trim: true,
      minlength: [4, "Username must be at least 4 characters."],
      maxlength: [100, "Username must be at most 100 characters."],
    },

    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, "Email must be a valid email address."],
    },

    address: { type: AddressSchema, required: true },

    phone: {
      type: String,
      required: true,
      validate: {
        validator: (v) => phoneRegex.test(v),
        message: "Phone must match D-DDD-DDD-DDDD (e.g., 1-123-123-1234).",
      },
    },

    website: {
      type: String,
      required: true,
      trim: true,
      validate: {
        validator: (v) => urlRegex.test(v),
        message: "Website must be a valid URL starting with http or https.",
      },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
