const mongoose = require("mongoose");

const projectSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    title: {
      type: String,
      required: true,
    },

    description: String,

    github: String,

    liveLink: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Project", projectSchema);