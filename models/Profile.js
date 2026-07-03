const mongoose = require("mongoose");

const profileSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    emailAddress:{
    type:String,
    default:""
},

views:{
   type:Number,
   default:0
},

username:{
   type:String,
   required:true,
   unique:true,
},

    bio: String,

    education: String,

    skills: [String],

    socialLinks: {
  github: { type: String, default: "" },
  linkedin: { type: String, default: "" }
}
  },
  { timestamps: true }
);

module.exports = mongoose.model("Profile", profileSchema);



